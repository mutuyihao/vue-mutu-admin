<template>
    <div>
        <img @click="$router.push('/dashboard')" class="logo-side pretendBtn" width="150" height="23.11" src="@/assets/img/logo-side.png" alt="logo">
        <!-- :value="'console'" :expanded-keys="openKey" -->

        <n-menu :indent="12" :accordion="false" :options="menuOptions"></n-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive, h, onMounted } from 'vue'
import { dynamicRoutes, systemRoutes, specialRoutes } from '@/router'
import { type RouteRecordRaw, type RouteRecordName, RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'

let openKey = ['dashboard', 'console']
// let routes = dynamicRoutes
let menuOptions = reactive([]) as MenuOption[]

let routes = dynamicRoutes.concat(specialRoutes)
routes.map((item) => {
    filterMenus(item)
})

function filterMenus(item: any, parent?: any) {
    let menuItem: MenuOption = {
        label: () => h(RouterLink, { to: { name: item.name } }, { default: () => item.meta?.title }),
        key: item.name,
        icon: item.meta?.icon,
        children: [],
    }
    if (parent) {
        menuOptions.map((root) => {
            delete menuItem.children
            if (root.key == parent.name) {

                root.children?.push(menuItem)
            }
        })
    } else {
        menuItem.label = () =>  h('div',null, item.meta?.title)
        menuOptions.push(menuItem)
    }
    if (item.children && item.children.length > 0) {
        item.children.map((child: any) => {
            filterMenus(child, item)
        })
    }
}
</script>

<style scoped>
.logo-side {
    width: 150;
    height: 23.11;
    margin-top:17px;
}
</style>