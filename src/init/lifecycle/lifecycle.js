import { __updateElFn } from '@/vnode/updateEl.js'
import Watcher from '@/observerData/watcher.js'

const mountComponentFn = function (vm, el) {
  callLifecycleFn('beforeMount', vm)
  vm._$el = el
  /**
   * 禁用以前的一次性 试图更新, 改为创建一个 Watcher 来监听 数据的改变, 用以触发 试图更新 (不然每次该改据后都得用vm._updateFn(vm._renderFn()) 更新视图)
   * const vnode = vm._renderFn() // 将 render 函数变为 vnode
   * vm._updateFn(vnode) // 将 vndoe 变为 真实 dom, 并放到页面上
   */
  const updateViewFn = () => {
    // console.log('更新数据')
    vm._updateFn(vm._renderFn())
  }
  new Watcher(vm, updateViewFn, () => {}, true)

  callLifecycleFn('mounted', vm)
}
const initLifecycleFn = function (Vue) {
  Vue.prototype._updateFn = function (vnode) {
    /**
     * 更新 下 得到的 新的 dom(通过 vnode 渲染的真实 dom 将替换旧的的dom)
     * 旧的 dom --->      <div id="app" style="color: red;font-size: 20px;"> hello {{ msg }}<h1> 张三 </h1> </div>
     * vnode 渲染后得到的 dom --->       <div> hello hello<h1> 张三 </h1> </div>
     */
    // console.log('更新数据 vnode', vnode)
    this._$el = __updateElFn(this._$el, vnode)
  }
}
const callLifecycleFn = function (lifecycleName, vm) {
  const lifecycleArr = vm._$options[lifecycleName] ?? []
  for (let i = 0, l = lifecycleArr.length; i < l; i++) {
    const _lifecycleItem = lifecycleArr[i]
    _lifecycleItem && _lifecycleItem.call(vm)
  }
}

export {
  mountComponentFn as __mountComponentFn,
  initLifecycleFn as __initLifecycleFn,
  callLifecycleFn as __callLifecycleFn
}
