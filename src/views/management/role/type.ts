interface Role {
  id: number
  name: string
  description?: string
  routes?: Route[]
  permissions?: string[]
  createdAt: string
  updatedAt: string
}
type Action =
  | 'createRole'
  | 'editRole'
  | 'deleteRole'
  | 'editRoleMenu'
type Route = {
  id: number
  name: string
}
export type { Role, Action }
