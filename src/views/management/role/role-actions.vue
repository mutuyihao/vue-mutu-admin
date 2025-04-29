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
import { ref } from 'vue'

const props = defineProps<{
  rowId: any
  disabled: boolean
}>()
const emit = defineEmits(['dropdownSelect'])
const options = [
  {
    label: '编辑',
    key: 'editRole'
  },
  {
    label: '删除',
    key: 'deleteRole'
  }
]
let actionKey = ref<string | number>()
function handleSelect(key: string | number) {
  actionKey.value = key
  emit('dropdownSelect', key, props.rowId)
}
</script>

<style scoped></style>
