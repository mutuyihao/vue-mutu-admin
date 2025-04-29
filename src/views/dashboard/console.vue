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
    <div
      class="h-[70vh] lg:h-[30vh] flex-center chart-card-main flex-1"
    >
      <chartSale
        class="chart-card-item h-[40vh] lg:h-[35vh]"
      ></chartSale>
      <chartSale
        class="chart-card-item h-[40vh] lg:h-[35vh]"
      ></chartSale>
    </div>
    <div class="flex chart-card-main" style="height: 40vh">
      <div
        class="flex-column chart-card-item"
        style="height: 44vh"
      >
        <div class="visit-header">
          <div class="visitChartTitle">日访问量</div>
        </div>
        <chartViews class="h-[40vh]"></chartViews>
      </div>
      <div
        class="flex-column chart-card-item"
        style="height: 44vh"
      >
        <div class="visit-header">
          <div class="visitChartTitle">月访问量</div>
        </div>
        <chartViewsMonth class="h-[40vh]"></chartViewsMonth>
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
import chartViewsMonth from './chart/chart-views-month.vue'
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
  width: 100%;
}

.visitChartTitle {
  align-self: center;
  font-size: 2rem;
  font-weight: 400;
}

.visit-header {
  padding: 0.6rem 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.5rem;
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
    flex-direction: column;
    width: 100vw;
  }

  .m-chart {
    width: 100vw;
  }

  .visitChartTitle {
    align-self: center;
    font-size: 1.2rem;
    font-weight: 400;
    border-bottom: 1px solid #cccccc;
  }
}
</style>

function ref(arg0: number) { throw new Error('Function not
implemented.') }
