/* eslint-disable no-unused-vars */

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
const strategiesObj = {
  data: function (value1, value2) {
    return value2
  },
  // computed: function (value1, value2) {},
  // watch: function (value1, value2) {
  //   return value2
  // },
  // methods: function (value1, value2) {},
}

lifecycleArr.forEach(lifecycleName => {
  // strategiesObj[lifecycleName] = mergeLifecycleFn
  strategiesObj[lifecycleName] = function (value1, value2) {
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
})
// function mergeLifecycleFn (value1, value2) {
//   if (value2) {
//     if (value1) {
//       return value1.concat(value2)
//     } else {
//       return [value2]
//     }
//   } {
//     return value1
//   }
// }

const mergeOptionsFn = function (obj1, obj2) {
  // console.log('mergeOptionsFn obj1 --->', obj1)
  // console.log('mergeOptionsFn obj2 --->', obj2)
  const options = {} // { created: [a, b], watch: [a, b]}
  for (const key in obj1) {
    mergeField(key)
  }
  for (const key in obj2) {
    mergeField(key)
  }
  function mergeField (key) {
    if (strategiesObj[key]) {
      // debugger
      options[key] = strategiesObj[key](obj1[key], obj2[key])
    } else {
      // debugger
      options[key] = obj2[key]
    }
  }
  // console.log('mergeOptionsFn options', options)
  return options
}

export {
  mergeOptionsFn as __mergeOptionsFn
}
