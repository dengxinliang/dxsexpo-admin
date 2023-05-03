<template>
    <div class="app-container">
        <Tinymce
            v-model="options.des"
            :height="400"
        />
        <div class="btn">
            <el-button
                type="primary"
                size="mini"
                @click="submit"
            >提交</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'
import { companyInfo, companyInfoAdd, companyInfoEdit } from '@/api/enterprise'

@Component({
  components: { Tinymce }
})
export default class extends Vue {
    private options = {}

    private async submit() {
      const params = this.options
      const { id }: any = this.options
      const url = id ? companyInfoEdit : companyInfoAdd
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

    private async devData() {
      const params = {}
      const { code, data }: any = await companyInfo(params)
      if (code === 0) {
        this.options = data || {}
      }
    }

    created() {
      this.devData()
    }
}
</script>

<style lang="scss" scoped>
.btn{
    margin-top: 20px;
    text-align: right;
}
</style>
