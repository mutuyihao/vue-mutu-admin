<template>
  <div style="float: right">
    <n-button
      type="info"
      @click="
        () => {
          isShowStaffCreateViewEdit = true
          action = 'create'
        }
      "
      >新建员工</n-button
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
  <staffCreateViewEdit
    @submitCallback="submitCallback"
    @cancelCallback="cancelCallback"
    :mask-closable="false"
    :action="action"
    :data="clickedRowInfo!"
    :role-list="roleList"
  >
  </staffCreateViewEdit>
</template>

<script setup lang="ts">
import staffActions from './staff-actions.vue'
import staffCreateViewEdit from './staff-create-view-edit.vue'
import * as http from '@/api'
import { onMounted, reactive, provide, h, ref } from 'vue'
import nTable from '@/components/n-table/n-table.vue'
import { NButton } from 'naive-ui'
import type { Staff } from './type'
import { formatterTime } from '@/utils'

import * as key from '@/key'
import type { Action } from './type'

let isShowStaffCreateViewEdit = ref(false)
provide(
  key.isShowStaffCreateViewEdit,
  isShowStaffCreateViewEdit
)
let columns = [
  {
    key: 'actions',
    title: '操作',
    render(row: any) {
      return h(
        staffActions,
        {
          rowId: row.id,
          onDropdownSelect: onDropdownSelect,
          disabled: row.role.name === 'ADMIN'
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
    title: '昵称'
  },
  {
    key: 'username',
    title: '账号'
  },
  {
    key: 'role.name',
    title: '角色'
  },
  {
    key: 'createdAt',
    title: '创建日期',
    render: (rowData: Staff) => {
      return formatterTime(rowData.createdAt)
    }
  },
  {
    key: 'updatedAt',
    title: '更新日期',
    render: (rowData: Staff) => {
      return formatterTime(rowData.createdAt)
    }
  }
]

const data: any = reactive({
  tableData: []
})
const page = ref(1)
const pageSize = ref(10)
const itemCount = ref(0)
function getStaffListData(currentStart?: number) {
  http
    .getStaffList({
      skip: currentStart ? currentStart : 0,
      take: pageSize.value
    })
    .then((res) => {
      data.tableData = res.data.data
      itemCount.value = res.data.total
    })
}
function onPageChange(currentPage: number) {
  page.value = currentPage
  getStaffListData((currentPage - 1) * pageSize.value)
}
onMounted(() => {
  getStaffListData()
})

let action = ref<Action>()
let clickedRowInfo = ref<Staff>()
function onDropdownSelect(key: Action, rowId: number) {
  action.value = key
  clickedRowInfo.value = data.tableData.find(
    (e: Staff) => e.id == rowId
  )
  switch (key) {
    case 'view':
      isShowStaffCreateViewEdit.value = true
      break
    case 'edit':
      isShowStaffCreateViewEdit.value = true
      break
    case 'delete':
      window.$dialog.info({
        title: '确认删除',
        content: `你确定删除员工"${
          clickedRowInfo.value!.name
        }"吗?`,
        positiveText: '确定',
        onPositiveClick: () => {
          http
            .deleteStaff(clickedRowInfo.value!.id)
            .then((res) => {
              if (res)
                window.$message.success('删除测试成功')
              onPageChange(page.value)
            })
        },
        negativeText: '取消',
        onNegativeClick: () => {},
        negativeButtonProps: { type: 'info' }
      })
      break
  }
}
function cancelCallback() {}
function submitCallback() {
  onPageChange(page.value)
}

const roleList = ref([])
function getRoleListData() {
  http.getRoleList().then((res) => {
    roleList.value = res.data.data
  })
}
onMounted(() => {
  getRoleListData()
})
</script>

<style scoped>
:deep(.n-data-table-th) {
  text-align: center;
}

:deep(.n-data-table-td) {
  text-align: center;
}
</style>
