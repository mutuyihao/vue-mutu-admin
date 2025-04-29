import { createRouter, createWebHistory } from 'vue-router'
import type {
  RouteRecordRaw,
  RouteRecordName
} from 'vue-router'

import { systemRoutes, specialRoutes } from './system'
import * as pinia from '@/stores'
import NProgress from 'nprogress'
import '@/assets/css/nprogress.css'
interface moduleType {
  routes: RouteRecordRaw[]
}
// 初始化系统固定路由
const routes: RouteRecordRaw[] = []
systemRoutes.map((item) => routes.push(item))

// 初始化动态路由
let dynamicRoutes: RouteRecordRaw[] = []
// 引入动态路由
function importModules() {
  const modules = import.meta.glob('./modules/*.ts', {
    eager: true
  })
  for (const path in modules) {
    const module = modules[path] as moduleType
    module.routes.map((item) => dynamicRoutes.push(item))
  }
}
importModules()
const router = createRouter({
  history: createWebHistory(),
  routes
})

function filterDynamicRoutes(
  item: RouteRecordRaw,
  root?: RouteRecordName
) {
  let { ...tempItem } = { ...item }
  if (root) {
    router.addRoute(root, item)
  } else {
    router.addRoute(tempItem)
  }
}

let isAddDynamicRoutes = false
// 设置路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置网页标题

  let defaultTitle = 'Mutu Admin'
  document.title =
    (to.meta.title ? to.meta.title + '—' : '') +
    defaultTitle
  if (
    (!localStorage.getItem('TOKEN') ||
      !localStorage.getItem('USER')) &&
    to.fullPath !== '/login'
  ) {
    NProgress.start()
    next('/login')
    return
  }
  if (
    localStorage.getItem('TOKEN') &&
    localStorage.getItem('USER') &&
    to.fullPath === '/login'
  ) {
    NProgress.start()
    router.go(-1)
    return
  }
  if (!isAddDynamicRoutes) {
    dynamicRoutes.forEach((item) => {
      filterDynamicRoutes(item)
    })
    specialRoutes.forEach((item) => {
      router.addRoute(item)
    })
    isAddDynamicRoutes = true
    if (to.matched.length == 0) {
      router.push(to.fullPath)
    }
    NProgress.start()
    next()
    return // return false
  }
  if (
    to.meta.requiresAuth &&
    checkIfUserHasRoute(to.meta.auth as string) === false
  ) {
    next('special/403')
    window.$dialog.error({
      title: '403',
      content: '无权访问'
    })
    return
  }
  NProgress.start()
  next()
  return
})
router.afterEach(() => {
  NProgress.done()
})
export { dynamicRoutes, systemRoutes, specialRoutes }
export default router

export function checkIfUserHasRoute(routeKey: string) {
  try {
    const user = pinia.useAccountStore().user
    if (user?.role.name === 'ADMIN') {
      return true
    }
    if (
      Array.isArray(user?.role.routes) &&
      user?.role.routes.find((item) => {
        return item.name === routeKey
      })
    ) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
