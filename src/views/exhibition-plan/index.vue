<template>
    <div class="app-container">
      <Search />
      <div class="btn">
        <el-button
            type="primary"
            size="mini"
            @click="handleAdd"
        >新增</el-button>
      </div>
      <Table :list="rows" @tapDetail="tapDetail" @tapEdit="tapEdit" @tapDel="tapDel" />
      <el-dialog
        :title="dialogData.title"
        :visible.sync="dialogData.isShow"
        width="1200px"
      >
        <Updata :isEdit="dialogData.isEdit" :options="dialogData.options" @submit="submit" @cancel="dialogData.isShow = false" />
      </el-dialog>
      <el-dialog
        title="详情"
        :visible.sync="detailData.isShow"
        width="1200px"
      >
        <Detail :options="detailData.options" />
      </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Table from './components/table.vue'
import Search from './components/search.vue'
import Updata from './components/updata.vue'
import Detail from './components/detail.vue'
import { exhibitionPlan } from '@/api/exhibitionPlan'

@Component({
  components: { Table, Search, Updata, Detail }
})
export default class extends Vue {
    private rows = []
    private dialogData = {
      isShow: false,
      title: '',
      isEdit: false,
      options: {
        des: ''
      }
    }

    private detailData = {
      isShow: false,
      options: {}
    }

    private handleAdd() {
      this.dialogData = {
        isShow: true,
        title: '新增',
        isEdit: false,
        options: {
          des: ''
        }
      }
    }

    private tapEdit(row: any) {
      this.dialogData = {
        isShow: true,
        title: '编辑',
        isEdit: true,
        options: row
      }
    }

    private tapDetail(row: any) {
      this.detailData = {
        isShow: true,
        options: row
      }
    }

    private submit() {
      this.dialogData.isShow = false
      this.devData()
    }

    private tapDel() {
      this.devData()
    }

    private async devData() {
      const params = {}
      const { code, data }: any = await exhibitionPlan(params)
      if (code === 0) {
        this.rows = data || []
      }
    }

    created() {
      this.devData()
    }
}
</script>

<style lang="scss" scoped>

.btn{
    margin-bottom: 10px;
}
</style>
