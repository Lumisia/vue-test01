import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: () => import('../views/IntroduceView.vue'),
      meta: { title: '소개 - FileInNOut', requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue'),
      meta: { title: '로그인', requiresAuth: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/user/SignUpView.vue'),
      meta: { title: '회원가입', requiresAuth: false },
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentView.vue'),
      meta: { title: '요금제', requiresAuth: false },
    },
    {
      path: '/main',
      name: 'main',
      redirect: '/main/home',
      component: () => import('../views/MainView.vue'),
      meta: { requiresAuth: true }, // 부모가 true면 자식들도 영향을 받습니다.
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/dashboard/HomeView.vue'),
          meta: { title: '홈', requiresAuth: true },
        },
        {
          path: 'drive',
          name: 'drive',
          component: () => import('../views/dashboard/DriveView.vue'),
          meta: { title: '내 드라이브', requiresAuth: true },
        },
        {
          path: 'shareFile',
          name: 'shareFile',
          component: () => import('../views/dashboard/ShareFileView.vue'),
          meta: { title: '공유 문서함', requiresAuth: true },
        },
        {
          path: 'recentFile',
          name: 'recentFile',
          component: () => import('../views/dashboard/RecentFileView.vue'),
          meta: { title: '최근 문서함', requiresAuth: true },
        },
        {
          path: 'trash',
          name: 'trash',
          component: () => import('../views/dashboard/TrashView.vue'),
          meta: { title: '휴지통', requiresAuth: true },
        },
        {
          path: 'storage',
          name: 'storage',
          component: () => import('../views/dashboard/StorageView.vue'),
          meta: { title: '저장용량', requiresAuth: true },
        },
        { path: 'editor', 
          name: 'editor',
          component: () => import('../views/EditorView.vue'),
          meta: { title: '에디터', requiresAuth: true} },
      ],
    },
    { 
      path: '/pay',
      name: 'pay',
      component: () => import('../views/Pay.vue'),
      meta: { title : '결제', requiresAuth: true }, // 부모가 true면 자식들도 영향을 받습니다.
    },
    { 
      path: '/find_member',
      name: 'find_member',
      component: () => import('../views/user/Find_member.vue'),
      meta: { title : '회원 찾기', requiresAuth: true }, // 부모가 true면 자식들도 영향을 받습니다.
    }
  ],
})

router.beforeEach((to, from, next) => {
  console.log('vue에서 링크를 이동할 때 매번 실행되는 함수')

  document.title = to.meta.title

  // if (to.meta.requiresAuth) {
  //   if (localStorage.getItem('USERINFO') === null) {
  //     next({ name: 'login' })
  //   }
  // }
  next()
})

export default router
