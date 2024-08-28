<template>
  <div>
    <!-- 按钮，点击显示下拉框 -->
    <button @click="showDropdown = !showDropdown">选择元素类型</button>

    <!-- 下拉框 -->
    <ul v-if="showDropdown" class="dropdown-menu">
      <li @click="generateElement('paragraph')">段落</li>
      <li @click="generateElement('heading')">标题</li>
      <li @click="generateElement('button')">按钮</li>
    </ul>

    <!-- 动态生成的 DOM 元素 -->
    <div v-if="generatedElement === 'paragraph'">
      <p>这是一个段落元素</p>
    </div>
    <div v-else-if="generatedElement === 'heading'">
      <h1>这是一个标题元素</h1>
    </div>
    <div v-else-if="generatedElement === 'button'">
      <button>这是一个按钮元素</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,        // 控制下拉框显示/隐藏
      generatedElement: ''        // 存储生成的元素类型
    };
  },
  methods: {
    generateElement(elementType) {
      this.generatedElement = elementType;
      this.showDropdown = false;  // 隐藏下拉框
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需要进行调整 */
.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  background-color: #fff;
  position: absolute;
}

.dropdown-menu li {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
