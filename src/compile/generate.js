const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 插值表达式 {{  }}

/**
 * @description 处理 属性 attribute
 * @property {Array} attrs 标签的 attribute
 * @return {String} 字符串对象
 * 根据 attribute 的 name, 返回一个对象 键是 name，值 是 attribute 的值; eg: {id:"app",style:{"color":"red","font-size":"20px"}}
 */
function genAttrsFn (attrs) {
  let str = ''
  for (let i = 0, l = attrs.length; i < l; i++) {
    const _item = attrs[i]
    if (_item.name === 'style') {
      const _obj = {}
      const _lastStr = _item.value.substring(_item.value.length - 1)
      if (_lastStr === ';') {
        _item.value = _item.value.slice(0, _item.value.length - 1) // 去除  style 内的 最后一个分号
      }
      _item.value.trim()
      const _value = _item.value
      const _list = _value.split(';')
      for (let m = 0, n = _list.length; m < n; m++) {
        const _itemValue = _list[m]
        _itemValue.trim()
        const styleKeyValueArr = _itemValue.split(':')
        const styleKey = styleKeyValueArr[0]
        const styleValue = styleKeyValueArr[1].trim()
        _obj[styleKey] = styleValue
      }
      _item.value = _obj
    }
    str += `${_item.name}:${JSON.stringify(_item.value)},`
  }
  str = `{${str.slice(0, -1)}}` // 去除字符串最后的一个 英文逗号
  return str
}
/**
 * @description 处理 child
 * @property {Object} child ast 的数据结构
 * @return {String} 字符串
 */
function genChildFn (child) {
  // 元素
  if (child.type === 1) { return generateFn(child) }
  // 文本
  else if (child.type === 3) {
    const text = child.text // eg: 插值{{msg}}表达式
    return genTextFn(text)
  }
}
/**
 * @description 处理 子节点
 * @property {Object} el ast 的数据结构
 * @return {String} 字符串
 */
function genChildrenFn (el) {
  const children = el.children
  if (children) {
    return children.map(child => genChildFn(child)).join(',')
  }
  return undefined
}
/**
 * @description 处理 文本节点
 * @property {String} text eg: text = 'hello{{msg}}{{name}}world'
 * @return {String} 字符串
 */
function genTextFn (text = '') {
  const textCacheArr = [] // 缓存下文本 + 插值表达式 {{}}
  let match, matchIndex
  let lastIndex = defaultTagRE.lastIndex = 0 // 重置 正则开始匹配的位置
  while ((match = defaultTagRE.exec(text))) {
    matchIndex = match.index
    if (matchIndex > lastIndex) { // hello{{msg}}word 截取 插值表达式之前的文本 hello
      textCacheArr.push(text.slice(lastIndex, matchIndex))
    }
    textCacheArr.push(`_parseIEFn(${match[1].trim()})`)
    lastIndex = matchIndex + match[0].length // 插值表达式最后的下标
  }
  // 小于文本的长度, 说明插值表达式后还有文本, 截取剩余的文本
  if (lastIndex < text.length) {
    textCacheArr.push(text.slice(lastIndex))
  }
  return `_parseTextFn(${textCacheArr.join('+')})`
}

/**
 * @description 根据 ast 语法树, 获取 render 字符串
 * @property {Object} ast ast 的数据结构
 * @return {String} render 字符串
 * _parseTagFn 解析标签 _parseTextFn 解析文本 _parseIEFn 解析插值表达式{{}}
 */
const generateFn = function (ast) {
  const children = genChildrenFn(ast)
  // const code = `_parseTagFn('${ast.tag}',${ast.attrs && ast.attrs.length > 0 ? genAttrsFn(ast.attrs) : undefined},${children ? children : undefined})`
  const attrs = (ast.attrs && ast.attrs.length > 0) ? genAttrsFn(ast.attrs) : undefined
  const code = `_parseTagFn('${ast.tag}',${attrs},${children})`
  return code
}

export {
  generateFn as __generateFn
}
