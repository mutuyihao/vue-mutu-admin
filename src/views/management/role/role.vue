<template>
  <div style="float: right">
    <n-button
      type="info"
      @click="
        () => {
          isShowRoleCreateEdit = true
          action = 'createRole'
        }
      "
      >新建角色</n-button
    >
  </div>
  <div style="height: 500px; margin-top: 40px">
    <nTable
      :align="'center'"
      :columns="columns"
      :data="data.tableData"
      :item-count="itemCount"
      :pageSize="pageSize"
      @update:page="onPageChange"
    >
    </nTable>
  </div>
  <roleCreateEdit
    @submitCallback="submitCallback"
    @cancelCallback="cancelCallback"
    :mask-closable="false"
    :action="action"
    :data="clickedRowInfo"
  >
  </roleCreateEdit>
</template>

<script setup lang="ts">
import roleCreateEdit from './role-create-edit.vue'
import roleActions from './role-actions.vue'
import * as http from '@/api'
import { onMounted, reactive, provide, h, ref } from 'vue'
import nTable from '@/components/n-table/n-table.vue'
import { NButton, NDropdown } from 'naive-ui'
import type { Role, Action } from './type'
import { formatterTime } from '@/utils'

import * as key from '@/key'
// 向子组件——新建-编辑角色 role-create-edit 展示与关闭提供控制值
let isShowRoleCreateEdit = ref(false)
provide(key.isShowRoleCreateEdit, isShowRoleCreateEdit)

const columns = [
  {
    key: 'actions',
    title: '操作',
    render(row: any) {
      return h(
        roleActions,
        {
          rowId: row.id,
          onDropdownSelect: onDropdownSelect,
          disabled: row.name === 'ADMIN'
        },
        () => '编辑'
      )
    }
  },
  {
    key: 'id',
    title: 'ID'
  },
  {
    key: 'name',
    title: '角色名称'
  },
  {
    key: 'description',
    title: '角色描述'
  },
  {
    key: 'createdAt',
    title: '创建日期',
    render: (rowData: Role) => {
      return formatterTime(rowData.createdAt)
    }
  },
  {
    key: 'updatedAt',
    title: '更新日期',
    render: (rowData: Role) => {
      return formatterTime(rowData.createdAt)
    }
  }
]

const data: any = reactive<{ tableData: Role[] }>({
  tableData: []
})
const page = ref(1)
const pageSize = ref(10)
const itemCount = ref(0)

const roleList = ref([])
function getRoleListData(currentStart?: number) {
  let params = {
    skip: currentStart ? currentStart : 0,
    take: pageSize.value
  }
  http.getRoleList(params).then((res) => {
    data.tableData = res.data.data
    itemCount.value = res.data.total
  })
}
onMounted(() => {
  getRoleListData()
})
function onPageChange(currentPage: number) {
  page.value = currentPage
  getRoleListData((currentPage - 1) * pageSize.value)
}
let action = ref()
let clickedRowInfo = ref()
let isShowRoleDelete = ref(false)
function onDropdownSelect(key: Action, rowId: any) {
  action.value = key
  clickedRowInfo.value = data.tableData.find(
    (e: Role) => e.id == rowId
  )
  if (key == 'editRole') {
    isShowRoleCreateEdit.value = true
  }
  if (key == 'deleteRole') {
    isShowRoleDelete.value = true
    window.$dialog.info({
      title: '确认删除',
      content: `你确定删除角色"${clickedRowInfo.value.name}"吗?`,
      positiveText: '确定',
      onPositiveClick: () => {
        http
          .deleteRoleById(clickedRowInfo.value.id)
          .then((res) => {
            if (res) {
              window.$message.success(
                `测试删除角色"${clickedRowInfo.value.name}"成功`
              )
            }
            onPageChange(page.value)
          })
      },
      negativeText: '取消',
      onNegativeClick: () => {},
      negativeButtonProps: { type: 'info' }
    })
  }
}
function cancelCallback() {}
function submitCallback() {
  onPageChange(page.value)
}
</script>

<style scoped>
:deep(.n-data-table-th) {
  text-align: center;
}

:deep(.n-data-table-td) {
  text-align: center;
}
</style>
