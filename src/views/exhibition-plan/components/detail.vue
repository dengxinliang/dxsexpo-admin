<template>
    <div class="plan-detail">
        <dl>
            <dt>
                <img :src="options.logo" alt="">
            </dt>
            <dd>
                <div class="title">{{ options.name }}</div>
                <!-- <p>展会时间：{{ parseTime(new Date(options.exhibition_date), '{y}-{m}-{d}') }}</p> -->
                <p>展会时间：{{ options.exhibition_date }}</p>
                <p>展会地点：{{ options.address }}</p>
                <p>展会周期：{{ options.exhibition_cycle }}</p>
                <p>主办方：{{ options.organizer }}</p>
            </dd>
        </dl>
        <div class="rich-text">
            <div class="title">展会介绍</div>
            <div v-html="options.des"></div>
        </div>
        <div class="rich-text">
            <div class="title">展品范围</div>
            <div v-html="options.exhibition_scope"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { parseTime } from '@/utils/index'

@Component({
})
export default class extends Vue {
    @Prop({ default: {} }) private options?: Object

    private parseTime = parseTime
}
</script>

<style lang="scss" scoped>
.plan-detail{
    dl{
        display: flex;
        dt{
            width: 240px;
            margin-right: 20px;
            img{
                width: 100%;
                display: block;
            }
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
