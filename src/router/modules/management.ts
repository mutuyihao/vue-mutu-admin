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
            icon: () => renderIcon(SettingOutlined)
        },
        children: [
            {
                name: 'role',
                path: '/management/role',
                component: () => import('@/views/management/role/role.vue'),
                meta: {
                    auth: true,
                    title: '角色管理'
                }
            },
            {
                name: 'staff',
                path: '/management/staff',
                component: () => import('@/views/management/staff/staff.vue'),
                meta: {
                    auth: true,
                    title: '员工管理'
                }
            },
            {
                name: 'menu',
                path: '/management/menu',
                component: () => import('@/views/management/menu/menu.vue'),
                meta: {
                    auth: true,
                    title: '菜单管理'
                }
            }
        ]
    }
]
export { routes }
