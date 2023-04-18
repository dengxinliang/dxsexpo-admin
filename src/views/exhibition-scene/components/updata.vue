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
        <el-form-item label="发布日期：" prop="times">
            <el-date-picker
                v-model="options.times"
                type="date"
                placeholder="选择日期"
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="描述：" prop="describe">
            <el-input 
                v-model="options.describe" 
                type="textarea"
                :rows="2" 
                placeholder="请输入" 
            />
        </el-form-item>
        <el-form-item label="现场照：" prop="richText">
            <UploadImageList />
        </el-form-item>
    </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import UploadImage from '@/components/UploadImage/index.vue'
import UploadImageList from '@/components/UploadImageList/index.vue'

@Component({
    components: { UploadImage, UploadImageList }
})
export default class extends Vue {
    @Prop({ default: () =>({}) }) private options!: object

    private rules = {}
    private typeRows = []
}
</script>

<style lang="scss" scoped>

</style>