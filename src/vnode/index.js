function createVnodeFn (tag, data, key, children, text) {
  // console.log('000000000000')
  // console.log('tag --->', tag)
  // console.log('data --->', data)
  // console.log('key --->', key)
  // console.log('children --->', children)
  // console.log('text --->', text)
  // console.log('111111111111')
  return {
    tag, data, key, children, text
  }
}

function createElementFn (tag, data = {}, ...children) {
  // console.log('000000000000')
  // console.log('text --->', ...children)
  // console.log('111111111111')
  // debugger
  return createVnodeFn(tag, data, data.key, children)
}

function createTextFn (text) {
  return createVnodeFn(undefined, undefined, undefined, undefined, text)
}

const initRenderFn = function (Vue) {
  // 将 render 函数变为 vnode
  Vue.prototype._renderFn = function () {
    const vm = this
    const render = vm._$options.render
    const vndoe = render.call(this)
    /** vndoe 格式
     * {
     *  tag: 'div',
     *  text: '你好',
     *  children: [
     *    { tag: 'h1', text: 'ceshi', children: [] },
     *    { tag: 'h2', text: undefined, children: undefined }
     *  ]
     * }
     */
    return vndoe
  }
  // _parseTagFn 解析标签
  Vue.prototype._parseTagFn = function () {
    return createElementFn(...arguments)
  }
  // _parseTextFn 解析文本
  Vue.prototype._parseTextFn = function (text) {
    return createTextFn(text)
  }
  // _parseIEFn 解析插值表达式{{msg}}
  Vue.prototype._parseIEFn = function (variable) {
    return typeof variable === 'object' ? JSON.stringify(variable) : variable
  }
}

export {
  initRenderFn as __initRenderFn
}
