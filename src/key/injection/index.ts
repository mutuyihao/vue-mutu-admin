import type { Ref, InjectionKey } from 'vue'

// role / role-create-edit
export const isShowRoleCreateEdit = Symbol() as InjectionKey<Ref<boolean>>

// staff / staff-create-view-edit
export const isShowStaffCreateViewEdit = Symbol() as InjectionKey<Ref<boolean>>

// edit menu permission
export const isShowEditMenuPermission = Symbol() as InjectionKey<Ref<boolean>>