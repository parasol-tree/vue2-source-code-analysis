/**
 * @description 浏览器环境判断
 */

export const __inBrowser = typeof window !== 'undefined' //
export const __UA = __inBrowser && window.navigator.userAgent.toLowerCase()
export const __isIE = __UA && /msie|trident/.test(__UA) // IE
export const __isIE9 = __UA && __UA.indexOf('msie 9.0') > 0 // IE9
export const __isEdge = __UA && __UA.indexOf('edge/') > 0 // Edge
export const __isAndroid = (__UA && __UA.indexOf('android') > 0) // Android
export const __isIOS = (__UA && /iphone|ipad|ipod|ios/.test(__UA)) // IOS
export const __isChrome = __UA && /chrome\/\d+/.test(__UA) && !__isEdge // Chrome
export const __isPhantomJS = __UA && /phantomjs/.test(__UA)
export const __isFF = __UA && __UA.match(/firefox\/(\d+)/) // Firefox
