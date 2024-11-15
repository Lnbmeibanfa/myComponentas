/**
 * Observer.js
 * 
 * 功能:
 *  - 把$data中的属性,转换成响应式数据
 *  - 如果$data某个属性也是对象,把该属性转化成响应式数据
 *  - 数据变化时,发送通知
 * 
 * 方法:
 *  - walk(data) - 遍历data属性,调用defineReative将数据转换成getter/setter
 *  - defineReactive(data, key, value) - 将数据转换成getter/setter
 */
class Observer {
  constructor (data) {
    this.walk(data)
  }
  walk (data) {
    // 如果data为空或者data不是对象
    if (!data || typeof data !== 'object') {
      return
    }
    // 遍历data转换为响应式
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive (data, key, value) {
    // 检测属性是否是对象,如果是的话,则继续讲对象转为响应式
    this.walk(value)
    // 保存一下this
    const that = this
    // 创建dep, 给每一个data添加一个观察者
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get () {
        // 在这里添加观察者
        console.log(Dep.target)
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set (newValue) {
        if (value === newValue) {
          return
        }
        // 如果新值不等于旧值,此处形成了闭包,延长了value的作用域
        value = newValue
        // 赋值以后检查属性是否是对象,是对象则将属性转换为响应式
        that.walk(newValue)
        // 数据变化后通知,触发watcher的Update方法
        dep.notify()
      }
    })
  }
}