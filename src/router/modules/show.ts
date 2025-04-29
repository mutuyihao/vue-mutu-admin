import layout from '@/layout/layout.vue'
import { renderIcon } from '@/utils'
import { BrushOutline } from '@vicons/ionicons5'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [{
    name: "show",
    path: "/show",
    component: layout,
    redirect: "/show/table",
    meta: {
        title: "展示页",
        icon: () => renderIcon(BrushOutline),
        requiresAuth: true,
        auth: "show"
    },
    children: [{
        name: "table",
        path: "/show/table",
        component: () => import("@/views/show/table.vue"),
        meta: {
            title: "展示表格",
            requiresAuth: true,
            auth: "show:table"
        },
    }]
}]
export { routes }