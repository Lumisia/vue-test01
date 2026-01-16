import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)

  const login = (userInfo) => {
    isLogin.value = true
    localStorage.setItem('USERINFO', userInfo)
  }

  const checkLogin = () => {
    if (localStorage.getItem('USERINFO')) {
      isLogin.value = true
    }
    return isLogin.value
  }
  return { isLogin, login, checkLogin }
})