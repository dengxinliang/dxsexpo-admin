<template>
    <div class="app-container">
        <el-form
            ref="newsForm"
            :rules="rules"
            :model="options"
            label-position="right"
            label-width="120px"
        >
            <el-form-item label="logo：" prop="logo">
                <UploadImage :imageUrl.sync="options.logo" />
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="options.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="创建日期：" prop="create_date">
                <el-date-picker
                    v-model="options.create_date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="电话：" prop="mobile">
                <el-input v-model="options.mobile" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <el-input v-model="options.email" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="传真：" prop="fax">
                <el-input v-model="options.fax" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="options.address" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="介绍：" prop="des">
                <Tinymce
                    v-model="options.des"
                    :height="400"
                />
            </el-form-item>
            <el-form-item label="企业照片：" prop="img_list">
                <UploadImageList :fileList.sync="options.img_list" @tapFileList="tapFileList" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="submitForm('newsForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import UploadImage from '@/components/UploadImage/index.vue'
import UploadImageList from '@/components/UploadImageList/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'
import { company, companyAdd, companyEdit } from '@/api/enterprise'

@Component({
  components: { UploadImage, UploadImageList, Tinymce }
})
export default class extends Vue {
    private rules = {
      logo: [{ required: true, message: '不能为空' }],
      name: [{ required: true, message: '不能为空' }],
      create_date: [{ required: true, message: '不能为空' }],
      mobile: [{ required: true, message: '不能为空' }],
      email: [{ required: true, message: '不能为空' }],
      address: [{ required: true, message: '不能为空' }]
    }

    private options = {}
    private imgList = []
    private submitForm(formName: string) {
      (this.$refs[formName] as Form).validate(async(valid: any) => {
        if (valid) {
          const params = {
            ...this.options,
            img_list: JSON.stringify(this.imgList)
          }
          const { id }: any = this.options
          const url = id ? companyEdit : companyAdd
          const { code }: any = await url(params)
          if (code === 0) {
            this.$notify({
              title: '成功',
              message: id ? '修改成功' : '创建成功',
              type: 'success',
              duration: 2000
            })
            this.devData()
          }
        }
      })
    }

    private tapFileList(list: any) {
      this.imgList = list
    }

    private async devData() {
      const params = {}
      const { code, data }: any = await company(params)
      if (code === 0) {
        const obj = data || {}
        this.options = {
          ...obj,
          img_list: obj.img_list ? JSON.parse(obj.img_list) : obj.img_list
        }
        this.imgList = obj.img_list ? JSON.parse(obj.img_list) : obj.img_list
      }
    }

    created() {
      this.devData()
    }
}
</script>

<style lang="scss" scoped>

</style>
