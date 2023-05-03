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
                label="标题"
                prop="title"
                min-width="120px"
            ></el-table-column>
            <el-table-column
                label="icon"
                prop="icon"
                width="100"
            ></el-table-column>
            <el-table-column
                label="描述"
                prop="des"
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
            :title="dialogData.title"
            :visible.sync="dialogData.isShow"
        >
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="dialogData.options"
                label-position="right"
                label-width="120px"
            >
                <el-form-item label="标题：" prop="title">
                    <el-input v-model="dialogData.options.title" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="icon：" prop="icon">
                    <el-input v-model="dialogData.options.icon" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="描述：" prop="des">
                    <el-input v-model="dialogData.options.des" type="textarea" :rows="2" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <div
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogData.isShow = false">取消</el-button>
                <el-button
                    type="primary"
                    @click="dialogData.status==='add'?createData():updateData()"
                >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { exhibitionProcess, exhibitionProcessAdd, exhibitionProcessEdit, exhibitionProcessDel } from '@/api/exhibition-guide'

@Component({
})
export default class extends Vue {
    private tableKey = 0
    private listLoading = false
    private list = []
    private dialogData = {
      isShow: false,
      status: '',
      title: '',
      options: {}
    }

    private rules = {}

    private handleAdd() {
      this.dialogData = {
        isShow: true,
        status: 'add',
        title: '新增',
        options: {}
      }
    }

    private handleUpdate(row: any) {
      this.dialogData = {
        isShow: true,
        status: 'edit',
        title: '编辑',
        options: row
      }
    }

    private handleDelete(row: any) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { code }: any = await exhibitionProcessDel(row.id)
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

    private async createData() {
      const { options } = this.dialogData
      const params = options
      const { code }: any = await exhibitionProcessAdd(params)
      if (code === 0) {
        this.dialogData.isShow = false
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        })
        this.devData()
      }
    }

    private async updateData() {
      const { options } = this.dialogData
      const params = options
      const { code }: any = await exhibitionProcessEdit(params)
      if (code === 0) {
        this.dialogData.isShow = false
        this.$notify({
          title: '成功',
          message: '编辑成功',
          type: 'success',
          duration: 2000
        })
        this.devData()
      }
    }

    private async devData() {
      this.listLoading = true
      const params = {}
      const { code, data }: any = await exhibitionProcess(params)
      if (code === 0) {
        this.list = data || []
        this.listLoading = false
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
