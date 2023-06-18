## 函数说明
```
  pnpm install
  pnpm run dev
```
```
  (1) 原型上的属性以  _$ 开头 + 驼峰书写
    eg: Vue.prototype._$options = {}
  (2) 原型上的方法名
    供 user 使用的 以 _$ 开头 + 驼峰书写
    框架内部使用的 以 _ 开头 + 驼峰书写
    eg: Vue.prototype._initFn = function () {}
    eg: Vue.prototype._$mountFn = function () {}
  (3) 方法 以 Fn 结尾
  (4) 供外部文件使用的方法名 统一用 const 声明, 非导出的方法不用 关键字声明, 导出时 用 as 关键字 修改为 __ 开头 + 驼峰书写
    eg: const getName = function () {}
    export { getName as __getName }
  (5) 内部的方法名 统一都以 驼峰书写
    eg: function getValueFn () {}
  (6) 框架 全局方法 _g 开头 + 驼峰书写
    eg: Vue._g$mixinFn = function () {}
```
