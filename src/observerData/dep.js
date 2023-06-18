/**
 * @description  dep 和 watcher 的实现思想
 * 创建 watcher 时,  视图更新前, 给 Dep 设置属性 target, 更新后 再 删除该属性
 * 监听数据时，如果 Dep.target 存在, 则 执行 dep 的 addDependFn 方法, 通知 watcher 在 watcher 内 缓存 dep
 * watcher 调用 dep 的 addWatcherFn 方法, 通知 dep 在 dep 内缓存 watcher
 * 得以实现 watcher 和 dep 的双向缓存(双向记忆) 【watcher 内缓存 dep, dep 内缓存 watcher】
 */

let id = 0

class Dep {
  constructor () {
    this.depId = id++
    this.watcherArr = []
  }
  // 依赖 (收集 watcher) 思路
  addDependFn () {
    // this.watcherArr.push(Dep.target)
    if (Dep.target) {
      Dep.target.addDepFn(this) // 在 watcher 内 保存这次的 dep
    }
  }
  // 通知视图层进行更新
  notifyUpateViewFn () {
    this.watcherArr.forEach(watcher => {
      watcher.updateFn()
    })
  }
  // 添加 watcher
  addWatcherFn (watcher) {
    this.watcherArr.push(watcher)
  }
}

Dep.target = null // Dep 添加属性 target, 存储当前 watcher
const targetStack = [] // 目标 target 的栈, 缓存下 watcher

// 添加 Dep 的属性 target
const pushDepTargetFn = function (target) {
  targetStack.push(target)
  Dep.target = target
}
// 删除 Dep 的属性 target
const popDepTargetFn = function () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

export {
  pushDepTargetFn as __pushDepTargetFn,
  popDepTargetFn as __popDepTargetFn,
}
export default Dep
