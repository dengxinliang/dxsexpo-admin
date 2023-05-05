<template>
    <div class="app-container">
      <div class="btn">
        <el-button
            type="primary"
            size="mini"
            @click="handleAdd"
        >新增</el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="序号"
          align="center"
          width="80"
        >
          <template slot-scope="{$index}">
            <span>{{ $index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="图片"
          width="80"
        >
          <template slot-scope="{row}">
            <el-image
                style="width: 100%;"
                :src="row.img_list"
                :preview-src-list="[row.img_list]"
                fit="cover"></el-image>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="图片名称"
          prop="title"
          min-width="120px"
        ></el-table-column> -->
        <el-table-column
          label="图片链接"
          prop="img_list"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="跳转链接"
          prop="href"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="是否首页展示"
          align="center"
          width="120"
        >
          <template slot-scope="{row}">
            {{ row.is_home === 1 ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          align="center"
          width="100"
        >
          <template slot-scope="{$index}">
            <i class="el-icon-sort-down" v-if="$index < list.length"></i>
            <i class="el-icon-sort-up" v-if="$index > 0"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="120"
          class-name="fixed-width"
        >
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        :title="textMap[dialogStatus]"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="dialogData"
          label-position="right"
          label-width="120px"
        >
          <el-form-item label="banner图片：" prop="img_list">
            <UploadImage :imageUrl.sync="dialogData.img_list" />
          </el-form-item>
          <el-form-item label="跳转链接：" prop="href">
            <el-input v-model="dialogData.href" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="是否首页展示：" prop="is_home">
            <el-radio-group v-model="dialogData.is_home">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="dialogStatus==='create'?createData():updateData()"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import UploadImage from '@/components/UploadImage/index.vue'
import { banner, bannerAdd, bannerEdit, bannerDel } from '@/api/banner'

  @Component({
    name: 'Banner',
    components: { UploadImage }
  })
export default class extends Vue {
    private tableKey = 0
    private list = []
    private listLoading = true
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      update: '编辑',
      create: '新增'
    }

    private rules = {
      img_list: [{ required: true, message: '请上传图片', trigger: 'blur' }]
    }

    private dialogData = {}

    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const params = {}
      const { code, data }: any = await banner(params)
      if (code === 0) {
        this.list = data || []
        this.listLoading = false
      }
    }

    private createData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const params = this.dialogData
          const { code }: any = await bannerAdd(params)
          if (code === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        }
      })
    }

    private handleAdd() {
      this.dialogData = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private handleUpdate(row: any) {
      this.dialogData = row
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private updateData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const params = this.dialogData
          const { code }: any = await bannerEdit(params)
          if (code === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        }
      })
    }

    private handleDelete(row: any) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { code }: any = await bannerDel(row.id)
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
}
</script>

  <style lang="scss" scoped>
  .btn{
    margin-bottom: 10px;
  }
  </style>
