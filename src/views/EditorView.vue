<script setup>
import { onMounted } from 'vue'
import { useEditorSocket, save } from '@/components/editor' // 경로 확인하세요!
import 'quill/dist/quill.snow.css'

// 로직 호출 (반드시 최상단에서)
const { title_event, initEditor } = useEditorSocket()
const { title, isFormValid, savePost } = save()

onMounted(() => {
  // 실제 DOM이 렌더링된 후 에디터 초기화
  initEditor('#editor')
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-4">
    <div class="flex items-end justify-between border-b border-gray-200 pb-2">
      <input
        v-model="title_event"
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
  <div id="cursor-layer">
    <div
      v-for="(mouse, id) in remoteMice"
      :key="id"
      class="mouse"
      :style="{
        backgroundColor: mouse.color,
        left: mouse.left + 'px',
        top: mouse.top + 'px',
      }"
    >
      <span class="label">{{ mouse.senderId }}</span>
    </div>
  </div>
</template>

<style scoped>
#cursor-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.mouse {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50% 50% 50% 0;
  transform: translate(-50%, -50%);
  transition: all 0.05s linear;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.label {
  position: absolute;
  top: 15px;
  left: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  background: inherit;
  color: white;
  font-size: 10px;
  font-weight: bold;
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
