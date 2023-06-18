import { __getType } from '@/utils/getType'
import { __isNativeCode } from '@/utils/isNativeCode'
import { __isIE, __isIOS } from '@/utils/browser'

let _timer = null
const callbackQuesuArr = []
let isRunning = false
let fn

function flushCallbackQueueFn () {
  isRunning = false
  clearTimeout(_timer)
  _timer = null
  callbackQuesuArr.forEach(item => item())
}
// 支持 Promise
if (typeof Promise !== 'undefined' && __isNativeCode(Promise)) {
  fn = () => {
    Promise.resolve().then(flushCallbackQueueFn)
    if (__isIOS) setTimeout(function () {})
  }
}
// 不是 IE, 支持 MutationObserver
else if (!__isIE && typeof MutationObserver !== 'undefined' && (
  __isNativeCode(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbackQueueFn)
  const textNode = document.createTextNode(String(counter))
  observer(textNode, { characterData: true })
  fn = () => {
    counter = counter + 1
    textNode.data = String(counter)
  }
}
// 支持 setImmediate
else if (typeof setImmediate !== 'undefined' && __isNativeCode(setImmediate)) {
  fn = () => {
    setImmediate(flushCallbackQueueFn)
  }
}
// 最后兼容为 setTimeout
else {
  fn = () => {
    _timer = setTimeout(flushCallbackQueueFn, 0)
  }
}

const nextTick = function (callback = null) {
  if (typeof callback !== 'function') {
    console.error('nextTick: expect a function', 'but got a ' + __getType(callback))
    return false
  }
  callbackQuesuArr.push(callback)
  if (isRunning) {
    return false
  }
  isRunning = true
  // _timer = setTimeout(flushCallbackQueueFn, 0)
  fn()
}

export {
  nextTick as __nextTick
}
