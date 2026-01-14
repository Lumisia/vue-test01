<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import Chat from '@/components/Chat.vue'
const isChatOpen = ref(false)

// 2. 서버에서 가져오기 (GET)
const loadContent = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/posts/1'); // 1번 게시글 예시
    content.value = response.data.content;
  } catch (error) {
    console.error('불러오기 실패:', error);
  }
}
</script>

<template>
  <div class="flex h-screen bg-[#F8F9FA]">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0">
      <Header @toggle-chat="isChatOpen = !isChatOpen" />

      <div class="flex-1 flex overflow-hidden">
        <main class="flex-1 overflow-y-auto p-8 transition-all duration-300">
          <RouterView />
        </main>

        <Chat :is-open="isChatOpen" @close="isChatOpen = false" />
      </div>
    </div>
  </div>
</template>
