import { __mergeOptionsFn } from '@/utils/mergeOptions.js'

const initMixinFn = function (Vue) {
  Vue._g$mixinFn = function (mixinOptions) {
    // { created: [a, b], watch: [a, b] }
    this.options = __mergeOptionsFn (this.options, mixinOptions)
  }
}

export {
  initMixinFn as __initMixinFn
}
