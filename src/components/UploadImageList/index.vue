<template>
    <div class="upload-container upload-image-list">
      <el-upload
        class="upload-demo"
        list-type="picture"
        name="imgs"
        :action="action"
        :headers="headers"
        :multiple="true"
        :file-list="fileList"
        :on-success="handleImageSuccess"
        :on-remove="handleRemove">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

  @Component({
    name: 'UploadImageList'
  })
export default class extends Vue {
    @Prop({ default: () => [] }) private fileList?: any[]

    private action = process.env.VUE_APP_BASE_API + '/stage-api/upload'
    private headers = {
      'X-Access-Token': UserModule.token
    }

    private handleRemove(file: any, fileList: any) {
      this.initFile(fileList)
    }

    private handleImageSuccess(res: any, file: any, fileList: any) {
      this.initFile(fileList)
    }

    private initFile(fileList: any) {
      const list = fileList.map((item: any) => {
        if (item.response) {
          const { data } = item.response
          return {
            name: item.name,
            url: process.env.VUE_APP_BASE_API + data[0].url
          }
        } else {
          return {
            name: item.name,
            url: item.url
          }
        }
      })
      this.$emit('tapFileList', list)
    }
}
</script>

  <style lang="scss" scoped>
  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
  }
  </style>
  <style lang="scss">
  .upload-image-list{
    .el-upload{
        width: auto;
    }
  }
  </style>
