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
          <template slot-scope="{row, $index}">
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
                :src="row.imgUrl"
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
          prop="imgUrl"
          min-width="120px"
        >
          <template slot-scope="{row}">
            <el-image 
              style="width: 100%; height: 100%;"
              :src="row.imgUrl" 
              :preview-src-list="[row.imgUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="跳转链接"
          prop="linkUrl"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          label="是否首页展示"
          align="center"
          width="120"
        >
          <template slot-scope="{row}">
            {{ row.isShow ? '是' : '否' }}
          </template>
        </el-table-column>
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
          label-width="120px"
        >
          <el-form-item label="banner图片：" prop="imgUrl">
            <UploadImage />
          </el-form-item>
          <el-form-item label="跳转链接：" prop="linkUrl">
            <el-input v-model="dialogData.link" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="是否首页展示：" prop="isShow">
            <el-radio-group v-model="dialogData.isShow">
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
      add: '新增',
      update: '编辑',
      create: 'Create'
    }
  
    private rules = {
      imgUrl: [{ required: true, message: '请上传图片', trigger: 'blur' }]
    }
  
    private dialogData = {}
  
    created() {
      this.getList()
    }
  
    private async getList() {
      this.listLoading = true
      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }
  
    private handleFilter() {
      this.getList()
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
  
    private handleDelete(row: any, index: number) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    }
  }
  </script>

  <style lang="scss" scoped>
  .btn{
    margin-bottom: 10px;
  }
  </style>
  