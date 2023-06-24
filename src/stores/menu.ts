import { ref, computed, h } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { dynamicRoutes, systemRoutes, specialRoutes } from '@/router'
import type { MenuOption } from 'naive-ui'
export const useMenuStore = defineStore('menu', () => {

    let user = JSON.parse(localStorage.getItem('USER')!)
    let { menu } = user
    let routes = dynamicRoutes.concat(specialRoutes)
    function isRouteAuth(route: any) {
        try {
            return menu![route.meta.title]
        } catch (error) {
            return false
        }

    }
    function newFilter(routes: RouteRecordRaw[], type?: string): any {
        return routes.map((item: any) => {
            const menuItem: MenuOption = {
                label: item.meta?.title,
                key: item.meta?.title,
                icon: item.meta?.icon,
                children: []
            }
            if (type == "child") {
                console.log(!!item.meta?.auth)
                if (!!item.meta?.auth && !isRouteAuth(item)) {
                    return { delete: true }
                }
                // console.log(!isRouteAuth(item), item.meta?.title)
                delete menuItem.children
                menuItem.label = () => {
                    return h(RouterLink, { to: { name: item.name } }, { default: () => item.meta?.title })
                }
            }
            if (item.children && item.children.length > 0) {
                menuItem.children = newFilter(item.children, "child")
            }
            return menuItem
        })
    }
    let menuOptions = newFilter(routes)
    return { menuOptions }
})
