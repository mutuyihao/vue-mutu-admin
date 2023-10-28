<template>
  <chart :chart-type="'line'" :chart-option="option"></chart>
</template>

<script setup lang="ts">
import chart from '@/components/chart/chart.vue'
import { getViews } from '@/api'
import { ref } from 'vue'
let xData = ref<string[]>([])
let yData = ref<number[]>([])


getViews(7).then(res1 => {
  res1.data.forEach((element: any) => {
    xData.value.push(element.date)
    yData.value.push(element.views)
  });
})

let option = ref({
  xAxis: {
    type: 'category',
    data: xData,
    name: "时间"
  },
  yAxis: {
    type: 'value',
    name: "日访问量",
    minInterval: 1
  },
  series: [
    {
      data: yData,
      type: 'line',
      smooth: true
    }
  ]
})
</script>

<style scoped></style>