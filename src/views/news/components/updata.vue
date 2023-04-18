<template>
    <el-form
        ref="newsForm"
        :rules="rules"
        :model="options"
        label-position="right"
        label-width="120px"
    >
        <el-form-item label="图片：" prop="imgUrl">
            <UploadImage />
        </el-form-item>
        <el-form-item label="标题：" prop="title">
            <el-input v-model="options.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="发布日期：" prop="times">
            <el-date-picker
                v-model="options.times"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="来源：" prop="address">
            <el-input v-model="options.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="观看数：" prop="period">
            <el-input v-model="options.period" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述：" prop="richText">
            <Tinymce
                v-model="options.richText"
                :height="400"
            />
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UploadImage from '@/components/UploadImage/index.vue'
import Tinymce from '@/components/Tinymce/index.vue'

@Component({
    components: { UploadImage, Tinymce }
})
export default class extends Vue {
    @Prop({ default: () =>({}) }) private options!: object

    private rules = {}
    private typeRows = []
}
</script>

<style lang="scss" scoped>

</style>