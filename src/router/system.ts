import layout from '@/layout/layout.vue'
import { AlertCircleOutline } from '@vicons/ionicons5'
import { renderIcon } from '@/utils'
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
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: "登录"
        }
    },
]
const specialRoutes: RouteRecordRaw[] = [
    {
        name: '异常页面',
        path: '/:catch(.*)*',
        component: layout,
        redirect: '/404',
        meta: {
            title: "异常页面",
            icon: () => renderIcon(AlertCircleOutline)
        },
        children: [
            {
                name: '四零四',
                path: '/:catch(.*)*/404',
                component: () => import('@/views/special/404.vue'),
                meta: {
                    title: "404"
                }
            },
            {
                name: '四零三',
                path: '/:catch(.*)*/403',
                component: () => import('@/views/special/403.vue'),
                meta: {
                    title: "403"
                }
            },
        ]
    },
]
export { systemRoutes, specialRoutes }