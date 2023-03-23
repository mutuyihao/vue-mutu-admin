<template>
    <div>
        <n-menu :options="menuOptions"></n-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue'
import { dynamicRoutes, systemRoutes } from '@/router'
import { type RouteRecordRaw, type RouteRecordName, RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

// let routes = systemRoutes.concat(dynamicRoutes)
let routes = dynamicRoutes
let menuOptions = reactive([]) as MenuOption[]
function filterMenus(item: RouteRecordRaw, root?: RouteRecordRaw) {
    let parent = root
    let { ...tempItem } = { ...item }
    let tmpitem = {
        key: item.name as string,
        label: () => h(RouterLink, { to: { name: item.name, } }, { default: () => item.name }),
        icon: item.meta?.icon,
    }
    if (parent) {
        menuOptions.map((item1) => {
            if (item1.key == parent?.name) {
                item1.children?.push(tmpitem)
            }
        })
    } else {
        tmpitem.label=() => h("div",item.name),
        tmpitem.children = []
        menuOptions.push(tmpitem)
    }
    if (item.children && item.children!.length > 0) {
        console.log("111")

        item.children.map((child) => {
            filterMenus(child, item)
        })
    }
}
routes.map((item) => {
    filterMenus(item)
})
</script>

<style scoped></style>