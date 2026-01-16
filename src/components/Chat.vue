<script setup>
import { ref } from 'vue'
import ChatRoom from './ChatRoom.vue'
import ChatList from './Chatlist.vue'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const viewMode = ref('list')
const selectedRoom = ref(null)
const currentUser = { name: '선엽' }

const chatRooms = ref([
  { id: 'room-1', name: '전체 공지방', icon: 'fa-bullhorn', lastMsg: '새 공지 확인', count: 5 },
  { id: 'room-2', name: '개발팀 협업', icon: 'fa-code', lastMsg: 'API 연동 중', count: 12 },
  { id: 'room-3', name: '디자인 피드백', icon: 'fa-palette', lastMsg: '시안 수정본', count: 3 },
  { id: 'room-4', name: '마케팅 전략', icon: 'fa-chart-line', lastMsg: '배너 확정', count: 8 },
])

const handleSelectRoom = (room) => {
  selectedRoom.value = room
  viewMode.value = 'room'
}
</script>

<template>
  <aside class="chat-panel" :class="isOpen ? 'chat-panel-open' : 'chat-panel-closed'">
    <div class="chat-header">
      <div class="flex items-center gap-2">
        <button
          v-if="viewMode === 'room'"
          @click="viewMode = 'list'"
          class="back-button"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <span class="chat-title">
          {{ viewMode === 'list' ? '채팅 목록' : selectedRoom.name }}
        </span>
      </div>
      <button @click="emit('close')" class="close-button">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <ChatList v-if="viewMode === 'list'" :rooms="chatRooms" @select-room="handleSelectRoom" />
    <ChatRoom v-else :room="selectedRoom" :currentUser="currentUser" @back="viewMode = 'list'" />
  </aside>
</template>

<style scoped>
.chat-panel {
  background-color: var(--bg-main);
  border-left: 1px solid var(--border-color);
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 40;
}

.chat-panel-open {
  width: 20rem;
}

.chat-panel-closed {
  width: 0;
}

.chat-header {
  height: 4rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem;
  flex-shrink: 0;
}

.back-button {
  margin-right: 0.25rem;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.back-button:hover {
  color: var(--accent);
}

.chat-title {
  font-weight: 900;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-main);
}

.close-button {
  color: var(--text-muted);
  transition: color 0.2s;
}

.close-button:hover {
  color: var(--text-main);
}
</style>