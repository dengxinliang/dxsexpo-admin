<template>
    <el-form
        ref="dataForm"
        :rules="rules"
        :model="options"
        label-position="right"
        label-width="120px"
    >
        <el-form-item label="展会logo：" prop="imgUrl">
            <UploadImage />
        </el-form-item>
        <el-form-item label="展会名称：" prop="title">
            <el-input v-model="options.title" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展会日期：" prop="times">
            <el-date-picker
                v-model="options.times"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="展会地址：" prop="address">
            <el-input v-model="options.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="展会周期：" prop="period">
            <el-input v-model="options.period" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="承办方：" prop="organizer">
            <el-input v-model="options.organizer" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="行业类型：" prop="type">
            <el-select v-model="options.type" placeholder="请选择" style="width: 100%;">
                <el-option
                    v-for="item in typeRows"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="展会介绍：" prop="richText">
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