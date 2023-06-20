import { __initFn } from '@/init/init'
import { __initLifecycleFn } from '@/init/lifecycle/lifecycle'
import { __initRenderFn } from '@/vnode/index'
import { __initGlobalApiFn } from '@/global-api/index'

// asdsad
// import { __compileToFunctionFn } from '@/compile/index'
// import { createRealDomFn, __updateElFn } from '@/vnode/updateEl'
// ssss

function Vue (options) {
  this._initFn(options) // 初始化 Vue
}

__initFn(Vue) // 初始化 Vue
__initLifecycleFn(Vue) // 初始 化生命周期
__initRenderFn(Vue) // 初始化 render 函数
__initGlobalApiFn(Vue) // 初始化 Vue 全局方法

// ssss
// const vm1 = new Vue({ data () { return { name: '张三' } } })
// const render1 = __compileToFunctionFn('<div id="app1">{{name}}</div>')
// const vnode1 = render1.apply(vm1)
// // console.log('vnode1 --->', vnode1)
// const realDom1 = createRealDomFn(vnode1)
// document.body.appendChild(realDom1)

// const vm2 = new Vue({ data () { return { name: '李斯' } } })
// const render2 = __compileToFunctionFn('<p id="app2">{{name}}</p>')
// const vnode2 = render2.apply(vm2)
// // console.log('vnode2 --->', vnode2)
// __updateElFn(vnode1, vnode2)
// ssss

export default Vue
