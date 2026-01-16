<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-100">
    <nav
      class="flex items-center justify-between px-10 py-5 sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 bg-blue-600 rounded-lg shadow-lg shadow-blue-200 flex items-center justify-center text-white font-bold text-xl"
        >
          F
        </div>
        <span class="font-bold text-2xl tracking-tight text-gray-900">FileInNOut</span>
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

    <header class="max-w-5xl mx-auto text-center pt-32 pb-20 px-6">
      <h1 class="text-6xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
        모든 작업을<br />
        <span class="text-blue-600 underline decoration-blue-100 underline-offset-8"
          >하나의 흐름으로.</span
        >
      </h1>
      <p class="text-gray-500 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
        파일 저장, 팀 공유, 실시간 편집, 그리고 채팅까지.<br />
        FileInNOut는 흩어져 있는 업무 도구를 하나로 통합합니다.
      </p>
      <div class="flex flex-col items-center gap-5">
        <RouterLink
          :to="{ name: 'signup' }"
          class="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1"
        >
          지금 바로 시작하세요
        </RouterLink>
        <p class="text-gray-400 text-sm font-medium cursor-pointer hover:text-gray-600">
          간편하게 둘러보기 →
        </p>
      </div>
    </header>

    <section class="max-w-6xl mx-auto px-6 mb-32">
      <div class="bg-white rounded-3xl border border-gray-200 p-3 shadow-2xl shadow-gray-200/50">
        <div
          class="bg-gray-50 rounded-2xl overflow-hidden aspect-video border border-gray-100 flex items-center justify-center relative"
        >
          <div class="absolute inset-0 flex opacity-40">
            <div class="w-64 border-r border-gray-200 bg-white p-6 space-y-4">
              <div class="h-4 w-full bg-gray-200 rounded"></div>
              <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
              <div class="h-4 w-3/4 bg-blue-100 rounded mt-10"></div>
            </div>
            <div class="flex-1 p-10 space-y-6">
              <div class="h-10 w-48 bg-gray-200 rounded-lg"></div>
              <div class="grid grid-cols-3 gap-6">
                <div class="h-40 bg-white rounded-2xl border border-gray-200 shadow-sm"></div>
                <div class="h-40 bg-white rounded-2xl border border-gray-200 shadow-sm"></div>
                <div class="h-40 bg-white rounded-2xl border border-gray-200 shadow-sm"></div>
              </div>
            </div>
          </div>
          <span class="relative z-10 text-gray-300 font-black text-5xl tracking-tighter"
            >DASHBOARD PREVIEW</span
          >
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 pb-40 grid md:grid-cols-3 gap-8">
      <div
        class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
      >
        <div
          class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition"
        >
          📁
        </div>
        <h3 class="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition">
          워크스페이스 저장소
        </h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          구글 드라이브와 같은 익숙한 파일 관리 기능을 제공합니다. 그리드 뷰와 리스트 뷰를 통해
          자유롭게 파일을 탐색하세요.
        </p>
      </div>

      <div
        class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
      >
        <div
          class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition"
        >
          💬
        </div>
        <h3 class="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition">
          끊김 없는 소통
        </h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          화면을 전환할 필요가 없습니다. 우측 채팅 사이드바에서 팀원들과 실시간으로 피드백을
          주고받으세요.
        </p>
      </div>

      <div
        class="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
      >
        <div
          class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition"
        >
          👥
        </div>
        <h3 class="text-xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition">
          팀과 함께하는 편집
        </h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          개인 페이지부터 공유 워크스페이스까지. 노션처럼 문서를 작성하고 공유하여 실시간 협업의
          속도를 높이세요.
        </p>
      </div>
    </section>

    <footer class="bg-white border-t border-gray-100 py-16 px-10 text-center">
      <div class="flex items-center justify-center gap-2 mb-6">
        <div
          class="w-7 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-blue-200"
        >
          F
        </div>
        <span class="font-bold text-lg tracking-tight text-gray-900">FileInNOut</span>
      </div>
      <p class="text-gray-400 text-xs mb-4">© 2026 FileInNOut Inc. All rights reserved.</p>
      <div class="flex justify-center gap-6 text-xs text-gray-400">
        <a href="#" class="hover:text-blue-600">개인정보처리방침</a>
        <a href="#" class="hover:text-blue-600">이용약관</a>
        <a href="#" class="hover:text-blue-600">문의하기</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
