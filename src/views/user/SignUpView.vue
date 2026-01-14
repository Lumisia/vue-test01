<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/user'
const router = useRouter()

const signForm = ref({
  nickname: '',
  name: '',
  password: '',
  passwordConfirm: '',
})

const errorMessage = ref('')

const signup = async () => {
  if (signForm.value.password !== signForm.value.passwordConfirm) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  const res = await api.signup(signForm.value)

  if (res.status === 200 || res.status === 201) {
    alert('회원가입이 완료되었습니다.')
    router.push({ name: 'login' })
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
        <p class="text-gray-500 text-sm mt-2">Create a new account</p>
      </div>

      <form @submit.prevent="signup" class="space-y-4" novalidate>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">닉네임</label>
          <input
            v-model="signForm.nickname"
            type="text"
            placeholder="사용할 닉네임을 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">이메일</label>
          <input
            v-model="signForm.name"
            type="email"
            placeholder="이메일을 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">비밀번호</label>
          <input
            v-model="signForm.password"
            type="password"
            placeholder="비밀번호"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">비밀번호 확인</label>
          <input
            v-model="signForm.passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div
          v-if="errorMessage"
          class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
        >
          <span class="text-red-500 text-sm font-bold"></span>
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ errorMessage }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition mt-6"
        >
          가입하기
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-8">
        이미 계정이 있으신가요?
        <RouterLink :to="{ name: 'login' }" class="text-blue-600 hover:underline font-medium"
          >로그인</RouterLink
        >
      </p>
    </div>
  </div>
</template>
