<template>
  <div>
    <!-- 下拉菜单实现插入函数 -->
    <el-dropdown trigger="click"  @command="insertElement">
      <span class="el-dropdown-link">
        <i class="el-icon-plus"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in list" :key="item" :command="item">{{ item }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 编辑区域 -->
    <div
    ref="editableTitle"
    contenteditable="true"
    class="sx-alarm-push-titel-editor"
    @mouseup="saveSelection"
    @keyup="saveSelection"></div>
  </div>
</template>

<script>
// import FunctionConfig from './FunctionConfig';
export default {
  name: 'SxAlarmPushTitle',
  data () {
    return {
      // 插入的内容
      list: [
        '预警名称',
        '预警日期',
      ],
      selectedElement: '',
      content: '',
      cursorPostion: null // 光标位置,以实现插入函数
    }  
  },
  methods: {
    insertElement (alarmTableData) {
      if (!alarmTableData || !this.cursorPostion) return;
      // 恢复保存的光标位置
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(this.cursorPostion)
      // 定义插入的dom元素
      const span = document.createElement('span')
      span.classList.add('alarm-table-data')
      span.style="color: blue; margin: 3px;"
      span.innerHTML = alarmTableData
      span.setAttribute('contenteditable', 'false')
      span.setAttribute('data-info', alarmTableData)
      console.log(selection.focusNode.parentElement);
      // console.log();
      if(selection.focusNode.parentElement.classList.contains('alarm-table-data')){
        console.log('in');
        const selectedDom = selection.focusNode.parentElement
        selectedDom.remove()
      }

      this.cursorPostion.deleteContents()
      this.cursorPostion.insertNode(span)

      // 添加不可见空格
      const zeroWidthSpace = document.createTextNode('\u200B')
      span.parentNode.insertBefore(zeroWidthSpace, span.nextElementSibling)
      
      // 将光标位置更改到插入文字后
      this.cursorPostion.setStartAfter(zeroWidthSpace)
      this.cursorPostion.setEndAfter(zeroWidthSpace)
      selection.removeAllRanges()
      selection.addRange(this.cursorPostion)
      this.saveSelection()
    },
    // 保存当前光标位置
    saveSelection () {
      const selection = window.getSelection();
      
      if (selection.rangeCount > 0) {
        // 保存当前光标位置
        this.cursorPostion = selection.getRangeAt(0)        
      }
    },
    // updateContent () {
    //   // console.log(this.$refs.editableTitle.innerHTML)
    // },
    initSelection () {
      const range = document.createRange()
      range.setStart(this.$refs.editableTitle, 0)
      range.collapse(true)
      this.cursorPostion = range
    }
  },
  mounted () {
    this.initSelection()
  }
}
</script>

<style>
.sx-alarm-push-titel-editor {
  width: 300px;
  min-height: 50px;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-top: 10px;
  /* overflow-y: auto; */
}
</style>