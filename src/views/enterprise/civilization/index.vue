<template>
    <div class="app-container">
        <Tinymce
            v-model="describe"
            :height="400"
        />
        <div class="btn">
            <el-button
                type="primary"
                size="mini"
                @click="submit"
            >提交</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tinymce from '@/components/Tinymce/index.vue'

@Component({
    components: { Tinymce }
})
export default class extends Vue {
    private describe = ''

    private submit() {}
}
</script>

<style lang="scss" scoped>
.btn{
    margin-top: 20px;
    text-align: right;
}
</style>