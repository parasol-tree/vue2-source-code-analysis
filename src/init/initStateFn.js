import { __observerDataFn } from '@/observerData/index.js'
import { __getType } from '@/utils/getType.js'

function addDataResourceToVueFn (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get () {
      return target[sourceKey][key]
    },
    set (newValue) {
      target[sourceKey][key] = newValue
    }
  })
}

function initDataFn (vm) {
  let { data } = vm._$options
  data = vm._data = typeof data === 'function' ? data.call(vm) : data
  if (__getType(data) === 'object') {
    const keys = Object.keys(data)
    for (let i = 0, l = keys.length; i < l; i++) {
      addDataResourceToVueFn(vm, '_data', keys[i]) // 将 _data 内的每一个属性 都挂载到 vue 的实例上，使其可以通过 this.<属性名>调用
    }
  }
  __observerDataFn(data)
}
function initPropsFn () {}
function initComputedFn () {}
function initWatchFn (vm) {
  const { watch } = vm._$options
  // console.log('initWatchFn watch', watch)
  for (const key in watch) {
    const handler = watch[key]
    const handlerType = __getType(handler)
    if (handlerType === 'array') {
      for (let i = 0; i < handler.length; i++) {
        createWatcherFn(vm, key, handler[i])
      }
    } else {
      createWatcherFn(vm, key, handler)
    }
  }
}
function initMethodsFn (vm) {
  const { methods } = vm._$options
  if (__getType(methods) === 'object') {
    const keys = Object.keys(methods)
    for (let i = 0, l = keys.length; i < l; i++) {
      // console.log(keys[i])
      addDataResourceToVueFn(vm, 'methods', keys[i]) // 将 methods 内的每一个方法 都挂载到 vue 的实例上，使其可以通过 this.<方法名>调用
    }
  }
}
function createWatcherFn (vm, expOrFn, handler, options) {
  if (__getType(handler) === 'object') {
    options = handler
    handler = handler.handler
  }
  if (__getType(handler) === 'string') {
    handler = vm[handler]
  }
  // 剩下的 类型都是 函数了
  return vm._$watch(expOrFn, handler, options)
}

const initStateFn = function (vm) {
  const options = vm._$options
  if (options.data) {
    initDataFn(vm) // 初始化 data
  }
  if (options.props) {
    initPropsFn(vm)
  }
  if (options.computed) {
    initComputedFn(vm)
  }
  if (options.watch) {
    initWatchFn(vm)
  }
  if (options.methods) {
    initMethodsFn(vm)
  }
}

export {
  initStateFn as __initStateFn
}

