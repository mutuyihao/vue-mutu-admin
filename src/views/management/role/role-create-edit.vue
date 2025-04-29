<template>
  <n-modal
    v-model:show="isShow"
    preset="dialog"
    positive-text="确认"
    negative-text="算了"
    title="Dialog"
    @positive-click="submit"
    @negative-click="cancel"
  >
    <template #header>
      <div v-show="props.action === 'createRole'">新建</div>
      <div v-show="props.action === 'editRole'">编辑</div>
    </template>

    <n-form
      ref="formRef"
      :model="model"
      :rules="rules"
      style="width: 100%"
    >
      <n-form-item path="name" label="角色名称">
        <n-input
          v-model:value="model.name"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="description" label="角色描述">
        <n-input
          type="textarea"
          v-model:value="model.description"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="permissions" label="角色权限">
        <n-tree
          block-line
          :data="defaultRoutes"
          :default-expanded-keys="defaultExpandKeys"
          :default-checked-keys="defaultCheckedKeys"
          expand-on-click
          checkable
          cascade
          @update:checked-keys="handleCheck"
        />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { watch, ref, inject, reactive } from 'vue'
import type { Role, Action } from './type'
import * as http from '@/api'
import * as key from '@/key'
import type { FormInst, TreeOption } from 'naive-ui'
import { dynamicRoutes } from '@/router'
import * as pinia from '@/stores'
import { storeToRefs } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
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
let model = reactive({
  name: '',
  description: ''
})

watch(
  () => props.data,
  (newValue) => {
    // console.log(newValue)
    if (props.data && props.action == 'editRole') {
      Object.assign(model, newValue)
      defaultCheckedKeys.value = processDefaultRoutes(
        props.data.routes
      )
      checkedRoutes.value = defaultCheckedKeys.value
      defaultExpandKeys.value =
        defaultCheckedKeys.value.filter((item) => {
          return item.indexOf(':') < 0
        })
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
        description: ''
      })
      defaultExpandKeys.value = defaultRoutes.map(
        (item: TreeOption) => {
          return item.key as string
        }
      )
    }
  },
  { deep: true, immediate: true }
)

const formRef = ref<FormInst | null>()
const emit = defineEmits([
  'submitCallback',
  'cancelCallback'
])
function cancel() {
  // showModal.value = false
  emit('cancelCallback')
}
async function submit() {
  // showModal.value = false
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (props.action == 'createRole') {
        http
          .createRole({
            ...model,
            routes: checkedRoutes.value
          })
          .then((res) => {
            if (res) {
              window.$message.success('创建成功')
            }
          })
          .finally(() => {
            emit('submitCallback')
          })
      }
      if (props.action == 'editRole') {
        http
          .updateRoleById(props.data.id, { ...model })
          .then((res) => {
            if (res) {
              window.$message.success('修改成功')
            }
          })
          .finally(() => {
            emit('submitCallback')
          })
      }
    }
  })
}
const userStore = pinia.useAccountStore()
const { user } = storeToRefs(userStore)
const defaultCheckedKeys = ref<string[]>([])
function processDefaultRoutes(routes: Role['routes']) {
  return routes!.map((item) => {
    return item.name
  })
}
const checkedRoutes = ref<string[]>([])
function handleCheck(keys: string[]) {
  checkedRoutes.value = keys
}
const defaultExpandKeys = ref<string[]>([])
// 动态路由转树形结构
const defaultRoutes = generateRoutesTree(dynamicRoutes)
function generateRoutesTree(
  routes: RouteRecordRaw[]
): Array<TreeOption> {
  return routes.map((item) => {
    const hasChildren =
      Array.isArray(item.children) &&
      item.children.length > 0
    if (hasChildren) {
      return {
        label: item.meta?.title as string,
        key: item.meta?.auth as string,
        children: generateRoutesTree(item.children!),
        leaf: false
      }
    }
    return {
      label: item.meta?.title as string,
      key: item.meta?.auth as string,
      leaf: true
    }
  })
}
</script>

<style scoped></style>
