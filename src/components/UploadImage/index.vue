<template>
  <div class="upload-container">
    <el-upload
      class="avatar-uploader"
      name="imgs"
      :action="action"
      :headers="headers"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'UploadImage'
})
export default class extends Vue {
  @Prop({ default: '' }) private imageUrl!: string

  private action = process.env.VUE_APP_BASE_API + '/stage-api/upload'
  private headers = {
    'X-Access-Token': UserModule.token
  }

  private beforeAvatarUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      // this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      // this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M
  }

  private handleImageSuccess(res: any) {
    const { code, data } = res
    if (code === 0) {
      const url = data[0].url
      this.$emit('update:imageUrl', url)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: fit-content;
  position: relative;
  @include clearfix;
}
</style>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
