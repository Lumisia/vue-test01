<script setup>
import { onMounted } from 'vue'
import { useEditorSocket, save } from '@/components/editor' // 경로 확인하세요!
import 'quill/dist/quill.snow.css'

// 로직 호출 (반드시 최상단에서)
const { initEditor, title, remoteMice } = useEditorSocket()
const { isFormValid, savePost } = save()

onMounted(() => {
  // 실제 DOM이 렌더링된 후 에디터 초기화
  initEditor('#editor', 'room-demo')
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-4">
    <div class="flex items-end justify-between border-b border-gray-200 pb-2">
      <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요"
        class="w-full text-4xl font-bold outline-none placeholder:text-gray-300 bg-transparent"
      />

      <button
        :disabled="!isFormValid"
        @click="savePost()"
        class="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed enabled:bg-blue-600 enabled:text-white enabled:hover:bg-blue-700"
      >
        저장하기
      </button>
    </div>
  </div>
  <div id="editor" class="flex-1 overflow-y-auto p-8 transition-all duration-300"></div>
  <div
    v-for="(mouse, id) in remoteMice"
    :key="id"
    class="mouse"
    :style="{
      left: mouse.left + 'px',
      top: mouse.top + 'px',
    }"
  >
    <div class="mouse-pointer" :style="{ backgroundColor: mouse.color }"></div>
    <div class="mouse-name" :style="{ backgroundColor: mouse.color }">{{ mouse.name }}</div>
  </div>
</template>

<style scoped>
.mouse {
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  transition: all 0.1s ease-out; /* 움직임을 부드럽게 */
}
.mouse-pointer {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 12px solid; /* 색상은 인라인 스타일로 결정 */
}

.mouse-name {
  padding: 2px 6px;
  color: white;
  font-size: 10px;
  border-radius: 4px;
  margin-top: 4px;
  white-space: nowrap;
}

.editor-paper {
  background: white;
  color: #1a1a1a;
}
.title-wrapper {
  background: white;
  /* color: white; */
  width: 50px;
}
</style>
