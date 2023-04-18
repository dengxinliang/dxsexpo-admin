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
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column label="展会logo" prop="imgUrl" width="80px">
        <template slot-scope="{ row }">
          <el-image
            style="width: 100%"
            :src="row.imgUrl"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="展会名称"
        prop="title"
        min-width="120px"
      ></el-table-column>
      <el-table-column
        label="展会日期"
        prop="times"
        min-width="120px"
      ></el-table-column>
      <el-table-column
        label="展会地址"
        prop="address"
        min-width="120px"
      ></el-table-column>
      <el-table-column
        label="展会周期"
        prop="period"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        label="承办方"
        prop="organizer"
        min-width="80px"
      ></el-table-column>
      <el-table-column
        label="行业类型"
        prop="type"
        min-width="100px"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="120"
        class-name="fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="tapDetail(row)">详情</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :page="options.page" :limit="options.limit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Pagination from "@/components/Pagination/index.vue";

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

  private handleUpdate(row: any) {
    console.log(row);
  }
  private handleDelete(row: any) {
    console.log(row);
  }
  private tapDetail(row: any) {
    this.$emit('tapDetail', row)
  }
}
</script>