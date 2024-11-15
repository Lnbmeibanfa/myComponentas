/**
 * watcher.js
 * 
 * 功能
 *  - 生成观察者更新视图
 *  - 将观察者实例关在到Dep类中
 *  - 数据发生变化的时候,调用回调函数更新视图
 * 
 * 属性
 *  - vm: vue实例
 *  - key: 观察的键
 *  - cb: 回调函数
 * 
 * 方法:
 *  - update()
 */
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将Watcher实例挂载Dep
    Dep.target = this
    // 缓存旧值
    this.oldValue = vm[key]
    // get值后,清楚Dep中的实例
    Dep.target = null
  }
  update () {
    // 获取新值
    let newValue = this.vm[this.key]
    // 新值和旧值相同则不更新
    if (newValue === this.oldValue) return 
    // 调用具体的更新方法
    this.cb(newValue)
  }
}