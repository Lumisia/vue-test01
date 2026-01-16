import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const storedData = localStorage.getItem('USERINFO')
  const data = ref(storedData ? JSON.parse(storedData) : null)

  const login = (userInfo) => {
    localStorage.setItem('USERINFO', userInfo)
    data.value = JSON.parse(userInfo)
  }

  return { login, data }
})
export default useAuthStore

