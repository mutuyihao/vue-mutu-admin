<template>
    <div>
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
    </div>
</template>

<script setup lang="ts">
import { getData } from '@/api'
import daySale from './dataPanel/day-sale.vue'
import weekSale from './dataPanel/week-sale.vue'
import monthSale from './dataPanel/month-sale.vue'
import seasonSale from './dataPanel/season-sale.vue'
import yearSale from './dataPanel/year-sale.vue'



</script>

<style scoped>
.data-card-main {
    gap: 10px;
}

.data-card {
    flex: 1;
}</style>