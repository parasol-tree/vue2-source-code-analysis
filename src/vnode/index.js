/* eslint-disable no-unused-vars */
import { __isNativeTag } from '@/utils/isNativeTag'
// 创建虚拟节点
function createVnodeFn (tag, data, key, children, text, componentOptions) {
  return {
    // 虚拟节点本身没有 componentOptions 属性
    tag, data, key, children, text, componentOptions
  }
}
// 创建 元素 虚拟节点
function createElementVnodeFn (vm, tag, data = {}, ...children) {
  if (data.key) {
    delete data.key
  }
  if (__isNativeTag(tag)) { // 原生标签 eg: div, h1, span
    return createVnodeFn(tag, data, data.key, children)
  } else { // 用户定义的组件 eg: my-button
    const Ctor = vm._$options.components[tag] // 用户自定义组件 ---》 组件的构造函数
    if (!Ctor) {
      console.error(
        'Unknown custom element: <' +
          tag +
          '> - did you ' +
          'register the component correctly? For recursive components, ' +
          'make sure to provide the "name" option.',
      )
    }
    return createComponentVnodeFn(vm, tag, data, data.key, children, Ctor)
  }
}
// 创建 文本 虚拟节点
function createTextVnodeFn (text) {
  return createVnodeFn(undefined, undefined, undefined, undefined, text)
}
function createComponentVnodeFn (vm, tag, data, key, children, Ctor) {
  // return createVnodeFn(componentTagName, data, key, undefined, { Ctor, children })
  if (Ctor === null || Ctor === undefined) {
    return
  }
  Ctor = vm._$options._base._g$extendFn(Ctor)
  data.hook = {
    initFn (vnode) {
      if (Ctor) {
        const child = vnode.componentInstance = new Ctor({ isComponent: true })
        child._$mountFn()
      }
    }
  }
  const componentTagName = `vue-component-${tag}-${Ctor.extendId}`
  // 创建组件的虚拟节点时,没有 children, 组件的 children 时 插槽(createVnodeFn 最后一个参数的 children)
  const _componentVnode = createVnodeFn(componentTagName, data, key, undefined, undefined, { Ctor, children })
  return _componentVnode
}

// 创建 render 函数, 获取 虚拟节点 vndoe
const initRenderFn = function (Vue) {
  // 将 render 函数变为 vnode
  Vue.prototype._renderFn = function () {
    const vm = this
    // console.log('vm._$options', vm._$options)
    // console.log('Vue.options', Vue.options)
    const render = vm._$options.render
    const vndoe = render.call(vm)
    /** vndoe 格式
     * {
     *  tag: 'div',
     *  text: '你好',
     *  children: [
     *    { tag: 'h1', text: 'ceshi', children: [] },
     *    { tag: 'h2', text: undefined, children: undefined }
     *  ]
     * }
     */
    return vndoe
  }
  // _parseTagFn 解析标签
  Vue.prototype._parseTagFn = function () {
    return createElementVnodeFn(this, ...arguments)
  }
  // _parseTextFn 解析文本
  Vue.prototype._parseTextFn = function (text) {
    return createTextVnodeFn(text)
  }
  // _parseIEFn 解析插值表达式{{msg}}
  Vue.prototype._parseIEFn = function (variable) {
    return typeof variable === 'object' ? JSON.stringify(variable) : variable
  }
}

export {
  initRenderFn as __initRenderFn
}
