import instance from '@/utils/request'
import type { PaginationOffsetParams } from './index'

interface UserListParams extends PaginationOffsetParams { }


export async function getRoleList(params?: any) {
  return instance.get('/users-permissions/roles', { "params": params })
}

type Role = {
  "name": string,
  "description": string,
  "permissions"?: Object
}
// 新建角色
export async function createRole(data: Role) {
  return instance.post('/users-permissions/roles', data)
}
// 更新角色
export async function updateRoleById(roleId: number, data: Role) {
  return instance.put(`/users-permissions/roles/${roleId}`, data)
}
// 删除角色
export async function deleteRoleById(roleId: number) {
  return instance.delete(`/users-permissions/roles/${roleId}`)
}

