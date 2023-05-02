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
        v-loading="loading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="名称"
          prop="name"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="字典"
          prop="dictionary"
          min-width="120px"
        ></el-table-column>
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
          label-width="80px"
        >
          <el-form-item label="名称：" prop="name">
            <el-input v-model="dialogData.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="字典：" prop="dictionary">
            <el-input v-model="dialogData.dictionary" placeholder="请输入" />
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
import { industryCategory, industryCategoryAdd, industryCategoryEdit, industryCategoryDel } from '@/api/exhibitionType'

@Component({})
export default class extends Vue {
    private tableKey = 0
    private list = []
    private loading = false
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      update: '编辑',
      create: '新增'
    }

    private rules = {
      name: [{ required: true, message: '请输入', trigger: 'blur' }],
      dictionary: [{ required: true, message: '请输入', trigger: 'blur' }]
    }

    private dialogData = {}

    private handleAdd() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private handleUpdate(row: any) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.dialogData = {
        ...row
      }
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private handleDelete(row: any) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { code }: any = await industryCategoryDel(row.id)
        if (code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.devData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

    private createData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const params = {
            ...this.dialogData
          }
          const { code }: any = await industryCategoryAdd(params)
          if (code === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.devData()
          }
        }
      })
    }

    private updateData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          const params = {
            ...this.dialogData
          }
          const { code }: any = await industryCategoryEdit(params)
          if (code === 0) {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.devData()
          }
        }
      })
    }

    private async devData() {
      const params = {}
      const { code, data }: any = await industryCategory(params)
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
