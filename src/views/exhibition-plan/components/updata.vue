<template>
    <el-form
        ref="dataForm"
        :rules="rules"
        :model="options"
        label-position="right"
        label-width="120px"
    >
        <el-form-item label="展会logo：" prop="logo">
            <UploadImage :imageUrl.sync="options.logo" />
        </el-form-item>
        <el-form-item label="展会名称：" prop="name">
            <el-input v-model="options.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展会日期：" prop="exhibition_date">
            <el-date-picker
                v-model="options.exhibition_date"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="展会地址：" prop="address">
            <el-input v-model="options.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展会周期：" prop="exhibition_cycle">
            <el-input v-model="options.exhibition_cycle" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="承办方：" prop="organizer">
            <el-input v-model="options.organizer" placeholder="请输入" />
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
        <el-form-item label="展会介绍：" prop="des">
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
import { industryCategory } from '@/api/exhibitionType'
import { exhibitionPlanAdd, exhibitionPlanEdit } from '@/api/exhibitionPlan'

@Component({
  components: { UploadImage, Tinymce }
})
export default class extends Vue {
    @Prop({ default: () => ({}) }) private options!: object
    @Prop({ default: false }) private isEdit!: boolean

    private rules = {}
    private industryRows = []

    private onSubmit() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const params = {
            ...this.options,
            industry_name: String,
            industry_dictionary: String || Number
          }
          const url = this.isEdit ? exhibitionPlanEdit : exhibitionPlanAdd
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
