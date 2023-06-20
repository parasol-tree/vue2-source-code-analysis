/**
 * @description  dep 和 watcher 的实现思想
 * 创建 watcher 时,  视图更新前, 给 Dep 设置属性 target, 更新后 再 删除该属性
 * 监听数据时，如果 Dep.target 存在, 则 执行 dep 的 addDependFn 方法, 通知 watcher 在 watcher 内 缓存 dep
 * watcher 调用 dep 的 addWatcherFn 方法, 通知 dep 在 dep 内缓存 watcher
 * 得以实现 watcher 和 dep 的双向缓存(双向记忆) 【watcher 内缓存 dep, dep 内缓存 watcher】
 */

import {
  __pushDepTargetFn, // 添加 Dep 的属性 target
  __popDepTargetFn // 删除 Dep 的属性 target
} from '@/observerData/dep.js'
import { __nextTick } from '@/utils/nextTick.js'

/**
 * @description Watcher 类的说明
 * @property {Object} vm 框架实例
 * @property {Function} expOrFn JavaScript 表达式 或者 函数(更新试图的)
 * @property {Function} callbackFn 回调函数
 * @property {Function} options 配置项
 */

let id = 0

class Watcher {
  constructor (vm, expOrFn, callbackFn, options = {}) {
    this.watcherId = id++ // watcher 唯一标识, 每次 new 的 watcher 的身份标识
    this.vm = vm
    this.expOrFn = expOrFn
    this.callbackFn = callbackFn
    this.options = options
    this.isUser = !!options.isUser
    this.depArr = [] // 缓存 dep
    this.depIdSet = new Set() // 缓存 dep 的 id

    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else { // 处理 watch 的 字符串 属性 'obj1.a.c': { handler: function () {} }
      this.getter = () => {
        const objPathArr = expOrFn.split('.')
        let obj = vm
        for (let i = 0, l = objPathArr.length; i < l; i++) {
          obj = obj[objPathArr[i]]
        }
        return obj
      }
      if (!this.getter) {
        console.warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.get() // 旧值(渲染 dom)
  }
  get () {
    __pushDepTargetFn(this)// 初次渲染前  添加 Dep 的属性 target (watcher)
    const _vm = this.vm
    const value = this.getter.call(_vm, _vm) // 渲染 dom
    __popDepTargetFn() // 删除 Dep 的属性 target (watcher)
    return value
  }
  updateFn () {
    /**
     * vm.list.push(2)
     * vm.list.push(3)
     * vm.list.push(4)
     * 会多次更新视图
     */
    // this.get() // 多次更新数据 ---》 多次更新视图
    queueWatcherFn(this) // 多次更新数据 ---》 一更新视图
  }
  addDepFn (Dep) {
    const depId = Dep.depId
    if (!this.depIdSet.has(depId)) { // 添加 dep
      this.depIdSet.add(depId)
      this.depArr.push(Dep)
      Dep.addWatcherFn(this)
    }
  }
  run () {
    // this.get()
    const newValue = this.get() // 新值
    const oldValue = this.value // 旧值
    this.value = newValue
    // 执行用户设置的 watch 函数
    if (this.isUser) {
      this.callbackFn.call(this.vm, newValue, oldValue)
    }
  }
}

const queueWatcherArr = []
const has = {}

// 处理多次更新的 watcher 队列
function queueWatcherFn (watcher) {
  const _id = watcher.watcherId
  if (!has[_id]) {
    queueWatcherArr.push(watcher)
    has[_id] = true
    // 也可以不用 setTimeout, 用 promise 也可以, 主要是异步就行, 下边已经改为 使用 nextTick 函数了
    // setTimeout(() => {
    //   queueWatcherArr.forEach(item => item.run())
    //   queueWatcherArr.splice(0, queueWatcherArr.length)
    //   delete has[_id]
    // }, 0)
    __nextTick(() => {
      queueWatcherArr.forEach(item => {
        // console.log('item', item)
        item.run()
      })
      queueWatcherArr.splice(0, queueWatcherArr.length)
      delete has[_id]
    })
  }
}

export default Watcher
