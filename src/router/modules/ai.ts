import layout from '@/layout/layout.vue'
import { renderIcon } from '@/utils'
import { RobotOutlined } from '@vicons/antd'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    name: 'ai',
    path: '/ai',
    component: layout,
    redirect: '/ai/cs',
    meta: {
      title: 'AI',
      icon: () => renderIcon(RobotOutlined),
      requiresAuth: true,
      auth: 'ai'
    },
    children: [
      {
        name: 'cs',
        path: '/ai/cs',
        component: () => import('@/views/ai/cs/cs.vue'),
        meta: {
          title: 'AI客服',
          requiresAuth: true,
          auth: 'ai:cs'
        }
      }
    ]
  }
]
export { routes }
