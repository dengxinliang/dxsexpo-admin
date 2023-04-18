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
          prop="title"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="字典"
          prop="type"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="排序"
          align="center"
          width="100"
        >
          <template slot-scope="{row, $index}">
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
          <template slot-scope="{row, $index}">
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(row, $index)"
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
          <el-form-item label="名称：" prop="title">
            <el-input v-model="dialogData.title" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="字典：" prop="type">
            <el-input v-model="dialogData.type" placeholder="请输入" />
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

@Component({})
export default class extends Vue {
    private tableKey = 0
    private list = []
    private loading = false
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      add: '新增',
      update: '编辑',
      create: 'Create'
    }
    private rules = {
        title: [{ required: true, message: '请输入', trigger: 'blur' }],
        type: [{ required: true, message: '请输入', trigger: 'blur' }]
    }
    private dialogData = {}

    private handleAdd() {
        this.dialogStatus = 'add'
        this.dialogFormVisible = true
        this.$nextTick(() => {
            (this.$refs.dataForm as Form).clearValidate()
        })
    }
    private handleUpdate(row: any) {
        console.log(row)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
            (this.$refs.dataForm as Form).clearValidate()
        })
    }
    private handleDelete(row: any) {
        console.log(row)
    }
    private createData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          console.log('11111', this.dialogData)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
    private updateData() {
      (this.$refs.dataForm as Form).validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
}
</script>

<style lang="scss" scoped>
.btn{
    margin-bottom: 10px;
}
</style>