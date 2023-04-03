<template>
    <n-table class="show-table" :columns="column" :data="data" :item-count="data.length"></n-table>
</template>

<script setup lang="ts">
import nTable from '@/components/n-table/n-table.vue'

let column=[
      {
        title: 'No.',
        key: 'no'
      },
      {
        title: 'Title',
        key: 'title'
      },
      {
        title: 'Length',
        key: 'length'
      }
    ]
const data = [
  { no: 1, title: 'Hello', length: '3:21' },
  { no: 2, title: 'Roll with It', length: '3:59' },
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 5, title: 'Hey Now!', length: '5:41' },
  { no: 6, title: 'Untitled', length: '0:44' },
  { no: 7, title: 'Some Might Say', length: '5:29' },
  { no: 8, title: 'Cast No Shadow', length: '4:51' },
  { no: 9, title: "She's Electric", length: '3:40' },
  { no: 10, title: 'Monring Glory', length: '5:03' },
]
</script>

<style scoped>
</style>