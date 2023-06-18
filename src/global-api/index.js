/* eslint-disable no-unused-vars */
import { __initMixinFn } from './mixin'

const initGlobalApiFn = function (Vue) {
  __initMixinFn(Vue)
}

export {
  initGlobalApiFn as __initGlobalApiFn
}
