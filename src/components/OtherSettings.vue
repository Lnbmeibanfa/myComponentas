<template>
  <div class="sx-alarm-other-settings h100 w100">
    <el-form ref="settingsForm"
    :model="settingsForm">
      <el-form-item label="执行计划">
        <el-button icon="el-icon-plus">新建/修改执行计划</el-button>
      </el-form-item>
      <el-form-item label="权限设置" prop="powerSetting">
        <el-radio v-model="settingsForm.powerSetting" label="self">仅自己可见</el-radio>
        <el-radio v-model="settingsForm.powerSetting" label="selfAndrecipient">仅自己和接收人可见</el-radio>
        <el-radio v-model="settingsForm.powerSetting" label="all">所有人可见</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * 5.其他设置界面
 */
export default {
  name: 'SxOtherSettings',
  data () {
    return {
      settingsForm: {
        powerSetting: 'self'
      }
    }
  }
}
</script>

<style>

</style>