/**
 * compiler.js
 * 
 * 功能
 *  - 编译模板,解析指令/插值表达式
 *  - 负责页面的首次渲染
 *  - 数据变化后,重新渲染视图
 * 
 * 属性
 *  - el -app元素
 *  - vm -vue实例
 * 
 * 方法
 *  - compile(el) 编译入口
 *  - compileElement(node) - 编译元素(指令)
 *  - compileText(node) 编译文本(插值)
 *  - isDirective(attrName) - (判断是否为指令)
 *  - isTextNode(node) - (判断是否为文本节点
 *  - isElementNode(node) - (判断是否元素节点)
 */

class Compiler {
  constructor (vm) {
    debugger
    // 获取vm
    this.vm = vm
    // 获取el
    this.el = vm.$el
    console.log(this.el)
    this.compile(this.el)
  }
  // 编译模版渲染视图
  compile(el) {
    console.log(el)
    if (!el) return
    // 获取子节点
    const nodes = el.childNodes
    // 收集
    Array.from(nodes).forEach(node => {
      // 文本类型节点的编译
      if (this.isTextNode(node)) {
        // 编译文本节点
        this.compileText(node)
      } else if(this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 判断是否还存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 添加指令方法并执行
  update(node, value, attrName, key) {
    // 定义相应的方法 举个例子:添加textUpdater就是用来处理v-text的
    const updateFn = this[`${attrName}Updater`]
    // 若存在则调用
    updateFn && updateFn.call(this, node, value, key)
  }
  // 用来处理v-text
  textUpdater(node, value, key) {
    node.textContent = value;
  }
  // 处理v-model
  modelUpdater(node, value, key) {
    node.value = value
    // 实现双向数据绑定
    node.addEventListener('input', (e) => {
      this.vm[key] = node.value
    })
  }
  // 编译文本节点
  compileText (node) {
    console.log(node)
    // .表示任意单个字符,不包括换行. +表示匹配多个相同字符, ?表示非贪婪模式,尽可能早结束查找
    // 定位dom元素中的双括号
    const reg = /\{\{(.+?)\}\}/
    // 获取节点的文本内容
    let param = node.textContent
    // 判断是否有{{}}
    if (reg.test(param)) {
      // $1 表示匹配第一个,也就是{{}}里的内容
      // 去除{{}}的前后空格
      // 这里应该错了error
      const key = RegExp.$1.trim();
      // 赋值给node
      node.textContent = param.replace(reg, this.vm[key])
      // 编译模版的时候,创建一个watcher实例,并在内部挂载到dep上
      new Watcher(this.vm, key, (newValue) => {
        // 通过回调函数更新视图
        node.textContent = newValue
      })
    }
  }
  // 编译元素节点
  compileElement (node) {
    Array.from(node.attributes).forEach(attr => {
      let _attrName = attr.name
      // 判断是否是v-开头
      if (this.isDirective(_attrName)) {
        // 删除v-
        const attrName = _attrName.substr(2);
        // 获取属性值,并赋给key
        const key = attr.value
        const value = this.vm[key]
        // 添加指令方法
        this.update(node, value, attrName, key)
        // 数据更新后,通过watcher更新视图
        new Watcher(this.vm, key, (newValue) => {
          this.update(node, newValue, attrName, key)
        })
      }
    })
  }
  // 判断元素是否是Vue指令
  isDirective (attrName) {
    return attrName && attrName.startsWith("v-")
  }
  // 判断是否是文本节点
  // node.nodeType是一个用于获取节点类型的属性,在文档对象模型中(dom)不同类型节点有着不同的nodeType值
  // 通过检查nodeType属性,可以确定一个节点是元素节点(1),文本节点(3),注释节点(8)等不同的类型
  isTextNode (node) {
    return node && node.nodeType === 3
  }
  // 判断是否是元素节点
  isElementNode (node) {
    return node && node.nodeType === 1
  }
}