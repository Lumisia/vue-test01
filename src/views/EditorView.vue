<script setup>
import { onMounted } from 'vue'
import { useEditorSocket } from '@/components/editor' // 경로 확인하세요!
import 'quill/dist/quill.snow.css'
//import api from '@/api/editor'

// 로직 호출 (반드시 최상단에서)
const { remoteMice, initEditor } = useEditorSocket()

onMounted(() => {
  // 실제 DOM이 렌더링된 후 에디터 초기화
  initEditor('#editor')
})
</script>

<template>
  <div id="editor" class="flex-1 overflow-y-auto p-8 transition-all duration-300"><</div>
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
</style>
