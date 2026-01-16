<script setup>
import FileTable from '@/components/FileTable.vue'
const homeFiles = [
  {
    name: '한화 24기_이선엽.jpg',
    reason: '내가 열어본 항목',
    owner: '나',
    location: '내 드라이브',
    date: '2025. 11. 19.',
  },
  {
    name: '자주 하는 질문',
    reason: '자주 열어봄',
    owner: '나',
    location: '공유 문서함',
    date: '2025. 12. 12.',
  },
]
const downloadFile = (filename) => {
  window.location.href = `/download/${filename}`
}
</script>
<template>
  <div>
    <h2 class="text-xl mb-6 text-gray-800">Drive에 오신 것을 환영합니다</h2>

    <div class="mb-10">
      <h3 class="text-sm font-medium text-gray-500 mb-4 flex items-center gap-2">
        <span>▼</span> 추천 파일
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="i in 4"
          :key="i"
          @click="downloadFile(`recommend${i}.pdf`)"
          class="bg-white p-4 rounded-xl cursor-pointer"
        >
          <p>추천 문서 {{ i }}.pdf</p>
        </div>
      </div>
    </div>

    <FileTable :files="homeFiles" />
  </div>
</template>
