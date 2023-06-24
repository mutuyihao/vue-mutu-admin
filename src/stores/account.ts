import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



interface MyObject {
    [key: string]: any;
}
type User = {
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
    location?: any
}

export const useAccountStore = defineStore("account", () => {
    let user = ref<User>(JSON.parse(localStorage.getItem('USER')!))
    let menu = ref<MyObject>()
    let isMobile = ref(false)
    function isMobileDevice() {
        let isMobile1 = false
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            isMobile1 = true
        }
        return isMobile1
    }
    isMobile.value = isMobileDevice()
    function setUser(data: User) {
        user.value = data
        localStorage.setItem('USER', JSON.stringify(user.value))
        menu.value = data.menu
    }


    return { user, menu, isMobile, setUser }
})
