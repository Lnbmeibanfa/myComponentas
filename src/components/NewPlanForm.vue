<template>
  <div>
    <el-popover
    placement="bottom"
    trigger="click"
    >
      <!-- 下拉按钮 -->
      <el-button slot="reference" icon="el-icon-plus">增加推送渠道</el-button>
      <!-- 下拉面板 -->
      <div class="sx-push-channel-pop-menu">
        <el-button @click="test" type="text">平台</el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    test () {
      console.log(1);
      
    }
  }
}
</script>

<style>

</style>