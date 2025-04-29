<template>
  <chart
    :chart-type="'line'"
    :chart-option="option"
  ></chart>
</template>

<script setup lang="ts">
import chart from '@/components/chart/chart.vue'

let option = {
  title: {
    text: '展示固定数据图表',
    left: '1%',
    top: '3%'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [1820, 1932, 1901, 1934, 21290, 21330, 21320],
      type: 'line',
      smooth: true
    }
  ]
}
</script>

<style scoped></style>
