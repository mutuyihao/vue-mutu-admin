<template>
  <chart :chart-type="'line'" :chart-option="option"></chart>
</template>

<script setup lang="ts">
import chart from '@/components/chart/chart.vue'
import { getMonthViews } from '@/api'
import { ref } from 'vue'
let xData = ref<string[]>([])
let yData = ref<number[]>([])


getMonthViews(6).then(res1 => {
  res1.data.forEach((element: any) => {
    xData.value.push(element.date)
    yData.value.push(element.views)
  });
})

let option = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: xData,
    name: "时间"
  },
  yAxis: {
    type: 'value',
    name: "月访问量",
    minInterval: 1
  },
  series: [
    {
      data: yData,
      type: 'line',
      smooth: true,
      areaStyle: {}
    }
  ]
})
</script>

<style scoped></style>