/**
 * 检查目标对象是否有 响应的属性 key
 * @param {Object} obj 目标对象
 * @param {String} key 对象的 key
 * @returns Boolean
 */
const hasOwn = function (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export {
  hasOwn as __hasOwn
}
