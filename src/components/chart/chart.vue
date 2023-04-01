<template>
  <div ref="chartRef" style="width:100%;height:100%"></div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, onMounted, reactive, onBeforeUnmount} from 'vue'
import * as echarts from 'echarts'
import {option,chartTypeList} from './index'

type ChartType = (typeof chartTypeList)[number]
const props = defineProps<{ chartOption: any, chartType:ChartType }>()
const chartRef = ref()
let myChart: echarts.ECharts | null = null

onMounted(() => {
  myChart = echarts.init(chartRef.value)
  myChart.showLoading()
  myChart.setOption(option[props.chartType])
  watch(() => props.chartOption, (newVal) => {
    if (newVal === undefined && JSON.stringify(newVal) === "{}") {
      return false
    } else {
      myChart!.showLoading()
      myChart!.setOption(newVal)
      myChart!.hideLoading()
    }
  }, { deep: true, immediate: true })
  myChart.hideLoading()
  window.addEventListener('resize', function () {
    myChart!.resize();
  });
})
onUnmounted(() => {
  myChart?.dispose()
  window.removeEventListener('resize', function () {
    myChart!.resize();
  })
})
</script>

<style scoped></style>