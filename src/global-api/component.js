import { __hasValue } from '@/utils/hasValue'

/**
 * 注册全局组建 的方法 Vue.component()
 * @param {Function} Vue 构造函数
 */
const initComponentFn = function (Vue) {
  Vue.options.components = {}
  // 使用 Vue.extend 方法 返回一个构造函数, new 这个构造函数 返回 Vue 的实例
  Vue._g$componentFn = function (id, definition) {
    // console.log('Vue._gComponent id --->', id)
    // console.log('Vue._gComponent definition --->', definition)
    // console.log('Vue._gComponent this.options 000 --->', this.options)
    const name = definition.name
    if (!__hasValue(name)) {
      definition.name = id
    }
    definition = this.options._base._g$extendFn(definition) // 返回一个实例 ｜ 用 _base this 永远指向 父类
    this.options.components[id] = definition
    // console.log('Vue._gComponent this.options 111 --->', this.options)
  }
}
/**
 * (1) 内部调用 全局方法 Vue._g$extendFn
 * (2) 创建子类，初始化子组件，继承父类 Vue, 和它的属性
 * (3) 渲染子组件
 *   (3.1) 获取 vnode
 *   (3.2) 创建真实 dom
 */
export {
  initComponentFn as __initComponentFn
}
