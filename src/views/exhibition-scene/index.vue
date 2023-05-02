<template>
    <div class="app-container">
        <div class="btn">
            <el-button
                type="primary"
                size="mini"
                @click="handleAdd"
            >新增</el-button>
        </div>
        <Table :list="list" @tapEdit="tapEdit" @tapDetail="tapDetail" @tapDel="tapDel" />
        <el-dialog
            :title="dialogData.title"
            :visible.sync="dialogData.isShow"
            width="640px"
        >
            <Updata :options="dialogData.options" @submit="submit" @cancel="dialogData.isShow = false" />
        </el-dialog>
        <el-dialog
            title="详情"
            :visible.sync="detailData.isShow"
            width="1200px"
        >
            <Detail />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Table from './components/table.vue'
import Updata from './components/updata.vue'
import Detail from './components/detail.vue'
import { exhibitionScene } from '@/api/exhibitionScene'
@Component({
  components: { Table, Updata, Detail }
})
export default class extends Vue {
    private list = []
    private dialogData = {
      isShow: false,
      title: '',
      isEdit: false,
      options: {}
    }

    private detailData = {
      isShow: false,
      options: {}
    }

    private tapEdit(row: any) {
      this.dialogData = {
        isShow: true,
        title: '编辑',
        isEdit: true,
        options: row
      }
    }

    private handleAdd() {
      this.dialogData = {
        isShow: true,
        title: '新增',
        isEdit: false,
        options: {}
      }
    }

    private submit() {
      this.dialogData.isShow = false
      this.devData()
    }

    private tapDetail(row: any) {
      this.detailData = {
        isShow: true,
        options: row
      }
    }

    private tapDel() {
      this.devData()
    }

    private async devData() {
      const params = {}
      const { code, data }: any = await exhibitionScene(params)
      if (code === 0) {
        this.list = data || []
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
