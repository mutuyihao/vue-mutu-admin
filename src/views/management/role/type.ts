interface Role {
  id: number
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
type Action = 'createRole' | 'editRole' | 'deleteRole' | 'editRoleMenu'
export type { Role, Action }
