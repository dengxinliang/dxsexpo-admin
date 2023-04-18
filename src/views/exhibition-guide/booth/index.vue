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
                        :src="row.imgUrl"
                        fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                label="标题"
                prop="title"
                min-width="120px"
            ></el-table-column>
            <el-table-column
                label="描述"
                prop="tips"
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
                <el-form-item label="描述：" prop="tips">
                    <el-input v-model="dialogData.options.tips" type="textarea" :rows="2" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="图片：" prop="imgUrl">
                    <UploadImage />
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadImage from '@/components/UploadImage/index.vue'

@Component({
    components: { UploadImage }
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
        console.log(row)
    }
    private handleDelete(row: any, index: number) {
        console.log(row, index)
    }
}
</script>

<style lang="scss" scoped>
.btn{
    margin-bottom: 10px;
}
</style>