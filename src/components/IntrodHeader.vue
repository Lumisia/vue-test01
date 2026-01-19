<script setup>

</script>

<template>
    <nav
      class="flex items-center justify-between px-10 py-5 sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 bg-blue-600 rounded-lg shadow-lg shadow-blue-200 flex items-center justify-center text-white font-bold text-xl"
        >
          F
        </div>
        <RouterLink :to="{name : 'intro'}" class="font-bold text-2xl tracking-tight text-gray-900">FileInNOut</RouterLink>
      </div>
      <div class="flex items-center gap-10 text-sm font-semibold text-gray-500">
        <a href="#" class="hover:text-blue-600 transition">기능</a>
        <RouterLink :to="{ name: 'payment' }" class="hover:text-blue-600 transition"
          >요금제</RouterLink
        >
        <RouterLink :to="{ name: 'login' }" class="text-gray-700 hover:text-blue-600"
          >로그인</RouterLink
        >
        <RouterLink
          :to="{ name: 'signup' }"
          class="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition shadow-md shadow-blue-100"
        >
          무료로 시작하기
        </RouterLink>
      </div>
    </nav>
</template>

<style scoped>

</style>