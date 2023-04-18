<template>
    <div class="app-container">
        <div class="btn">
            <el-button
                type="primary"
                size="mini"
                @click="handleAdd"
            >新增</el-button>
        </div>
        <Table />
        <el-dialog
            :title="dialogData.title"
            :visible.sync="dialogData.isShow"
            width="640px"
        >
            <Updata />
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
@Component({
    components: { Table, Updata, Detail }
})
export default class extends Vue {
    private dialogData = {
        isShow: false,
        title: ''
    }
    private detailData = {
        isShow: false
    }

    private handleAdd() {
        this.dialogData = {
            isShow: true,
            title: '新增'
        }
    }
}
</script>

<style lang="scss" scoped>
.btn{
    margin-bottom: 10px;
}
</style>