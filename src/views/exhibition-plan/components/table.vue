<template>
  <div>
    <el-table
      :key="tableKey"
      v-loading="loading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="展会logo" prop="logo" width="80px">
        <template slot-scope="{row}">
          <el-image
            style="width: 100%"
            :src="row.logo"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="展会名称"
        prop="name"
        min-width="120px"
      ></el-table-column>
      <el-table-column
        label="展会日期"
        prop="exhibition_date"
        min-width="80px"
      >
        <!-- <template slot-scope="{row}">{{ parseTime(new Date(row.exhibition_date), '{y}-{m}-{d}') }}</template> -->
      </el-table-column>
      <el-table-column
        label="展会地址"
        prop="address"
        min-width="120px"
      ></el-table-column>
      <el-table-column
        label="展会周期"
        prop="exhibition_cycle"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        label="主办方"
        prop="organizer"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        label="行业类型"
        prop="industry_name"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="160"
        class-name="fixed-width"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="tapDetail(row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page="options.page" :limit="options.limit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { parseTime } from '@/utils/index'
import { exhibitionPlanDel } from '@/api/exhibitionPlan'

@Component({
  components: { Pagination }
})
export default class extends Vue {
  @Prop({ default: () => [] }) private list!: any[];
  private tableKey = 0;
  private loading = false;
  private total = 10
  private options = {
    page: 1,
    limit: 10
  }

  private parseTime = parseTime

  private handleUpdate(row: any) {
    const obj = {
      ...row,
      exhibition_date: row.exhibition_date?.split('~')
    }
    this.$emit('tapEdit', obj)
  }

  private handleDelete(row: any) {
    this.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      const { code }: any = await exhibitionPlanDel(row.id)
      if (code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.$emit('tapDel')
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }

  private tapDetail(row: any) {
    this.$emit('tapDetail', row)
  }
}
</script>
