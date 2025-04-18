import instance from '@/utils/request'
import type { PaginationOffsetParams } from './index'
interface UserListParams extends PaginationOffsetParams { }

export async function getStaffList(params: UserListParams) {
    return instance.get('user', { "params": params })
}

export async function deleteStaff(staffId: number) {
    return instance.delete(`users/${staffId}`)
}

type CreateStaff = {
    name: string
    username: string
    password: string
    email: string
    roleId: number
}
export async function createStaff(data: CreateStaff) {
    return instance.post(`/user`, data)
}
type UpdateStaff = {
    name: string
    username: string
    password: string
    email: string
    roleId: number
}
export async function updateStaff(userId: number, data: UpdateStaff) {
    return instance.patch(`/user/${userId}`, data)
}