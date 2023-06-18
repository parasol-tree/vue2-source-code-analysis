
const defineProperty = function (obj, key, val, enumerable = false) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: !!enumerable,
    value: val,
    writable: true,
  })
}

const defineProperties = function (obj, props = {}) {
  Object.defineProperties(obj, props)
}

export {
  defineProperty as __defineProperty,
  defineProperties as __defineProperties
}
