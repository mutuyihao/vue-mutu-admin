<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    @select="handleSelect"
    :disabled="props.disabled"
  >
    <n-button :disabled="props.disabled">操作</n-button>
  </n-dropdown>
</template>
<script setup lang="ts">
import type { Action } from './type'
const props = defineProps<{
  rowId: any
  disabled: boolean
}>()
const emit = defineEmits(['dropdownSelect'])
const options = [
  {
    label: '查看',
    key: 'view'
  },
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
]
function handleSelect(key: Action) {
  emit('dropdownSelect', key, props.rowId)
}
</script>

<style scoped></style>
