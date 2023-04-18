<template>
    <div class="app-container">
        <el-form
            ref="newsForm"
            :rules="rules"
            :model="options"
            label-position="right"
            label-width="120px"
        >
            <el-form-item label="logo：" prop="imgUrl">
                <UploadImage />
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="options.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="创建日期：" prop="times">
                <el-date-picker
                    v-model="options.times"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="电话：" prop="tel">
                <el-input v-model="options.tel" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="eml">
                <el-input v-model="options.eml" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="传真：" prop="chan">
                <el-input v-model="options.chan" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="地址：" prop="address">
                <el-input v-model="options.address" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="介绍：" prop="describe">
                <Tinymce
                    v-model="options.describe"
                    :height="400"
                />
            </el-form-item>
            <el-form-item label="企业照片：" prop="richText">
                <UploadImageList />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadImage from '@/components/UploadImage/index.vue'
import UploadImageList from '@/components/UploadImageList/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'

@Component({
    components: { UploadImage, UploadImageList, Tinymce }
})
export default class extends Vue {
    private rules = {}
    private options = {}
}
</script>

<style lang="scss" scoped>

</style>