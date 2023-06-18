import { __initFn } from '@/init/init.js'
import { __initLifecycleFn } from '@/init/lifecycle/lifecycle.js'
import { __initRenderFn } from '@/vnode/index.js'
import { __initGlobalApiFn } from '@/global-api/index.js'

function Vue (options) {
  this._initFn(options) // 初始化 Vue
}

__initFn(Vue) // 初始化 Vue
__initLifecycleFn(Vue) // 初始 化生命周期
__initRenderFn(Vue) // 初始化 render 函数
__initGlobalApiFn(Vue) // 初始化 Vue 全局方法
export default Vue
