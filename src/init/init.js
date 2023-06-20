/* eslint-disable no-unused-vars */
import { __initStateFn } from '@/init/initStateFn.js'
// import { __initTemplateFn } from '@/init/initTemplate.js'
import { __compileToFunctionFn } from '@/compile/index.js'
import { __mountComponentFn, __callLifecycleFn } from '@/init/lifecycle/lifecycle.js'
import { __mergeOptionsFn } from '@/utils/mergeOptions.js'
import { __nextTick } from '@/utils/nextTick.js'
import Watcher from '@/observerData/watcher.js'

function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

const initFn = function (Vue) {
  Vue.prototype._initFn = function (options) {
    const vm = this
    vm._$options = __mergeOptionsFn(vm.constructor.options, options) // 混合 mixin 的 options
    __callLifecycleFn('beforeCreate', vm) // 此时不能用 this 访问 data 和 methods 的属性和方法
    __initStateFn(vm) // 初始化 各种状态
    __callLifecycleFn('created', vm) // 此时可以用 this 访问 data 和 methods 的属性和方法
    if (vm._$options.el) {
      vm._$mountFn(vm._$options.el)
    }
  }
  Vue.prototype._$mountFn = function (el) {
    el = document.querySelector(el)
    if (el === document.body || el === document.documentElement) {
      console.warn('Do not mount Vue to <html> or <body> - mount to normal elements instead.')
      return this
    }
    const vm = this
    const options = vm._$options
    if (!options.render) {
      let template = options.template
      if (template) {
        if (typeof template === 'string') {
          if (template.charAt(0) === '#') {
            template = document.querySelector(template)?.innerHTML ?? ''
            /* istanbul ignore if */
            if (!template) {
              console.warn('Template element not found or is empty: '.concat(options.template), this)
            }
          }
        } else if (template?.nodeType) {
          template = template.innerHTML
        } else {
          console.warn('invalid template option:' + template, this)
          return this
        }
      } else if (el) {
        template = getOuterHTML(el)
      }
      if (template) {
        const renderFn = __compileToFunctionFn(template) // 得到 render 函数
        options.render = renderFn // 设置 render 函数
      }
    }
    __mountComponentFn(vm, el)
  }
  Vue.prototype._$nextTick = __nextTick
  Vue.prototype._$watch = function (expOrFn, handler, options = {}) {
    // 数据发生改变, watcher(src/observerData/watcher.js) 可以知道
    // 如果是渲染 ---》new Watcher
    // 如果不是渲染 ---》_$watch
    const vm = this
    const { immediate, deep } = options
    new Watcher(vm, expOrFn, handler, { ...options, isUser: true })
    if (immediate === true) {
      handler.call(vm)
    }
  }
}

export {
  initFn as __initFn
}
