<template>
  <n-dropdown trigger="hover" :options="options" @select="handleSelect">
    <n-button>操作</n-button>
  </n-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { Action } from './type'
const props = defineProps<{ rowId: any }>()
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
    label: '菜单权限',
    key: 'editMenuPermission'
  },
  {
    label: '删除',
    key: "delete"
  }
]
function handleSelect(key: Action) {
  emit('dropdownSelect', key, props.rowId)
}
</script>

<style scoped></style>
