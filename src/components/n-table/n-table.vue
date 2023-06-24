<template>
  <n-data-table
    :columns="props.columns"
    :data="props.data"
    flex-height
    remote
    ref="table"
    @on-update:page="setTableStyle"
    class="n-table"
    :pagination="paginationOption"
    v-bind="tableOption"
    width="100%"
    style="height: 100%"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type {
  DataTableColumn,
  DataTableColumns,
  PaginationProps
} from 'naive-ui'
import tableOption from './table-option'
const props = defineProps<{
  itemCount: number | undefined
  columns: any
  data: any
}>()
interface TableProps {
  column: DataTableColumns
  data: any[]
}
let paginationOption: PaginationProps = reactive({
  itemCount: props.itemCount ? props.itemCount : 10,
  pageSizes: [10],
  showSizePicker: true,
  pageCount: undefined
})
let table = ref()
let isNeedFlex = ref(false)
function setTableStyle(pageNum: number) {
  console.log(table, pageNum)
}
// defineProps
</script>

<style scoped></style>
