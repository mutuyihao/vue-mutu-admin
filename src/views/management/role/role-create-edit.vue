<template>
  <n-modal v-model:show="isShow" preset="dialog" positive-text="确认" negative-text="算了" title="Dialog"
    @positive-click="submit" @negative-click="cancel">
    <template #header>
      <div v-show="props.action === 'createRole'">新建</div>
      <div v-show="props.action === 'editRole'">编辑</div>
    </template>

    <n-form ref="formRef" :model="model" :rules="rules" style="width: 100%">
      <n-form-item path="name" label="角色名称">
        <n-input v-model:value="model.name" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="description" label="角色描述">
        <n-input type="textarea" v-model:value="model.description" @keydown.enter.prevent />
      </n-form-item>
      <!-- <n-form-item path="permissions" label="角色权限">
        <n-input v-model:value="model.permissions" @keydown.enter.prevent />
      </n-form-item> -->
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { watch, ref, toRef, inject, reactive } from 'vue'
import type { Role, Action } from './type'
import * as http from '@/api'
import * as key from '@/key'
import type { FormInst } from 'naive-ui'
import { WindowsFilled } from '@vicons/antd'

let isShow = inject(key.isShowRoleCreateEdit)

let props = withDefaults(
  defineProps<{
    action: Action
    data: Role
  }>(),
  {
    action: 'editRole'
  }
)
let rules = {
  name: {
    required: true,
    message: '请输入角色名字',
    trigger: 'blur'
  }
}
let checkedRole = ref()
let model = reactive({
  name: '',
  description: '',
  // permissions: {}
})
watch(
  () => props.data,
  (newValue) => {
    // console.log(newValue)
    if (props.data && props.action == 'editRole') {
      Object.assign(model, newValue)
    }
  },
  { deep: true, immediate: true }
)
watch(
  () => props.action,
  (newValue) => {
    if (newValue == 'createRole') {
      model = reactive({
        name: '',
        description: '',
        // permissions: {}
      })
    }
  },
  { deep: true, immediate: true }
)

const formRef = ref<FormInst | null>()
const emit = defineEmits(['submitCallback', 'cancelCallback'])
function cancel() {
  // showModal.value = false
  emit('cancelCallback')
}
async function submit() {
  // showModal.value = false
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.action == 'createRole') {
        http.createRole(model).then((res) => {
          if (res.data.ok) {
            window.$message.success('创建成功')
          }
        })
      }
      if (props.action == 'editRole') {
        http.updateRoleById(props.data.id, model).then((res) => {
          if (res.data.ok) {
            window.$message.success('修改成功')
          }
        })
      }
      // http.updateRoleById()
      emit('submitCallback')
    }
  })
}
</script>

<style scoped></style>
