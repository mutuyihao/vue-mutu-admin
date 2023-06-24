import instance from '@/utils/request'
import type { PaginationOffsetParams } from './index'
interface UserListParams extends PaginationOffsetParams { }

export async function getStaffList(params: UserListParams) {
    return instance.get('users', { params: params })
}

export async function deleteStaff(staffId: number) {
    return instance.delete(`users/${staffId}`)
}


type CreateStaff = {
    name: string
    username: string
    password: string
    email: string
}
export async function createStaff(data: CreateStaff) {
    return instance.post(`/users`, data)
}
type UpdateStaff = {
    name: string
    username: string
    password: string
    email: string
}
export async function updateStaff(userId: number, data: UpdateStaff) {
    return instance.put(`/users/${userId}`, data)
}
type UpdateStaffMenu = {
    userId: number
    menu: {}
}
export async function updateStaffMenu(data: UpdateStaffMenu) {
    return instance.put('/enduser/menu', data)
}

type UpdateRoleBody = {
    userId: number
    roleId: number
}
export async function updateStaffRoleById(data: UpdateRoleBody) {
    return instance.put('/enduser/role', data)
}
