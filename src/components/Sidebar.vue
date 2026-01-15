<script setup>
import { ref } from 'vue'
import FileUpload from '@/components/function/FilesUpload.vue';

const isPersonalOpen = ref(true)
const isSharedOpen = ref(true)

const personalItems = ['SSL 인증서', '포트폴리오', 'Vue 학습']
const sharedItems = ['한화 부트캠프 24기', '프로젝트 팀A']
</script>
<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
    <div class="p-6 flex items-center gap-3">
      <div
        class="w-8 h-8 bg-blue-600 rounded-lg shadow-blue-200 shadow-lg flex items-center justify-center"
      >
        <span class="text-white font-bold text-lg">W</span>
      </div>
      <span class="font-bold text-gray-800 tracking-tight">CloudSpace</span>
    </div>

    <nav class="flex-1 px-3 space-y-1 overflow-y-auto">
      <div class="mb-6">

        <FileUpload class="w-full flex items-center gap-3 px-4 py-2 text-sm
                font-bold
                text-blue-700
                bg-sky-300
                hover:bg-sky-100
                active:bg-sky-400
                rounded-xl
                transition-colors duration-150"
                active-class="bg-sky-200 text-blue-800 font-bold">
        </FileUpload>

        <RouterLink
          :to="{ name: 'home' }"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
          active-class="bg-blue-50 text-blue-700 font-bold"
        >
          <i class="fa-solid fa-house"></i> 홈
        </RouterLink>

        <RouterLink
          :to="{ name: 'drive' }"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
          active-class="bg-blue-50 text-blue-700 font-bold"
        >
          <i class="fa-brands fa-google-drive"></i> 내 드라이브
        </RouterLink>

        <RouterLink
          :to="{ name: 'shareFile' }"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
          active-class="bg-blue-50 text-blue-700 font-bold"
        >
          <i class="fa-solid fa-people-group"></i> 공유 문서함
        </RouterLink>

        <RouterLink
          :to="{ name: 'recentFile' }"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition"
          active-class="bg-blue-50 text-blue-700 font-bold"
        >
          <i class="fa-solid fa-clock"></i>최근 문서함
        </RouterLink>
      </div>

      <div class="border-t border-gray-100 my-4 mx-2"></div>

      <div>
        <div
          @click="isPersonalOpen = !isPersonalOpen"
          class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg group"
        >
          <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">개인 페이지</h3>
          <span
            class="text-[10px] text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': !isPersonalOpen }"
          >
          </span>
        </div>

        <div v-show="isPersonalOpen" class="mt-1 space-y-1">
          <div
            v-for="item in personalItems"
            :key="item"
            class="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center gap-2 transition"
          >
            <i class="fa-solid fa-file-lines"></i> {{ item }}
          </div>
        </div>
      </div>

      <div>
        <div
          @click="isSharedOpen = !isSharedOpen"
          class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg group"
        >
          <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">협업 페이지</h3>
          <span
            class="text-[10px] text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': !isSharedOpen }"
          >
          </span>
        </div>

        <div v-show="isSharedOpen" class="mt-1 space-y-1">
          <div
            v-for="team in sharedItems"
            :key="team"
            class="px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center gap-2 transition"
          >
            <span class="text-xs text-blue-500">●</span> {{ team }}
          </div>
        </div>
        <RouterLink
          :to="{ name: 'trash' }"
          class="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <i class="fa-solid fa-trash"></i>
          <span>휴지통</span>
        </RouterLink>

        <div class="px-3 pt-2">
          <RouterLink :to="{ name: 'storage' }" class="flex items-center gap-3 text-gray-600 mb-3">
            <i class="fa-solid fa-cloud w"></i>
            <span class="text-sm">저장용량</span>
          </RouterLink>

          <div class="w-full bg-gray-100 rounded-full h-1.5 mb-2">
            <div class="bg-blue-600 h-1.5 rounded-full" style="width: 45%"></div>
          </div>

          <p class="text-[11px] text-gray-500 mb-4">15GB 중 6.75GB 사용</p>

          <RouterLink
            :to="{ name: 'payment' }"
            class="block w-full text-center border border-gray-300 py-2 rounded-full text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
          >
            추가 저장용량 구매
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style>
  /* + 버튼 스타일 */
.add-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #aaa;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.2s;
}

.add-btn:hover {
  color: #333; /* 마우스 올렸을 때 진해짐 */
}
</style>
