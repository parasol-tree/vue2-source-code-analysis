import { __getType } from '@/utils/getType.js'
// import { __hasValue } from '@/utils/hasValue.js'
import { __newArrayPrototype } from '@/observerData/array.js'
import { __defineProperty } from '@/utils/def.js'

import Dep from '@/observerData/dep.js'
/**
 * @description  dep 和 watcher 的实现思想
 * 创建 watcher 时,  视图更新前, 给 Dep 设置属性 target, 更新后 再 删除该属性
 * 监听数据时，如果 Dep.target 存在, 则 执行 dep 的 addDependFn 方法, 通知 watcher 在 watcher 内 缓存 dep
 * watcher 调用 dep 的 addWatcherFn 方法, 通知 dep 在 dep 内缓存 watcher
 * 得以实现 watcher 和 dep 的双向缓存(双向记忆) 【watcher 内缓存 dep, dep 内缓存 watcher】
 */

// 观测数据
const observerDataFn = function (data) {
  if (typeof data !== 'object' || !data) {
    return data
  }
  if (data.__ob__) { return data }
  return new Observer(data)
}

// 劫持对象 { msg: 'hello' }, msg, 'hello'
const hijackDataFn = function (obj, key, value) {
  const dep = new Dep()
  let classObserver = observerDataFn(value)
  Object.defineProperty(obj, key, {
    get () {
      if (Dep.target) { // 收集 (依赖) watcher
        dep.addDependFn()
        if (classObserver && classObserver.dep) {
          classObserver.dep.addDependFn() // 数组收集依赖
          if (__getType(value) === 'array') {
            dependArrayFn(value)
          }
        }
      }
      return value
    },
    set (newValue) {
      if (newValue === value) { return }
      classObserver = observerDataFn(newValue)
      value = newValue
      dep.notifyUpateViewFn() // 通知视图层进行更新
    }
  })
}
function dependArrayFn (value) {
  for (let i = 0, l = value.length; i < l; i++) {
    const _current = value[i]
    if (_current.__ob__) {
      _current.__ob__.dep.addDependFn()
    }
    if (__getType(_current) === 'array') {
      dependArrayFn(_current)
    }
  }
}

class Observer {
  constructor (value) {
    this.dep = new Dep() // 给数组的 Observer 添加 dep 属性
    this.value = value
    __defineProperty(value, '__ob__', this) // 给所有值 添加个属性 __ob__ 值为 this, 标识开始被监测了 也方便数组劫持方法操作 Observer 类 的方法
    if (__getType(value) === 'array') {
      value.__proto__ = __newArrayPrototype // 给数组的原型设置新的属性 __proto__ 值为 劫持后自定义的数组原型
      this.observerArrayFn(value) // 监测数组
    } else {
      this.ergodicDataFn(value) // 遍历 对象
    }
  }
  // 遍历 对象
  ergodicDataFn (obj) {
    const keys = Object.keys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      const key = keys[i] // 对象的 键
      const value = obj[key] // 对象的对象键的 值
      hijackDataFn(obj, key, value) // 劫持对象
    }
  }
  // 监测数组
  observerArrayFn (value) {
    for (let i = 0, l = value.length; i < l; i++) {
      observerDataFn(value[i])
    }
  }
  static info = '见过你的美,还能爱上谁?'
}

export {
  observerDataFn as __observerDataFn
}
