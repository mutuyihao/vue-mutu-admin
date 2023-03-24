<template>
    <div>
        <img class="logo-side"  width="150" height="23.11" src="@/assets/img/logo.png" alt="logo">
        <!-- :value="'console'" :expanded-keys="openKey" -->

        <n-menu :indent="12" :accordion="false" :options="menuOptions"></n-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive, h, onMounted,getCurrentInstance } from 'vue'
import { dynamicRoutes, systemRoutes,specialRoutes } from '@/router'
import { type RouteRecordRaw, type RouteRecordName, RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
let openKey = ['dashboard', 'console']
let routes = dynamicRoutes.concat(specialRoutes)
// let routes = dynamicRoutes
let menuOptions = reactive([]) as MenuOption[]
function filterMenus(item: RouteRecordRaw, root?: RouteRecordRaw) {
    let parent = root
    let { ...tempItem } = { ...item }
    let tmpitem = {
        key: item.name as string,
        label: () => h(RouterLink, { to: { name: item.name, } }, { default: () => item.meta?.title }),
        icon: item.meta?.icon,
    }
    if (parent) {
        menuOptions.map((item1) => {
            if (item1.key == parent?.name) {
                item1.children?.push(tmpitem)
            }
        })
    } else {
        tmpitem.label = () => h("div", item.meta?.title),
            tmpitem.children = []
        menuOptions.push(tmpitem)
    }
    if (item.children && item.children!.length > 0) {

        item.children.map((child) => {
            filterMenus(child, item)
        })
    }
}
routes.map((item) => {
    filterMenus(item)
})
</script>

<style scoped>
.logo-side{
    width:150;
    height:23.11;
    margin-top:20px;
}
</style>