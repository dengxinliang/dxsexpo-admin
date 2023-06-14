<template>
    <div class="upload-container upload-image-list">
      <el-upload
        class="upload-demo"
        list-type="picture"
        name="imgs"
        :action="action"
        :headers="headers"
        :multiple="true"
        :show-file-list="false"
        :on-success="handleImageSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="file-item" v-for="(item, index) in fileList" :key="index">
        <div class="info">
          <img :src="'http://www.expoes.com.cn' + item.url" alt="">
          <span>{{ item.name }}</span>
        </div>
        <div class="options">
          <i class="el-icon-top" @click="swapArray(fileList, index, index - 1)" v-if="index > 0"></i>
          <i class="el-icon-bottom" @click="swapArray(fileList, index, index + 1)" v-if="index < fileList.length - 1"></i>
          <i class="el-icon-delete" @click="remove(index)"></i>
        </div>
      </div>
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

    private handleImageSuccess(res: any, file: any) {
      console.log(res)
      if (file.status === 'success') {
        const list = this.fileList
        list?.push({
          name: file.name,
          url: file.response.data[0].url
        })
        this.$emit('update:fileList', list)
      }
    }

    private remove(index: number) {
      this.fileList?.splice(index, 1)
    }

    private swapArray(arr: any, index: number, newIndex: number) {
      arr[index] = arr.splice(newIndex, 1, arr[index])[0]
      this.$emit('update:fileList', arr)
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
  .file-item{
    padding: 6px;
    margin: 6px 0;
    border: 1px solid rgba(0, 0, 0, .08);
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info{
      display: flex;
      align-items: center;
    }
    .options{
      padding-right: 20px;
      i{
        font-size: 20px;
        margin: 0 10px;
        cursor: pointer;
      }
    }
    img{
      width: 80px;
      height: 80px;
      display: block;
      margin-right: 10px;
    }
  }
  </style>
