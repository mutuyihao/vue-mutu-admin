interface MyObject {
  [key: string]: any;
}
interface Staff {
  id: number
  name: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
  roleId: number
  role: {
    id: number
    name: string
    description: string
    type: string
    createdAt: string
    updatedAt: string
  }
}
type Action = 'create' | 'view' | 'edit' | 'delete' | 'editMenuPermission' | undefined
export type { Staff, Action }
