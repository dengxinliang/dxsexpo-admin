<template>
    <div class="upload-container upload-image-list">
      <el-upload
        class="upload-demo"
        action="#"
        list-type="picture"
        :data="dataObj"
        :multiple="true"
        :file-list="fileList"
        :on-preview="handlePreview"
        :on-remove="handleRemove">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  
  @Component({
    name: 'UploadImageList'
  })
  export default class extends Vue {
    private fileList = [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    ]
    private dataObj = { token: '', key: '' }

    private handleRemove(file: any, fileList: any) {
        console.log(file, fileList);
    }
    private handlePreview(file: any) {
        console.log(file);
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
  