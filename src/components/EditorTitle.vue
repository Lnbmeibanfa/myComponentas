<template>
  <div>
    <!-- 下拉框用于选择插入的元素 -->
    <el-select 
      v-model="selectedElement" 
      placeholder="选择元素" 
      @mousedown.prevent 
      @change="insertElement">
      <el-option label="蓝色文本" value="blueText"></el-option>
      <el-option label="红色文本" value="redText"></el-option>
    </el-select>

    <!-- 可编辑的区域 -->
    <div
      ref="editableDiv"
      contenteditable="true"
      class="editable-div"
      @input="updateContent"
      @mouseup="saveSelection"
      @keyup="saveSelection"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedElement: '',
      content: '',
      cursorPostion: null, // 用于保存光标位置的 Range 对象
    };
  },
  methods: {
    saveSelection() {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        this.cursorPostion = selection.getRangeAt(0); // 保存当前光标位置
      }
    },
    updateContent(event) {
      this.content = event.target.innerHTML;
    },
    insertElement() {
      if (!this.selectedElement || !this.cursorPostion) return;

      // 插入的 DOM 元素定义
      const elements = {
        blueText: '<class="editable-element" span style="color: blue;" contenteditable="false">蓝色文字</span>&#8203',
        redText: '<class="editable-element" span style="color: red;" contenteditable="false">红色文字</span>&#8203',
      };

      // 恢复保存的光标位置
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(this.cursorPostion);

      // 创建一个 span 元素，并插入选择的内容
      const span = document.createElement('span');
      span.innerHTML = elements[this.selectedElement];
      this.cursorPostion.deleteContents(); // 删除选定的内容
      this.cursorPostion.insertNode(span); // 插入新的节点

      // 更新光标位置到插入的文字之后
      this.cursorPostion.setStartAfter(span);
      this.cursorPostion.setEndAfter(span);
      selection.removeAllRanges();
      selection.addRange(this.cursorPostion);

      // // 如果当前有选中元素，则替换选中元素
      // if (selection.focusNode.parentElement.classList.contains('editable-element')) {
      //   const parentElement = selection.focusNode.parentElement;
      //   parentElement.outerHTML = elements[this.selectedElement];
      // } else {
      //   // 创建一个 span 元素，并插入选择的内容
      //   const span = document.createElement('span');
      //   span.innerHTML = elements[this.selectedElement];
      //   this.cursorPostion.deleteContents(); // 删除选定的内容
      //   this.cursorPostion.insertNode(span); // 插入新的节点

      //   // 更新光标位置到插入的文字之后
      //   this.cursorPostion.setStartAfter(span);
      //   this.cursorPostion.setEndAfter(span);
      //   selection.removeAllRanges();
      //   selection.addRange(this.cursorPostion);
      // }
      // 清空下拉选择
      this.selectedElement = '';
      
      // 更新输入框的内容
      this.updateContent({ target: this.$refs.editableDiv });

      // 重新保存光标位置
      this.saveSelection();
    },
  },
};
</script>

<style>
.editable-div {
  min-height: 100px;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-top: 10px;
  overflow-y: auto;
}
</style>
