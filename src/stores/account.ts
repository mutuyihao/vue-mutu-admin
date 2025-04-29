import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface MyObject {
  [key: string]: any
}
type User = {
  id: number
  name: string
  username: string
  email: string
  role: Role
  roleId: number
  access_token: string
  createdAt: string
  updatedAt: string
}
type Role = {
  id: number
  name: string
  description: string
  routes: {
    name: string
  }[]
  permissions: any
  createdAt: string
  updatedAt: string
}
export type Location = {
  abcode: string
  bounds: any
  city: string
  gEa: string
  info: string
  province: string
  rectangle: string
}
export const useAccountStore = defineStore(
  'account',
  () => {
    const user = ref<User | null>(
      localStorage.getItem('USER')
        ? JSON.parse(localStorage.getItem('USER') as string)
        : null
    )
    const location = ref<Location>({
      abcode: '',
      bounds: {},
      city: '',
      gEa: '',
      info: '',
      province: '',
      rectangle: ''
    })
    const isMobile = ref<boolean>(isMobileDevice())
    function setUser(data: User) {
      user.value = data
      localStorage.setItem(
        'USER',
        JSON.stringify(user.value)
      )
      localStorage.setItem('TOKEN', user.value.access_token)
    }
    function setLocation(data: Location) {
      location.value = data
    }
    return {
      user,
      setUser,
      isMobile,
      location,
      setLocation
    }
  }
)
function isMobileDevice() {
  let judge = false
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    judge = true
  }
  return judge
}
