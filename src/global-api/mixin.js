import { __mergeOptionsFn } from '@/utils/mergeOptions.js'

const initMixinFn = function (Vue) {
  Vue._$mixinOptions = {} // 默认值是 空对象
  // console.log('initMixin')
  Vue._g$mixinFn = function (mixinOptions) {
    // const vm = this
    // { created: [a, b], watch: [a, b] }
    this._$mixinOptions = __mergeOptionsFn (this._$mixinOptions, mixinOptions)
    // console.log('_g$mixinFn Vue.options', this.options)
    // console.log('_g$mixinFn Vue._$options', this._$options)
  }
}

export {
  initMixinFn as __initMixinFn
}
