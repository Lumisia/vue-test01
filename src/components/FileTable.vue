<script setup>
defineProps(['files'])
</script>
<template>
  <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
        <tr>
          <th class="px-6 py-3">이름 ↑</th>
          <th class="px-6 py-3">소유자 / 위치</th>
          <th class="px-6 py-3">수정 날짜</th>
          <th class="px-6 py-3 text-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="file in files"
          :key="file.name"
          class="border-b border-gray-50 hover:bg-gray-50 group transition"
        >
          <td class="px-6 py-4 flex items-center gap-3">
            <span class="text-blue-500">📄</span>
            <span class="font-medium text-gray-700">{{ file.name }}</span>
          </td>
          <td class="px-6 py-4">
            <div class="text-gray-600">{{ file.owner }}</div>
            <div class="text-xs text-gray-400">{{ file.location }}</div>
          </td>
          <td class="px-6 py-4 text-gray-500">{{ file.date }}</td>
          <td class="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition">
            <button class="text-gray-400 font-bold">⋮</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
