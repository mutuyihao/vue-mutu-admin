import layout from '@/layout/layout.vue'
import console from '@/views/dashboard/console.vue'
import { renderIcon } from '@/utils'
import { SettingOutlined } from '@vicons/antd'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        name: 'management',
        path: '/management',
        component: layout,
        redirect: '/management/role',
        meta: {
            title: '管理中心',
            icon: () => renderIcon(SettingOutlined),
            requiresAuth: true,
            auth: "management"
        },
        children: [
            {
                name: 'role',
                path: '/management/role',
                component: () => import('@/views/management/role/role.vue'),
                meta: {
                    title: '角色管理',
                    requiresAuth: true,
                    auth: "management:role"
                }
            },
            {
                name: 'staff',
                path: '/management/staff',
                component: () => import('@/views/management/staff/staff.vue'),
                meta: {
                    title: '员工管理',
                    requiresAuth: true,
                    auth: "management:staff"
                }
            },
        ]
    }
]
export { routes }
