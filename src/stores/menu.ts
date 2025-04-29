import { ref, computed, h } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import {
  dynamicRoutes,
  systemRoutes,
  specialRoutes,
  checkIfUserHasRoute
} from '@/router'
import type { MenuOption } from 'naive-ui'
import * as pinia from '@/stores'
export const useMenuStore = defineStore('menu', () => {
  const user = pinia.useAccountStore()
  const routes = [...dynamicRoutes.concat(specialRoutes)]
  function filterRoutes(
    routes: RouteRecordRaw[],
    type?: string
  ): any {
    return routes.map((item: any) => {
      const menuItem: MenuOption = {
        label: item.meta?.title,
        key: item.meta?.title,
        icon: item.meta?.icon,
        children: []
      }
      if (type == 'child') {
        if (
          !!item.meta?.requiresAuth &&
          checkIfUserHasRoute(item.name) === false
        ) {
          return { delete: true }
        }
        delete menuItem.children
        menuItem.label = () => {
          return h(
            RouterLink,
            { to: { name: item.name } },
            { default: () => item.meta?.title }
          )
        }
      }
      if (item.children && item.children.length > 0) {
        menuItem.children = filterRoutes(
          item.children,
          'child'
        )
      }
      return menuItem
    })
  }
  let menuOptions = filterRoutes(
    routes.filter((item) => item.children!.length > 0)
  )
  return { menuOptions }
})
