import layout from '@/layout/layout.vue'

import type {RouteRecordRaw} from 'vue-router'
const systemRoutes:RouteRecordRaw[] = [
    {
        name: '',
        path: '/',
        component: layout,
        redirect: '/dashboard',
        meta: {
            title: "主页"
        },
        children:[]
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: "登录"
        }
    },
]
export { systemRoutes }