const nativeTagArr = [
  /* html 标签 */'html', 'body', 'base', 'head', 'link', 'meta', 'style', 'title', 'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup', 'nav', 'section', 'div', 'dd', 'dl', 'dt', 'figcaption', 'figure', 'picture', 'hr', 'img', 'li', 'main', 'ol', 'p', 'pre', 'ul', 'a', 'b', 'abbr', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'area', 'audio', 'map', 'track', 'video', 'embed', 'object', 'param', 'source', 'canvas', 'script', 'noscript', 'del', 'ins', 'caption', 'col', 'colgroup', 'table', 'thead', 'tbody', 'td', 'th', 'tr', 'button', 'datalist', 'fieldset', 'form', 'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'dialog', 'menu', 'menuitem', 'summary', 'content', 'element', 'shadow', 'template', 'blockquote', 'iframe', 'tfoot',
  /* svg 标签 */'svg', 'animate', 'circle', 'clippath', 'cursor', 'defs', 'desc', 'ellipse', 'filter', 'font-face', 'foreignobject', 'g', 'glyph', 'image', 'line', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'rect', 'switch', 'symbol', 'text', 'textpath', 'tspan', 'use', 'view',
]
const obj = Object.create(null)

nativeTagArr.forEach(item => {
  obj[item] = true
})
/**
 * 判断标签是否是原生标签
 * @param {tagName} tagName 标签名
 * @param {*} expectsLowerCase 是否小写
 * @returns Boolean
 */
const isNativeTag = function (tagName = '', expectsLowerCase = false) {
  return expectsLowerCase ? obj[tagName] : obj[tagName.toLocaleLowerCase()]
}

export {
  isNativeTag as __isNativeTag
}
