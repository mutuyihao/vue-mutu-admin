import layout from '@/layout/layout.vue'
import console from '@/views/dashboard/console.vue'
import { renderIcon } from '@/utils'
import { DashboardOutlined } from '@vicons/antd'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [{
    name: "dashboard",
    path: "/dashboard",
    component: layout,
    redirect: "/dashboard/console",
    meta: {
        title: "Dashboard",
        icon: () => renderIcon(DashboardOutlined)
    },
    children: [{
        name: "console",
        path: "console",
        component: console,
        meta: {
            title: "主控台"
        },
    }, {
        name: "workstation",
        path: "/dashboard/workstation",
        component: () => import("@/views/dashboard/workstation/workstation.vue"),
        meta: {
            title: "工作台"
        },
    }]
}]
export { routes }