/* eslint-disable no-unused-vars */
import { __hasValue } from '@/utils/hasValue.js'
import { __getType } from '@/utils/getType.js'

function createRealDomFn (vnode) {
  // debugger
  const { tag, data, key, children, text } = vnode
  // console.log('ssss', tag, text, children)
  if (__hasValue(tag) && __getType(tag) === 'string') {
    vnode.el = document.createElement(tag)
    if (__hasValue(children) && __getType(children) === 'array' && children.length > 0) {
    // if (children.length > 0) {
      for (let i = 0, l = children.length; i < l; i++) {
        const _child = children[i]
        // console.log('_child --->', _child)
        if (__hasValue(_child)) {
          vnode.el.appendChild(createRealDomFn(_child))
        } else {
          console.error('children 数据解析错误, children 是:', children)
        }
      }
    }
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

const updateElFn = function (mountPoint, vnode) {
  // console.log('updateElFn mountPoint --->', mountPoint)
  // console.log('updateElFn vnode --->', vnode)
  /**
   * (1)获取挂载点的父节点
   * (2)将得到的真实 dom 插入到页面上
   * (3) 删除旧的 dom
   */
  const realDom = createRealDomFn(vnode) // 根据 vndoe 创建真实 dom
  const parentDom = mountPoint.parentNode // (1)获取挂载点的父节点
  parentDom.removeChild(mountPoint) // (3) 删除旧的 dom
  parentDom.insertBefore(realDom, parentDom.nextSibling) // (2)将得到的真实 dom 插入到页面上
  // parentDom.removeChild(mountPoint) // (3) 删除旧的 dom
  return realDom
}

export {
  updateElFn as __updateElFn
}
