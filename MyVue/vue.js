/**
 * vue.js
 * 
 * 属性
 *  - $el: 挂载的dom对象
 *  - $data: 数据
 *  - $option: 传入的属性
 * 
 * 方法
 *  - _proxyData 将数据转换成getter,setter形式
 */
class Vue {
  constructor (options) {
    // 获取传入对象,默认为空对象
    this.$option = options || {}
    // 获取el(#app)
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 获取挂载属性
    this.$data = options.data || {}
    this._proxyData(this.$data)
    // 使用Observer把data中的数据转化成响应式,并检测数据的变化,渲染视图
    new Observer(this.$data)
    // 编辑,模板渲染视图
    new Compiler(this)
  }
  _proxyData (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        // 可枚举(遍历)
        enumerable: true,
        // 可配置(使用delete删除,可以用过defineProperty重新定义)
        configurable: true,
        get () {
          return data[key]
        },
        set (newValue) {
          if (newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}