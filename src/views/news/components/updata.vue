<template>
    <el-form
        ref="newsForm"
        :rules="rules"
        :model="options"
        label-position="right"
        label-width="120px"
    >
        <el-form-item label="图片：" prop="img_list">
            <UploadImage :imageUrl.sync="options.img_list" />
        </el-form-item>
        <el-form-item label="标题：" prop="title">
            <el-input v-model="options.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发布日期：" prop="create_date">
            <el-date-picker
                v-model="options.create_date"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="来源：" prop="origin">
            <el-input v-model="options.origin" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="观看数：" prop="views">
            <el-input v-model="options.views" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述：" prop="des">
            <Tinymce
                v-model="options.des"
                :height="400"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import UploadImage from '@/components/UploadImage/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import { Form } from 'element-ui'
import { informationAdd, informationEdit } from '@/api/news'

@Component({
  components: { UploadImage, Tinymce }
})
export default class extends Vue {
    @Prop({ default: () => ({}) }) private options!: object
    @Prop({ default: false }) private isEdit!: boolean

    private rules = {}
    private onSubmit() {
      (this.$refs.newsForm as Form).validate(async(valid) => {
        if (valid) {
          const params = {
            ...this.options
          }
          const url = this.isEdit ? informationEdit : informationAdd
          const { code }: any = await url(params)
          if (code === 0) {
            this.$notify({
              title: '成功',
              message: this.isEdit ? '编辑成功' : '创建成功',
              type: 'success',
              duration: 2000
            })
            this.$emit('submit')
          }
        }
      })
    }

    private cancel() {
      this.$emit('cancel')
    }
}
</script>

<style lang="scss" scoped>

</style>
