import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: any[] = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta:{
            title:"登录"
        }
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes,
})
export default router

