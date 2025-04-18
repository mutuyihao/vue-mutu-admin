interface Role {
  id: number
  name: string
  description?: string
  routes?: string[]
  permissions?: string[]
  createdAt: string
  updatedAt: string
}
type Action = 'createRole' | 'editRole' | 'deleteRole' | 'editRoleMenu'
export type { Role, Action }
