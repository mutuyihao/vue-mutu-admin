<template>
    <n-modal v-model:show="isShow" preset="dialog" positive-text="确认" negative-text="算了" title="编辑菜单权限"
        @positive-click="submitCallback" @negative-click="cancelCallback">
        <n-tree :default-checked-keys="checkedKeys" ref="treeRef" :expanded-keys="expandedKeys" :cascade="true" block-line
            :data="data" checkable expand-on-click selectable />
    </n-modal>
</template>

<script setup lang="ts">
import * as key from '@/key'
import { inject, ref, defineProps, computed } from 'vue'
import { dynamicRoutes, systemRoutes, specialRoutes } from '@/router'
import * as http from '@/api'
import type { Staff } from './type'
let props = defineProps<{ user: Staff }>()

let isShow = inject(key.isShowEditMenuPermission)
let allMenu = ref<any[]>([])
let routes = dynamicRoutes.concat(specialRoutes)
type Menu = {
    label: string
    key: string
    children?: Menu[]
}
let data = ref<Menu[]>([])
let expandedKeys = ref<string[]>([])
let checkedKeys = computed(() => {
    if (props.user.menu) {
        return Object.keys(props.user.menu)
    } else {
        return []
    }
})
routes.forEach((item) => {
    filterMenus(item)
})
function filterMenus(item: any, parent?: any) {
    let menuItem: Menu = {
        label: item.meta.title,
        key: item.meta.title,
        children: []
    }
    if (parent) {
        data.value.forEach((root) => {
            delete menuItem.children
            if (root.key == parent.meta.title) {
                root.children?.push(menuItem)
            }
        })
    } else {
        expandedKeys.value.push(menuItem.key)
        data.value.push(menuItem)
    }
    if (item.children && item.children.length > 0) {
        item.children.forEach((child: any) => {
            filterMenus(child, item)
        })
    }
}
let treeRef = ref()

function submitCallback() {
    let menu: any = {}
    treeRef.value.getCheckedData().keys.forEach((item: string) => {
        menu[item] = true
    })
    http.updateStaffMenu({ userId: props.user.id, menu: menu }).then((res) => {
        window.$message.success("已成功修改")
    })
}
function cancelCallback() { }
</script>

<style scoped></style>
