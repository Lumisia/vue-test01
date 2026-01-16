<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/user'
import { useAuthStore } from '@/stores/useAuthStore'
const router = useRouter()

const loginForm = reactive({
  email: '',
  password: '',
})

const loginErrorMessage = ref('')
const authStore = useAuthStore()
const login = async () => {
  const res = await api.login(loginForm)

  if (res.status === 200) {
    authStore.login(JSON.stringify(res.data))
    alert('로그인 성공')
    router.push({ name: 'main' })
  } else {
    alert('아이디와 비밀번호를 확인해보세요')
  }


}
</script>
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white p-10 rounded-xl shadow-lg w-full max-w-[450px]">
      <div class="flex flex-col items-center mb-8">
        <div class="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mb-4">
          <span class="text-white font-bold text-xl">W</span>
        </div>
        <h1 class="text-2xl font-bold text-gray-800">Workspace Project</h1>
        <p class="text-gray-500 text-sm mt-2">Login to your account</p>
      </div>

      <button
        class="w-full border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-6">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4" />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853" />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            fill="#FBBC05" />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
            fill="#EA4335" />
        </svg>
        <span class="text-sm font-medium text-gray-700">Google 계정으로 계속하기</span>
      </button>

      <div class="relative flex items-center mb-6">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="px-3 text-xs text-gray-400 uppercase">또는</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">이메일</label>
          <input v-model="loginForm.email" type="email" placeholder="이메일을 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">비밀번호</label>
          <input v-model="loginForm.password" type="password" placeholder="비밀번호를 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div v-if="loginErrorMessage.value"
          class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <span class="text-red-500 text-sm font-bold"></span>
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ loginErrorMessage }}
          </p>
        </div>
        <button class="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition mt-4">
          로그인
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-8">
        계정이 없으신가요?
        <RouterLink to="/signup" class="text-blue-600 hover:underline font-medium">회원가입</RouterLink>
      </p>
    </div>
  </div>
</template>