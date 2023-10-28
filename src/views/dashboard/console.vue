<template>
    <div class="flex-column" style="gap: 10px">
        <div class="flex-center data-card-main">
            <div class="data-card">
                <daySale></daySale>
            </div>
            <div class="data-card">
                <weekSale></weekSale>
            </div>
            <div class="data-card">
                <monthSale></monthSale>
            </div>
            <div class="data-card">
                <seasonSale></seasonSale>
            </div>
            <div class="data-card">
                <yearSale></yearSale>
            </div>
        </div>
        <div class="flex-center chart-card-main" style="height: 30vh">
            <chartSale class="chart-card-item"></chartSale>
            <chartSale class="chart-card-item"></chartSale>
        </div>
        <div>
            <div style="height: 44vh" class="flex-column-center chart-card-main chart-card-item">
                <div style="font-size:2rem;font-weight:400;border-bottom:1px solid #cccccc">日访问量</div>
                <chartViews></chartViews>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import daySale from './dataPanel/day-sale.vue'
import weekSale from './dataPanel/week-sale.vue'
import monthSale from './dataPanel/month-sale.vue'
import seasonSale from './dataPanel/season-sale.vue'
import yearSale from './dataPanel/year-sale.vue'
import chartSale from './chart/chart-sale.vue'
import chartViews from './chart/chart-views.vue'


</script>

<style scoped>
.data-card-main {
    gap: 10px;
}

.data-card {
    flex: 1;
}

.chart-card-main {
    gap: 10px;
}

.chart-card-item {
    background: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px #cccccc;
}

@media screen and (max-width: 800px) {
    .data-card-main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: normal;
    }

    .chart-card-main {
        flex: 1;
        flex-wrap: wrap;
        gap: 10px;
    }

    .chart-card-item {
        flex-direction: row;
    }
}
</style>
