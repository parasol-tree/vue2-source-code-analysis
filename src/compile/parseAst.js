const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const regNcname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*` // 标签名
const regQnameCapture = `((?:${regNcname}\\:)?${regNcname})` // <span:xxx>
const regStartTagOpen = new RegExp(`^<${regQnameCapture}`) // 标签开头名称
const regStartTagClose = /^\s*(\/?)>/ // 标签结束的 >
const regEndTag = new RegExp(`^<\\/${regQnameCapture}[^>]*>`) // 标签结尾
const regAttribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 属性
// const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 插值表达式 {{  }}

let root // 跟元素
let currentParent // 当前元素的父元素
const stack = [] // 栈

function createAstElementFn (tag, attrs, parent) {
  return {
    type: 1,
    tag: tag,
    attrs: attrs,
    children: [],
    parent: parent
  }
}
function startFn (tagName, attrs) {
  const element = createAstElementFn(tagName, attrs)
  if (!root) {
    root = element
  }
  currentParent = element
  stack.push(element)
}
function textFn (text) {
  // text = text.replace(/\s/g, '') // 去除 文本的所有空格
  // text = text.trim() // 去除 文本的 首尾空格
  if (text) {
    currentParent.children.push({ type: 3, text: text })
  }
}
function endFn () {
  const element = stack.pop()
  currentParent = stack[stack.length - 1]
  if (currentParent) {
    element.parent = currentParent.tag
    currentParent.children.push(element)
  }
}
let last
// 解析 html
function parseHtmlFn (html) {
  // console.log('parseHtmlFn 原始 html是:' + html)
  while (html) {
    last = html
    const textEnd = html.indexOf('<')
    // 标签 < 开头
    if (textEnd === 0) {
      const startTagMatch = parseStartTagFn() // 解析开始标签
      if (startTagMatch) {
        startFn(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

      const endTagMatch = html.match(regEndTag)
      if (endTagMatch) {
        html = getStrByIndexFn(html, endTagMatch[0].length)
        endFn(endTagMatch[1])
        continue
      }
    }
    // 文本
    if (textEnd > 0) {
      const text = html.substring(0, textEnd) // 获取文本
      if (text) {
        html = getStrByIndexFn(html, text.length)
        textFn(text)
      }
    }
    if (last === html) {
      // console.log('跳出循环')
      break
    }
  }
  // 解析开始标签
  function parseStartTagFn () {
    // console.log('parseStartTagFn html --->', html)
    const start = html.match(regStartTagOpen)
    // console.log('parseStartTagFn --->', start)
    if (!start) {
      return false
    }
    const match = {
      tagName: start[1],
      attrs: []
    }
    html = getStrByIndexFn(html, start[0].length)
    // console.log('parseStartTagFn html --->', html)
    let attr // 属性
    let end // 结束标签
    while (!(end = html.match(regStartTagClose)) && (attr = html.match(regAttribute))) {
      match.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5]
      })
      html = getStrByIndexFn(html, attr[0].length)
    }
    if (end) {
      html = getStrByIndexFn(html, end[0].length)
      // console.log('parseStartTagFn match --->', match)
      // console.log('parseStartTagFn html --->', html)
      return match
    }
  }
  // 字符串 从 indexStart 开始截取到末尾
  function getStrByIndexFn (str, indexStart) {
    return str.substring(indexStart)
  }
  // console.log('parseHtmlFn root --->', root)
  return root
}

export {
  parseHtmlFn as __parseHtmlFn
}
