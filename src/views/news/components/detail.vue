<template>
    <div class="news-detail">
        <div class="title">香港亚洲博览馆喜迎国际会展业务强劲反弹</div>
        <div class="tips">
            <span><i class="el-icon-view"></i>698</span>
            <span>来源：去展网</span>
            <span>2023-04-13</span>
        </div>
        <el-divider></el-divider>
        <div v-html="content"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class extends Vue {
    private content = '<p>1234567</p>'
}
</script>

<style lang="scss" scoped>
.news-detail{
    .title{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    .tips{
        text-align: center;
        font-size: 14px;
        color: rgba(43, 43, 43, .6);
        margin: 16px 0;
        span{
            margin: 0 16px;
            i{
                margin-right: 8px;
            }
        }
    }
}
</style>