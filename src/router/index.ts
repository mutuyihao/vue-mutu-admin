import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import { systemRoutes,specialRoutes } from './system'
import layout from '@/layout/layout.vue'

import  NProgress  from 'nprogress'
import '@/assets/css/nprogress.css'
interface moduleType {
    routes: RouteRecordRaw[]
}
// 初始化系统固定路由
const routes: RouteRecordRaw[] = [
]
systemRoutes.map((item) => routes.push(item))

// 初始化动态路由
let dynamicRoutes: RouteRecordRaw[] = []
// 引入动态路由
function importModules() {
    const modules = import.meta.glob("./modules/*.ts", { eager: true })
    for (const path in modules) {
        const module = modules[path] as moduleType
        module.routes.map((item) => dynamicRoutes.push(item))
    }
}
importModules()
const router = createRouter({
    history: createWebHistory(),
    routes,
})

function filterDynamicRoutes(item: RouteRecordRaw, root?: RouteRecordName) {
    let {...tempItem} = {...item}
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

    let defaultTitle = "Mutu Admin"
    document.title = (to.meta.title ? to.meta.title + "—" : "") + defaultTitle

    if (!isAddDynamicRoutes) {
        dynamicRoutes.map((item) => {
            filterDynamicRoutes(item)
        })
        specialRoutes.map((item)=>{
            router.addRoute(item)
        })
        isAddDynamicRoutes = true
        if (to.matched.length == 0) {
            router.push(to.fullPath);
        }
        NProgress.start()
        next()
        return false
    }
    NProgress.start()
    next()
})
router.afterEach(()=>{
    NProgress.done()
    
})
export {dynamicRoutes,systemRoutes,specialRoutes}
export default router

