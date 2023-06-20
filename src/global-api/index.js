import { __initMixinFn } from './mixin'
import { __initExtendFn } from './extend'
import { __initComponentFn } from './component'

const initGlobalApiFn = function (Vue) {
  Vue.options = {} // 默认值是 空对象
  Vue.options._base = Vue
  __initMixinFn(Vue)
  __initExtendFn(Vue)
  __initComponentFn(Vue)
}

export {
  initGlobalApiFn as __initGlobalApiFn
}
