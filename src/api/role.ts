import instance from '@/utils/request'
import type { PaginationOffsetParams } from './index'

interface UserListParams extends PaginationOffsetParams {}

export async function getRoleList(params?: any) {
  return instance.get('/role', { params: params })
}

type Role = {
  name: string
  description?: string
  routes?: string[]
  permissions?: string[]
}
// 新建角色
export async function createRole(data: Role) {
  return instance.post('/role', data)
}
// 更新角色
export async function updateRoleById(
  roleId: number,
  data: Role
) {
  return instance.patch(`/role/${roleId}`, data)
}
// 删除角色
export async function deleteRoleById(roleId: number) {
  return instance.delete(`/role/${roleId}`)
}
