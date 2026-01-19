<template>
  <div class="pay-page-container">
    <div class="pay-content-wrapper">
      <div class="pay-main-section">
        <div class="pay-card-form-box">
          <h2 class="section-title">
            <span class="step-badge">1</span>
            카드 결제 정보
          </h2>

          <div class="input-group-stack">
            <div class="input-field">
              <label class="input-label">카드 번호</label>
              <div class="card-number-grid">
                <input
                  type="text"
                  maxlength="4"
                  placeholder="0000"
                  class="base-input"
                  v-model="card.n1"
                />
                <input
                  type="password"
                  maxlength="4"
                  placeholder="****"
                  class="base-input"
                  v-model="card.n2"
                />
                <input
                  type="password"
                  maxlength="4"
                  placeholder="****"
                  class="base-input"
                  v-model="card.n3"
                />
                <input
                  type="text"
                  maxlength="4"
                  placeholder="0000"
                  class="base-input"
                  v-model="card.n4"
                />
              </div>
            </div>

            <div class="flex-row gap-20">
              <div class="input-field flex-1">
                <label class="input-label">유효기간 (MM/YY)</label>
                <div class="expiry-input-box">
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="MM"
                    class="base-input center-text"
                    v-model="card.mm"
                  />
                  <span class="separator">/</span>
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="YY"
                    class="base-input center-text"
                    v-model="card.yy"
                  />
                </div>
              </div>
              <div class="input-field flex-1">
                <label class="input-label">CVC 번호</label>
                <input
                  type="password"
                  maxlength="3"
                  placeholder="뒷면 3자리"
                  class="base-input"
                  v-model="card.cvc"
                />
              </div>
            </div>

            <div class="flex-row gap-20 pt-20 border-top">
              <div class="input-field">
                <label class="input-label">비밀번호 앞 2자리</label>
                <input
                  type="password"
                  maxlength="2"
                  placeholder="**"
                  class="base-input w-80 center-text"
                  v-model="card.pwd"
                />
              </div>
              <div class="input-field flex-1">
                <label class="input-label">할부 설정</label>
                <select class="base-input" v-model="card.installment">
                  <option value="0">일시불</option>
                  <option value="2">2개월 (무이자)</option>
                  <option value="3">3개월 (무이자)</option>
                  <option value="6">6개월</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="pay-agreement-box">
          <h2 class="section-title small">
            <span class="step-badge">2</span>
            결제 동의
          </h2>
          <label class="agreement-label">
            <input type="checkbox" v-model="agreements" class="check-box" />
            <div class="agreement-text">
              <strong>[필수] 정기결제 및 서비스 이용약관 동의</strong><br />
              입력하신 카드 정보로 매달 자동 결제됨에 동의합니다.
            </div>
          </label>
        </div>
      </div>

      <div class="pay-side-section">
        <div class="summary-card">
          <div class="summary-header">
            <span class="summary-sub">Final Checkout</span>
            <h2 class="plan-name">{{ route.query.plan }} 플랜</h2>
          </div>

          <div class="summary-body">
            <div class="summary-row font-medium">
              <span class="label">구독 주기</span>
              <span class="value">{{ route.query.period }}</span>
            </div>
            <div class="summary-row font-medium">
              <span class="label">결제 금액</span>
              <span class="value">${{ route.query.price }}</span>
            </div>
            <div class="summary-total border-top pt-20">
              <span class="label font-bold">총 합계</span>
              <span class="total-value">${{ route.query.price }}</span>
            </div>
          </div>
          <button
            @click="handlePayment"
            :disabled="!isReady"
            :class="['submit-button', { active: isReady }]"
          >
            안전하게 결제하기
          </button>
          <div class="security-info">
            <p>모든 정보는 256비트 SSL로 암호화됩니다.</p>
            <div class="card-brands">VISA | MASTER | AMEX | JCB</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router' // useRouter 추가

const route = useRoute()
const router = useRouter() // 라우터 인스턴스 생성

const agreements = ref(false)

const card = reactive({
  n1: '',
  n2: '',
  n3: '',
  n4: '',
  mm: '',
  yy: '',
  cvc: '',
  pwd: '',
  installment: '0',
})

const isReady = computed(() => {
  return agreements.value && card.n1 && card.n4 && card.mm && card.cvc
})

// 결제 처리 함수
const handlePayment = () => {
  if (!isReady.value) return

  // 1. 실제로는 여기서 API 통신을 수행합니다.
  // 2. 가상의 결제 성공 처리
  alert(`$${route.query.price} 결제가 성공적으로 완료되었습니다! 메인 화면으로 이동합니다.`)

  // 3. 메인 페이지로 이동
  router.push('/main')
}
</script>

<style scoped>
/* 기본 레이아웃 */
.pay-page-container {
  min-height: 100 screen;
  background-color: #f4f7fa;
  padding: 50px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.pay-content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.8fr 1.2fr;
  gap: 30px;
}

/* 박스 공통 스타일 */
.pay-card-form-box,
.pay-agreement-box,
.summary-card {
  background-color: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #edf2f7;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* 제목 및 뱃지 */
.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 30px;
}

.section-title.small {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.step-badge {
  width: 28px;
  height: 28px;
  background-color: #2563eb;
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 입력 필드 스타일 */
.input-field {
  margin-bottom: 20px;
}
.input-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #4a5568;
  margin-bottom: 8px;
}

.base-input {
  width: 100%;
  padding: 12px 16px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  font-size: 1rem;
  transition: all 0.2s;
}

.base-input:focus {
  background-color: white;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

/* 카드번호/유효기간 특수 레이아웃 */
.card-number-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.expiry-input-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.separator {
  color: #cbd5e0;
}
.center-text {
  text-align: center;
}
.w-80 {
  width: 80px;
}

/* 유틸리티 */
.flex-row {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.gap-20 {
  gap: 20px;
}
.pt-20 {
  padding-top: 20px;
}
.border-top {
  border-top: 1px solid #f1f5f9;
}

/* 약관 동의 영역 */
.agreement-label {
  display: flex;
  gap: 15px;
  background-color: #f8fafc;
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
}

.check-box {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.agreement-text {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.5;
}

/* 우측 요약 카드 */
.summary-card {
  position: sticky;
  top: 30px;
}
.summary-sub {
  font-size: 0.75rem;
  font-weight: 800;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.plan-name {
  font-size: 1.75rem;
  font-weight: 900;
  margin-top: 5px;
  margin-bottom: 30px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #718096;
}
.summary-row .value {
  color: #1a202c;
}
.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}
.total-value {
  font-size: 2rem;
  font-weight: 900;
  color: #2563eb;
}

/* 결제 버튼 */
.submit-button {
  width: 100%;
  padding: 18px;
  margin-top: 30px;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  background-color: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
  transition: all 0.3s;
}

.submit-button.active {
  background-color: #1a202c;
  color: white;
  cursor: pointer;
}

.submit-button.active:hover {
  background-color: #000;
  transform: translateY(-2px);
}

.security-info {
  text-align: center;
  margin-top: 25px;
}
.security-info p {
  font-size: 0.7rem;
  color: #a0aec0;
}
.card-brands {
  font-size: 0.65rem;
  color: #cbd5e0;
  font-weight: 800;
  margin-top: 10px;
  letter-spacing: 0.1em;
}

/* 반응형 */
@media (max-width: 768px) {
  .pay-content-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
