<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="notfound-container">
    <div class="notfound-content">
      <!-- 404 아이콘 -->
      <div class="icon-wrapper">
        <i class="fa-solid fa-cloud-exclamation"></i>
      </div>

      <!-- 404 숫자 -->
      <h1 class="error-code">404</h1>

      <!-- 메시지 -->
      <h2 class="error-title">페이지를 찾을 수 없습니다</h2>
      <p class="error-description">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br />
        URL을 다시 확인해주세요.
      </p>

      <!-- 버튼 그룹 -->
      <div class="button-group">
        <button @click="goBack" class="btn btn-secondary">
          <i class="fa-solid fa-arrow-left"></i>
          이전 페이지
        </button>
        <button @click="goHome" class="btn btn-primary">
          <i class="fa-solid fa-house"></i>
          홈으로 가기
        </button>
      </div>

      <!-- 추천 링크 -->
      <div class="quick-links">
        <p class="quick-links-title">다음 페이지를 찾으시나요?</p>
        <div class="links-grid">
          <RouterLink :to="{ name: 'home' }" class="quick-link">
            <i class="fa-solid fa-house"></i>
            <span>홈</span>
          </RouterLink>
          <RouterLink :to="{ name: 'drive' }" class="quick-link">
            <i class="fa-brands fa-google-drive"></i>
            <span>내 드라이브</span>
          </RouterLink>
          <RouterLink :to="{ name: 'shareFile' }" class="quick-link">
            <i class="fa-solid fa-people-group"></i>
            <span>공유 문서함</span>
          </RouterLink>
          <RouterLink :to="{ name: 'trash' }" class="quick-link">
            <i class="fa-solid fa-trash"></i>
            <span>휴지통</span>
          </RouterLink>
        </div>
      </div>

      <!-- 장식 요소 -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notfound-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-main) 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.notfound-content {
  max-width: 600px;
  text-align: center;
  position: relative;
  z-index: 10;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 아이콘 */
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  border-radius: 50%;
  margin-bottom: 2rem;
  box-shadow: 0 20px 60px rgba(240, 125, 24, 0.3);
  animation: float 3s ease-in-out infinite;
}

.icon-wrapper i {
  font-size: 3.5rem;
  color: white;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 404 텍스트 */
.error-code {
  font-size: 8rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.05em;
  text-shadow: 0 10px 30px rgba(240, 125, 24, 0.2);
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 1.5rem 0 1rem;
}

.error-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

/* 버튼 */
.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(240, 125, 24, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(240, 125, 24, 0.4);
}

.btn-secondary {
  background-color: var(--bg-input);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: var(--border-color);
  transform: translateY(-2px);
}

.btn i {
  position: relative;
  z-index: 1;
}

.btn span {
  position: relative;
  z-index: 1;
}

/* 빠른 링크 */
.quick-links {
  background-color: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

.quick-links-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-main);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.quick-link:hover {
  background-color: var(--bg-input);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(240, 125, 24, 0.15);
}

.quick-link i {
  font-size: 1.25rem;
  color: var(--accent);
}

/* 장식 요소 */
.floating-shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.05;
  animation: floatShape 20s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
  animation-delay: 5s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  animation-delay: 10s;
}

@keyframes floatShape {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

/* 반응형 */
@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .button-group {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>