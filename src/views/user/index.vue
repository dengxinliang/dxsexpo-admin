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
import { getUsers } from '@/api/users'

@Component({
  components: { Table }
})
export default class extends Vue {
    private list = []
    // private handleAdd() {}

    private async devData() {
      const params = {}
      const { code, data }: any = await getUsers(params)
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
