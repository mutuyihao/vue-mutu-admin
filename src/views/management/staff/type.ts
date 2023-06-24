interface MyObject {
  [key: string]: any;
}
interface Staff {
  id: number
  name: string
  menu: MyObject
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
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
