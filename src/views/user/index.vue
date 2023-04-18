<template>
    <div class="app-container">
        <!-- <div class="btn">
            <el-button
                type="primary"
                size="mini"
                @click="handleAdd"
            >新增</el-button>
        </div> -->
        <Table />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Table from './components/table.vue'

@Component({
    components: { Table }
})
export default class extends Vue {
    private handleAdd() {}
}
</script>

<style lang="scss" scoped>
.btn{
    margin-bottom: 10px;
}
</style>