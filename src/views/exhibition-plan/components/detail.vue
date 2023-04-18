<template>
    <div class="plan-detail">
        <dl>
            <dt>
                <img :src="options.img" alt="">
            </dt>
            <dd>
                <div class="title">{{ options.title }}</div>
                <p>展会时间：{{ options.times }}</p>
                <p>展会地点：{{ options.address }}</p>
                <p>展会周期：{{ options.period }}</p>
                <p>承办方：{{ options.organizer }}</p>
            </dd>
        </dl>
        <div class="rich-text">
            <div class="title">展会介绍</div>
            <div v-html="text"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
})
export default class extends Vue {
    private options = {
        img: require('@/assets/401-images/401.gif'),
        title: '2023年日本东京国际化妆品技术展',
        times: '2023年1月11日[星期三]-13日[星期五]',
        address: '日本东京有明国际展览中心',
        period: '一年一届',
        organizer: '中国'
    }
    private text = '<p>1234</p><p>23455</p>'
}
</script>

<style lang="scss" scoped>
.plan-detail{
    dl{
        display: flex;
        dt{
            width: 480px;
            margin-right: 20px;
        }
        dd{
            .title{
                font-size: 24px;
                font-weight: bold;
                margin-top: 10px;
            }
            p{
                font-size: 18px;
                margin-top: 10px;
            }
        }
    }
    .rich-text{
        .title{
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid;
            margin: 10px 0;
            padding-bottom: 10px;
        }
    }
}
</style>