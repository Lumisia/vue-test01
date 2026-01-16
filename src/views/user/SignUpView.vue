<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/user'

const router = useRouter()

const signupForm = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
})

const signupInputError = reactive({
  name: {
    errorMessage: null,
    isValid: false
  },
  email: {
    errorMessage: null,
    isValid: false
  },
  password: {
    errorMessage: null,
    isValid: false
  },
  passwordConfirm: {
    errorMessage: null,
    isValid: false
  }
})

const nicknameRules = () => {
  if (signupForm.name === '') {
    signupInputError.name.errorMessage = "닉네임을 입력해 주세요."
    signupInputError.name.isValid = false
    return false
  }

  signupInputError.name.errorMessage = null;
  signupInputError.name.isValid = true
}

const emailRules = () => {
  if (signupForm.email === '') {
    signupInputError.email.errorMessage = "이메일 주소를 입력해 주세요."
    signupInputError.email.isValid = false
    return false
  }

  if (!signupForm.email.includes('@')) {
    signupInputError.email.errorMessage = "이메일 형식이 올바르지 않습니다."
    signupInputError.email.isValid = false
    return false
  }

  signupInputError.email.errorMessage = null;
  signupInputError.email.isValid = true
}

const pwRules = () => {
  if (signupForm.password === '') {
    signupInputError.password.errorMessage = "비밀번호를 입력해 주세요."
    signupInputError.password.isValid = false
    return false
  }

  if (signupForm.password.length < 8) {
    signupInputError.password.errorMessage = "영문, 숫자, 특수문자를 조합하여 8자 이상 입력해 주세요."
    signupInputError.password.isValid = false
    return false
  }

  signupInputError.password.errorMessage = null;
  signupInputError.password.isValid = true
}

const pwConfirmRules = () => {
  if (signupForm.passwordConfirm === '') {
    signupInputError.passwordConfirm.errorMessage = "비밀번호를 한 번 더 입력해 주세요."
    signupInputError.passwordConfirm.isValid = false
    return false
  }

  signupInputError.passwordConfirm.errorMessage = null;
  signupInputError.passwordConfirm.isValid = true
}

const isValidCheck = () => {
  return !(signupInputError.name.isValid && signupInputError.email.isValid && signupInputError.password.isValid && signupInputError.passwordConfirm.isValid)
}

const signup = async () => {
  const res = await api.signup(signupForm)


  if (res.status === 200) {
    alert('회원가입 성공')
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
          <input v-model="signupForm.name" @blur="nicknameRules" type="text" placeholder="사용할 닉네임을 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ signupInputError.name.errorMessage }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">이메일</label>
          <input v-model="signupForm.email" @blur="emailRules" type="email" placeholder="이메일을 입력하세요"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ signupInputError.email.errorMessage }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">비밀번호</label>
          <input v-model="signupForm.password" @blur="pwRules" type="password" placeholder="비밀번호"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ signupInputError.password.errorMessage }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1">비밀번호 확인</label>
          <input v-model="signupForm.passwordConfirm" @blur="pwConfirmRules" type="password" placeholder="비밀번호 확인"
            class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <p class="text-red-600 text-xs font-medium leading-relaxed">
            {{ signupInputError.passwordConfirm.errorMessage }}
          </p>
        </div>

        <button :disabled="isValidCheck()"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition mt-6">
          가입하기
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-8">
        이미 계정이 있으신가요?
        <RouterLink to="/login" class="text-blue-600 hover:underline font-medium">로그인</RouterLink>
      </p>
    </div>
  </div>
</template>
