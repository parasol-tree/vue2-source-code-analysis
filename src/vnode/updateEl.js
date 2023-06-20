/* eslint-disable no-unused-vars */
import { __hasValue } from '@/utils/hasValue.js'
import { __getType } from '@/utils/getType.js'
// import { __isNativeTag } from '@/utils/isNativeTag'

function createComponentFn (vnode) {
  let i = vnode.data
  if ((i = i.hook) && (i = i.initFn)) {
    i(vnode)
  }
  if (vnode.componentInstance) {
    return true
  }
  return false
}

/**
 * 根据 虚拟节点(vnode) 创建 真实 dom
 * @param {String} vnode 虚拟节点 vnode
 * @returns HtmlElement
 */
function createRealDomFn (vnode) {
  const { tag, data, key, children, text } = vnode
  if (__hasValue(tag) && __getType(tag) === 'string') {
    if (createComponentFn(vnode)) {
      return vnode.componentInstance._$el
    }
    vnode.el = document.createElement(tag)
    if (__hasValue(children) && __getType(children) === 'array' && children.length > 0) {
      for (let i = 0, l = children.length; i < l; i++) {
        const _child = children[i]
        if (__hasValue(_child)) {
          vnode.el.appendChild(createRealDomFn(_child))
        }
      }
    }
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
/**
 * 根据 虚拟节点(vnode) 创建 真实 dom, 并挂载到 挂载点(mountPoint)上
 * @param {HtmlElement} mountPoint 挂载点
 * @param {String} vnode 虚拟节点 vnode
 * @returns HtmlElement
 */
const updateElFn = function (mountPointOrOldVnode, vnode) {
  if (!mountPointOrOldVnode) { // 组件
    return createRealDomFn(vnode)
  } else {
    const realDom = createRealDomFn(vnode) // 根据 vndoe 创建真实 dom
    const parentDom = mountPointOrOldVnode.parentNode // (1)获取挂载点的父节点
    parentDom.removeChild(mountPointOrOldVnode) // (3) 删除旧的 dom
    parentDom.insertBefore(realDom, parentDom.nextSibling) // (2)将得到的真实 dom 插入到页面上
    // parentDom.removeChild(mountPointOrOldVnode) // (3) 删除旧的 dom
    return realDom
  }
  // if (!mountPointOrOldVnode) {
  //   return createRealDomFn(vnode)
  // }
  // if (mountPointOrOldVnode.nodeType) {
  //   // (1)获取挂载点的父节点 (2)将得到的真实 dom 插入到页面上 (3) 删除旧的 dom
  //   const realDom = createRealDomFn(vnode) // 根据 vndoe 创建真实 dom
  //   const parentDom = mountPointOrOldVnode.parentNode // (1)获取挂载点的父节点
  //   parentDom.removeChild(mountPointOrOldVnode) // (3) 删除旧的 dom
  //   parentDom.insertBefore(realDom, parentDom.nextSibling) // (2)将得到的真实 dom 插入到页面上
  //   return realDom
  // }
  // // 这里写 diff 算法
  // else {
  //   // (1) 标签名 (tag) 不一样
  //   // if (mountPointOrOldVnode.tag !== vnode.tag) {
  //   //   const _newChild = createRealDomFn(vnode)
  //   //   const _oldChild = mountPointOrOldVnode.el
  //   //   return mountPointOrOldVnode.el.parentNode.replaceChild(_newChild, _oldChild) // replaceChild 返回被替换掉的节点
  //   // }
  //   // // (2) 标签名 (tag) 一样
  //   // else if (mountPointOrOldVnode.tag === vnode.tag) {}
  // }
}

export {
  updateElFn as __updateElFn,

  // ssss
  createRealDomFn
  // ssss
}
