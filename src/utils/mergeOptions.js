import { __hasOwn } from '@/utils/hasOwn'

const lifecycleArr = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  // 'activated',
  // 'deactivated',
  'beforeDestroy',
  'destroyed',
  // 'errorCaptured',
]
const strategiesObj = {}

lifecycleArr.forEach(lifecycleName => { strategiesObj[lifecycleName] = lifecycleHookFn })

strategiesObj.data = function (value1, value2) {
  if (value1) {
    return function () {
      return {
        ...value1(),
        ...value2()
      }
    }
  } else {
    return value2
  }
}
// strategiesObj.watch = function (value1, value2) { return value2 }
// strategiesObj.watch = function (value1, value2) {
//   console.log('strategiesObj.watch value1', value1)
//   console.log('strategiesObj.watch value2', value2)
//   return value2
//   // if (value1) {
//   //   return function () {
//   //     return {
//   //       ...value1(),
//   //       ...value2()
//   //     }
//   //   }
//   // } else {
//   //   return value2
//   // }
// }
// strategiesObj.computed = function (value1, value2) { return value2 }
// strategiesObj.methods = function (value1, value2) { return value2 }
strategiesObj.components = mergeAssetsFn // 先找子类自己的, 找不见再往上查找 父类、全局的

function lifecycleHookFn (value1, value2) {
  if (value2) {
    if (value1) {
      return value1.concat(value2)
    } else {
      return [value2]
    }
  } {
    return value1
  }
}
function mergeAssetsFn (value1, value2) {
  const _res = Object.create(value1) // _res.__proto__ = value1
  for (const key in value2) {
    _res[key] = value2[key]
  }
  return _res
}
const mergeOptionsFn = function (obj1, obj2) {
  // console.log('mergeOptionsFn obj1 --->', obj1)
  // console.log('mergeOptionsFn obj2 --->', obj2)
  const options = {} // { created: [a, b], watch: [a, b]}
  for (const key in obj1) {
    mergeField(key)
  }
  for (const key in obj2) {
    if (!__hasOwn(obj1, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    if (strategiesObj[key]) {
      options[key] = strategiesObj[key](obj1[key], obj2[key])
    } else {
      // if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      //   options[key] = {
      //     ...obj1[key],
      //     ...obj2[key],
      //   }
      // } else if (!obj2[key]) {
      //   options[key] = obj1[key]
      // } else {
      //   options[key] = obj2[key]
      // }
      // 注释上边的用下面的更加简洁的写法
      options[key] = obj1[key] ?? obj2[key]
    }
  }
  return options
}

export {
  mergeOptionsFn as __mergeOptionsFn
}
