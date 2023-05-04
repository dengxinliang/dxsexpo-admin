<template>
    <el-form
        ref="newsForm"
        :rules="rules"
        :model="options"
        label-position="right"
        label-width="120px"
    >
        <el-form-item label="展会名称：" prop="des">
            <el-input
                v-model="options.des"
                placeholder="请输入"
            />
        </el-form-item>
        <el-form-item label="图片：" prop="img_list">
            <UploadImage :imageUrl.sync="options.img_list" />
        </el-form-item>
        <el-form-item label="行业类型：" prop="industry_category_id">
            <el-select v-model="options.industry_category_id" placeholder="请选择" style="width: 100%;">
                <el-option
                    v-for="item in industryRows"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="发布日期：" prop="create_date">
            <el-date-picker
                v-model="options.create_date"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="现场照：" prop="site_photos">
            <UploadImageList :fileList.sync="options.site_photos" @tapFileList="tapFileList" />
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
import UploadImageList from '@/components/UploadImageList/index.vue'
import { industryCategory } from '@/api/exhibitionType'
import { Form } from 'element-ui'
import { exhibitionSceneAdd, exhibitionSceneEdit } from '@/api/exhibitionScene'

@Component({
  components: { UploadImage, UploadImageList }
})
export default class extends Vue {
    @Prop({ default: () => ({}) }) private options!: any
    @Prop({ default: false }) private isEdit!: boolean

    private rules = {}
    private industryRows = []
    private fileList = this.options?.site_photos

    private tapFileList(list: any) {
      this.fileList = list
    }

    private onSubmit() {
      (this.$refs.newsForm as Form).validate(async(valid) => {
        if (valid) {
          const params = {
            ...this.options,
            site_photos: JSON.stringify(this.fileList),
            industry_name: String,
            industry_dictionary: String || Number
          }
          const url = this.isEdit ? exhibitionSceneEdit : exhibitionSceneAdd
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

    private async industryCategory() {
      const params = {}
      const { code, data }: any = await industryCategory(params)
      if (code === 0) {
        this.industryRows = data || []
      }
    }

    created() {
      this.industryCategory()
    }
}
</script>

<style lang="scss" scoped>

</style>
