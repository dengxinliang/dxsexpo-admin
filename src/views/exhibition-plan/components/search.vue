<template>
  <el-form :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="展会名称：">
      <el-input v-model="formData.title" placeholder="请输入关键字"></el-input>
    </el-form-item>
    <el-form-item label="行业类型：">
      <el-select v-model="formData.type" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button>重置</el-button>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class extends Vue {
    private formData = {}

    private onSubmit() {
        console.log('111111', this.formData)
    }
}
</script>

<style lang="scss" scoped>
</style>