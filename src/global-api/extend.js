import { __mergeOptionsFn } from '@/utils/mergeOptions.js'

const initExtendFn = function (Vue) {
  /**
  // 创建子类 继承 Vue, 返回一个构造函数
   * @param {*} extendOptions 配置项
   * @returns 返回一个构造函数(ctor)
   */
  let id = 0

  Vue._g$extendFn = function (extendOptions) {
    const Super = this
    const Sub = function VueComponent (options) {
      this._initFn(options) // 子类初始化时, 调用父类的 初始化 方法
    }
    Sub.extendId = id++ // 每次调用都会有不同的 extendId
    Sub.prototype = Object.create(Super.prototype) // 子类 原型 指向 父类的 原型
    Sub.prototype.constructor = Sub // 将 子类 constructor 指向 自己
    Sub.options = __mergeOptionsFn(Super.options, extendOptions) // 父组件 选项 和 子组件 选项 合并

    // 子类的 方法 继承(等于) 父类的方法
    Sub.prototype._g$mixinFn = Super._g$mixinFn
    Sub.prototype._g$componentFn = Super._g$componentFn
    return Sub // 返回子组件的 构造函数, 外界可以 new 调用
  }
}

export {
  initExtendFn as __initExtendFn
}
