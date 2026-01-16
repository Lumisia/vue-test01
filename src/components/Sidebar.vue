<script setup>
import { ref } from 'vue'
import FileUpload from '@/components/function/FilesUpload.vue';

const isPersonalOpen = ref(true)
const isSharedOpen = ref(true)

const personalItems = ['SSL 인증서', '포트폴리오', 'Vue 학습']
const sharedItems = ['한화 부트캠프 24기', '프로젝트 팀A']
</script>

<template>
  <aside class="sidebar-container">
    <div class="p-6 flex items-center gap-3">
      <div class="logo-icon">
        <span class="text-white font-bold text-lg">F</span>
      </div>
      <span class="logo-text">FileInNOut</span>
    </div>

    <nav class="sidebar-nav">
      <div class="mb-6">
        <FileUpload class="upload-button">
        </FileUpload>
        <br>

        <RouterLink
          :to="{ name: 'home' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <i class="fa-solid fa-house"></i> 홈
        </RouterLink>

        <RouterLink
          :to="{ name: 'drive' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <i class="fa-brands fa-google-drive"></i> 내 드라이브
        </RouterLink>

        <RouterLink
          :to="{ name: 'shareFile' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <i class="fa-solid fa-people-group"></i> 공유 문서함
        </RouterLink>

        <RouterLink
          :to="{ name: 'recentFile' }"
          class="nav-link"
          active-class="nav-link-active"
        >
          <i class="fa-solid fa-clock"></i>최근 문서함
        </RouterLink>
      </div>

      <div class="divider"></div>

      <div>
        <div
          @click="isPersonalOpen = !isPersonalOpen"
          class="section-header"
        >
          <h3 class="section-title">개인 페이지</h3>
          <span
            class="section-toggle"
            :class="{ 'rotate-180': !isPersonalOpen }"
          >
          </span>
        </div>

        <div v-show="isPersonalOpen" class="mt-1 space-y-1">
          <div
            v-for="item in personalItems"
            :key="item"
            class="sidebar-item"
          >
            <i class="fa-solid fa-file-lines"></i> {{ item }}
          </div>
        </div>
      </div>

      <div>
        <div
          @click="isSharedOpen = !isSharedOpen"
          class="section-header"
        >
          <h3 class="section-title">협업 페이지</h3>
          <span
            class="section-toggle"
            :class="{ 'rotate-180': !isSharedOpen }"
          >
          </span>
        </div>

        <div v-show="isSharedOpen" class="mt-1 space-y-1">
          <div
            v-for="team in sharedItems"
            :key="team"
            class="sidebar-item"
          >
            <span class="text-xs text-blue-500">●</span> {{ team }}
          </div>
        </div>
        
        <RouterLink
          :to="{ name: 'trash' }"
          class="nav-link"
        >
          <i class="fa-solid fa-trash"></i>
          <span>휴지통</span>
        </RouterLink>

        <div class="storage-section">
          <RouterLink :to="{ name: 'storage' }" class="storage-link">
            <i class="fa-solid fa-cloud"></i>
            <span class="text-sm">저장용량</span>
          </RouterLink>

          <div class="storage-bar-container">
            <div class="storage-bar" style="width: 45%"></div>
          </div>

          <p class="storage-text">15GB 중 6.75GB 사용</p>

          <RouterLink
            :to="{ name: 'payment' }"
            class="upgrade-button"
          >
            추가 저장용량 구매
          </RouterLink>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
/* 사이드바 컨테이너 */
.sidebar-container {
  width: 16rem;
  background-color: var(--bg-main);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

/* 로고 */
.logo-icon {
  width: 2rem;
  height: 2rem;
  background-color: #2563eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-weight: 700;
  color: var(--text-main);
  letter-spacing: -0.025em;
}

/* 내비게이션 */
.sidebar-nav {
  flex: 1;
  padding: 0 0.75rem;
  overflow-y: auto;
}

/* 업로드 버튼 */
.upload-button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1d4ed8;
  background-color: #bae6fd;
  border-radius: 0.75rem;
  transition: all 0.15s;
}

.upload-button:hover {
  background-color: #7dd3fc;
}

.upload-button:active {
  background-color: #0ea5e9;
}

/* 네비게이션 링크 */
.nav-link {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background-color: var(--bg-input);
  color: var(--text-main);
}

.nav-link-active {
  background-color: rgba(59, 130, 246, 0.1);
  color: #2563eb;
  font-weight: 700;
}

.dark .nav-link-active {
  background-color: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
}

/* 구분선 */
.divider {
  border-top: 1px solid var(--border-color);
  margin: 1rem 0.5rem;
}

/* 섹션 헤더 */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.section-header:hover {
  background-color: var(--bg-input);
}

.section-title {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-toggle {
  font-size: 0.625rem;
  color: var(--text-muted);
  transition: transform 0.2s;
}

/* 사이드바 아이템 */
.sidebar-item {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.sidebar-item:hover {
  background-color: var(--bg-input);
  color: var(--text-main);
}

/* 저장용량 섹션 */
.storage-section {
  padding: 0.75rem;
  padding-top: 0.5rem;
}

.storage-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  transition: color 0.2s;
}

.storage-link:hover {
  color: var(--text-main);
}

.storage-bar-container {
  width: 100%;
  background-color: var(--bg-input);
  border-radius: 9999px;
  height: 0.375rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.storage-bar {
  background-color: #2563eb;
  height: 0.375rem;
  border-radius: 9999px;
  transition: width 0.3s;
}

.dark .storage-bar {
  background-color: #60a5fa;
}

.storage-text {
  font-size: 0.6875rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.upgrade-button {
  display: block;
  width: 100%;
  text-align: center;
  border: 1px solid var(--border-color);
  padding: 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  background-color: var(--bg-main);
  transition: all 0.2s;
}

.upgrade-button:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.dark .upgrade-button {
  color: #60a5fa;
}

.dark .upgrade-button:hover {
  background-color: rgba(96, 165, 250, 0.1);
}

/* 스크롤바 */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>