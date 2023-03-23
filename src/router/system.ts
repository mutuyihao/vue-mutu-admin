import layout from '@/layout/layout.vue'

import type { RouteRecordRaw } from 'vue-router'
const systemRoutes: RouteRecordRaw[] = [
    {
        name: '',
        path: '/',
        component: layout,
        redirect: '/dashboard',
        meta: {
            title: "主页"
        },
        children: []
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
const specialRoutes: RouteRecordRaw[] = [
    {
        name: '404',
        path: '/:catch(.*)',
        component: layout,
        redirect: '/404',
        meta: {
            title: "404"
        },
        children: [
            {
                name: '404',
                path: '/404',
                component: () => import('@/views/special/404.vue'),
                meta: {
                    title: "404"
                }
            },
        ]
    },
    
]
export { systemRoutes,specialRoutes }