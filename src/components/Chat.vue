<script setup>
import { ref } from 'vue'
import ChatRoom from './ChatRoom.vue'
import ChatList from './Chatlist.vue'

const props = defineProps({ isOpen: Boolean })
const emit = defineEmits(['close'])

const viewMode = ref('list') // 'list' or 'room'
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
  <aside
    class="bg-white border-l border-gray-200 transition-all duration-300 overflow-hidden flex flex-col z-[40]"
    :class="isOpen ? 'w-80' : 'w-0'"
  >
    <div
      class="h-16 border-b border-[var(--border-color)] flex items-center justify-between px-5 shrink-0"
    >
      <div class="flex items-center gap-2">
        <button
          v-if="viewMode === 'room'"
          @click="viewMode = 'list'"
          class="mr-1 hover:text-[#f07d18]"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <span class="font-black text-sm uppercase tracking-wider text-[var(--text-main)]">
          {{ viewMode === 'list' ? '채팅 목록' : selectedRoom.name }}
        </span>
      </div>
      <button @click="emit('close')" class="text-[var(--text-muted)] hover:text-white">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <ChatList v-if="viewMode === 'list'" :rooms="chatRooms" @select-room="handleSelectRoom" />
    <ChatRoom v-else :room="selectedRoom" :currentUser="currentUser" @back="viewMode = 'list'" />
  </aside>
</template>
