import { __getType } from './getType'

const hasValue = function (data) {
  if (__getType(data) === 'array') {
    return data.length > 0
  }
  if (__getType(data) === 'object') {
    return Object.keys(data).length > 0
  }
  if (data === '' || data === null || data === 'null' || data === undefined || data === 'undefined') {
    return false
  }
  return true
}

export {
  hasValue as __hasValue
}
