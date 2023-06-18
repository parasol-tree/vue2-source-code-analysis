/* eslint-disable no-unused-vars */
import { __initStateFn } from '@/init/initStateFn.js'
// import { __initTemplateFn } from '@/init/initTemplate.js'
import { __compileToFunctionFn } from '@/compile/index.js'
import { __mountComponentFn, __callLifecycleFn } from '@/init/lifecycle/lifecycle.js'
import { __mergeOptionsFn } from '@/utils/mergeOptions.js'
import { __nextTick } from '@/utils/nextTick.js'
import Watcher from '@/observerData/watcher.js'

const initFn = function (Vue) {
  Vue.prototype._initFn = function (options) {
    const vm = this
    // vm._$options = options
    vm._$options = __mergeOptionsFn(Vue._$mixinOptions, options) // 混合 mixin 的 options
    __callLifecycleFn('beforeCreate', vm) // 此时不能用 this 访问 data 和 methods 的属性和方法
    __initStateFn(vm) // 初始化 各种状态
    __callLifecycleFn('created', vm) // 此时可以用 this 访问 data 和 methods 的属性和方法
    if (vm._$options.el) {
      vm._$mountFn(vm._$options.el)
    }
  }
  Vue.prototype._$mountFn = function (el) {
    const vm = this
    const options = vm._$options
    vm._$el = document.querySelector(el)
    if (!options.render) {
      const template = options.template
      if (!template && el) {
        const _outerHTML = vm._$el.outerHTML // el = '#app'     <div id="app">wocao {{ msg }}</div>
        const renderFn = __compileToFunctionFn(_outerHTML) // 根据 outerHTML 获取 render 函数
        options.render = renderFn
      }
    }
    __mountComponentFn(vm)
  }
  Vue.prototype._$nextTick = __nextTick
  Vue.prototype._$watch = function (expOrFn, handler, options = {}) {
    // 数据发生改变, watcher(src/observerData/watcher.js) 可以知道
    // 如果是渲染 ---》new Watcher
    // 如果不是渲染 ---》_$watch
    // console.log('expOrFn, handler, options', expOrFn, handler, options)
    const vm = this
    // console.log('vm', vm)
    const { immediate, deep } = options
    const watcher = new Watcher(vm, expOrFn, handler, { ...options, isUser: true })
    // console.log('immediate', immediate, deep)
    // console.log('watcher --->', watcher)
    if (immediate === true) {
      handler.call(vm)
    }
  }
}

export {
  initFn as __initFn
}
