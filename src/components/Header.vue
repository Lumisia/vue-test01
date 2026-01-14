<script setup>
import { onMounted, ref } from 'vue'
import useAuthStore from '@/stores/useAuthStore'
const emit = defineEmits(['toggle-chat'])

// 채팅 토글 함수 추가
const handleToggleChat = () => {
  console.log('채팅 버튼 클릭됨') //
  emit('toggle-chat')
}


const authStore = useAuthStore()

const userName = ref('')

onMounted(() => {
  if (authStore.data && authStore.data.userName) {
    userName.value = authStore.data.userName
  }
})
</script>
<template>
  <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
    <div class="flex-1 max-w-2xl relative group">
      <input
        type="text"
        placeholder="파일, 폴더, 사람 검색"
        class="w-full bg-gray-100 border-none rounded-2xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-sm"
      />
      <span class="absolute left-4 top-2.5 opacity-40"></span>
    </div>

    <div class="flex items-center gap-5 ml-6">
      <button class="text-gray-500 hover:text-gray-800 transition relative">
        <i class="fa-solid fa-bell"></i>
      </button>

      <button @click="handleToggleChat" class="text-gray-500 hover:text-indigo-600 transition" title="협업채팅">
        <i class="fa-solid fa-comments"></i>
      </button>
      <div
        class="w-9 h-9 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white text-[10px] font-bold cursor-pointer"
      >
        {{ userName }}
      </div>
    </div>
  </header>
</template>
