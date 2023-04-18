<template>
  <div class="dashboard-editor-container">
    <h1>欢迎进入“东新盛（上海）展览有限公司”后台管理系统！</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'DashboardAdmin'
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  position: relative;
  h1{
    text-align: center;
    padding-top: 90px;
  }
}
</style>
