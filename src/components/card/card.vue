<template>
    <div class="card">
        <div class="card-part card-head">
            <div>{{ title }}</div>
            <div
                :class="['period-box', { 'period-day': period == '日', 'period-week': period == '周', 'period-month': period == '月', 'period-season': period == '季', 'period-year': period == '年' }]">
                {{ period }}
            </div>
        </div>
        <div class="card-part card-content">
            <div>
                <n-statistic tabular-nums class="valueText">
                    <template #prefix>
                    </template>
                    <div>
                        ￥
                        <n-number-animation  show-separator ref="numberAnimationInstRef" :from="0" :to="value" />
                    </div>
                    <template #suffix>
                    </template>
                </n-statistic>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
        <div v-if="isNeedFooter"  class="card-part">
            <div>{{ footerText }}</div>
            <n-statistic tabular-nums>
                <template #prefix>
                </template>
                <div>
                    <n-number-animation style="font-size:5rem" show-separator ref="numberAnimationInstRef" :from="0" :to="footerValue" />
                </div>
                <template #suffix>
                    {{ footerSuffix }}
                </template>
            </n-statistic>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    title: string,
    period: "日" | "周" | "月" | "季" | "年",
    value: number,
    isNeedFooter?:boolean,
    footerText?:string,
    footerValue?:number,
    footerSuffix?:"%"|"$"|"￥"|"元",
}>()
</script>

<style scoped>
.card {
    background: white;
    border-radius: 0.3rem;
}

.card-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid rgba(119, 119, 119, 0.1)
}

.card-head {
    height: 2rem;
    font-size: 1.1rem;
}

/* .card-content {
    
} */

.period-box {
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    vertical-align: middle;
}

.period-day {
    color: var(--period-day);
    background-color: #18a0572e;
    border: 1px solid #18a05750;
}

.period-week {
    color: var(--period-week);
    background-color: #2080f02e;
    border: 1px solid #2080f050;
}

.period-month {
    color: var(--period-month);
    background-color: #f2a0202e;
    border: 1px solid #f2a02050;
}

.period-season {
    color: var(--period-season);
    background-color: #d030502e;
    border: 1px solid #d0305050;
}

.period-year {
    color: var(--period-year);
    background-color: #b37feb2e;
    border: 1px solid #b37feb50;
}

.valueText{
    font-size:5rem!important;
}
</style>