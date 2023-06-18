// 重写 数组的操作方法

const originalArrayPrototype = Array.prototype
const newArrayPrototype = Object.create(originalArrayPrototype)

const arrayMethodsList = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

arrayMethodsList.forEach(item => {
  newArrayPrototype[item] = function (...args) {
    // console.log('劫持数组方法', args)
    const res = originalArrayPrototype[item].apply(this, args)
    let inserter
    switch (item) {
      // 添加数据 push unshift splice
      case 'push':
      case 'unshift':
        inserter = args
        break
      case 'splice':
        inserter = args.slice(2)
        break
    }
    const ob = this.__ob__
    if (inserter) {
      ob.observerArrayFn(inserter) // 如果有值，再次进行监听
    }
    ob.dep.notifyUpateViewFn()
    return res
  }
})

export {
  newArrayPrototype as __newArrayPrototype
}
