import { __parseHtmlFn } from './parseAst'
import { __generateFn } from './generate'

/**
 * @description 根据 ast 语法树, 获取 render 函数
 * @property {String} outerHTML 挂载点 el 的 outerHTML
 * @return {Function} render 函数
 */
function compileToFunctionFn (outerHTML) {
  const astObj = __parseHtmlFn(outerHTML) // 根据 outerHtml 获得对应的 ast 数据结构 (JSON 数据)
  const renderStr = __generateFn(astObj) // 根据 ast 数据 获取 render 字符串
  /**
   * 将 render 字符串 变为 render 函数
   * 在初始化 render 时的调用, 需要用 call 传入 this (Vue的实例)
   */
  const renderFn = new Function(`with (this) { return ${renderStr} }`)
  return renderFn
}

export {
  compileToFunctionFn as __compileToFunctionFn
}
