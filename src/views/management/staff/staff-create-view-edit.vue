<template>
  <n-modal v-model:show="isShow" preset="dialog" positive-text="确认" negative-text="算了" title="查看"
    @positive-click="submitCallback" @negative-click="cancelCallback">
    <template #header>
      <div v-show="props.action == 'view'">查看</div>
      <div v-show="props.action == 'edit'">编辑</div>
    </template>
    <n-space>
      <n-form ref="formRef" :model="staff" :rules="rules" :disabled="props.action == 'view'">
        <n-form-item path="name" label="姓名">
          <n-input v-model:value="staff.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="username" label="账号">
          <n-input v-model:value="staff.username" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="email" label="邮箱">
          <n-input v-model:value="staff.email" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="staff.password" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="role.id" label="角色">
          <n-radio-group v-model:value="staff.role.id">
            <n-radio v-for="item in roleList" :value="item.id">{{
              item.type
            }}</n-radio>
          </n-radio-group>
        </n-form-item>
      </n-form>
    </n-space>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import type { Action, Staff } from './type'
import type { FormInst } from 'naive-ui'
import * as http from '@/api'
import * as key from '@/key'
import { AtCircleOutline } from '@vicons/ionicons5'
import { Model, number } from 'echarts'
let isShow = inject(key.isShowStaffCreateViewEdit)

let props = defineProps<{
  action: Action
  data: Staff
  roleList: any[]
}>()
let staff = ref({
  name: '',
  username: '',
  password: '12345678',
  email: '',
  role: {
    id: 0
  }
})
let rules: any = {
  name: {
    required: true,
    message: '请输入员工姓名',
    trigger: 'blur'
  },
  username: {
    required: true,
    message: '请输入员工账号',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入员工密码',
    trigger: 'blur'
  },
  email: {
    required: true,
    message: '请输入员工邮箱',
    trigger: 'blur'
  },
  role: {
    id: {
      type: 'number',
      required: true,
      message: '请选择员工角色',
      trigger: 'change'
    }
  },
}

watch(
  () => isShow!.value,
  (newValue) => {
    if (!newValue) {
      staff.value = {
        name: '',
        username: '',
        password: '12345678',
        email: '',
        role: {
          id: 0
        }
      }
    } else {
      if (props.action == 'create') {
        return
      }
      Object.assign(staff.value, props.data)
    }
  }
)
let formRef = ref<FormInst>()
const emit = defineEmits(['submitCallback', 'cancelCallback'])
function cancelCallback() {
  emit('cancelCallback')
}
async function submitCallback() {
  await formRef.value?.validate(async (errors) => {
    if (!errors) {
      let data: any = staff.value
      data.role = staff.value.role.id
      switch (props.action) {
        case 'create':

          let createdUser = (await http.createStaff(staff.value)).data
          http
            .updateStaffRoleById({
              userId: createdUser.id,
              roleId: staff.value.role.id
            })
            .then((res) => {
              window.$message.success(`创建新员工:${staff.value.name}成功`)
            })
          break
        case 'edit':
          let updatedUser = (await http.updateStaff(props.data.id, data)).data
          window.$message.success(`修改员工成功`)
          break
      }
      emit('submitCallback')
    }
  })
}
</script>

<style scoped></style>
