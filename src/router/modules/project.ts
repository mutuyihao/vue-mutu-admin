import layout from '@/layout/layout.vue'
import { renderIcon } from '@/utils'
import { BrushOutline } from '@vicons/ionicons5'
import { ProjectOutlined } from '@vicons/antd'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [{
    name: "project",
    path: "/project",
    component: layout,
    redirect: "/project/doc",
    meta: {
        title: "项目相关",
        icon: () => renderIcon(ProjectOutlined)
    },
    children: [{
        name: "doc",
        path: "/project/doc",
        component: () => import("@/views/project/doc.vue"),
        meta: {
            title: "项目文档",

        },
    }]
}]
export { routes }