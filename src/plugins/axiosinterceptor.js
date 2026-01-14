import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

const postApi = axios.create({
  baseURL: '/api', // 서버 기본 주소
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    console.log('요청 보내기 전에 실행')
    return config
  },
  () => {
    console.log('요청 보낼 때 에러 발생')
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (config) => {
    console.log('응답 받아서 화면에 띄우기 전에 실행')
    return config
  },
  () => {
    console.log('응답 받을 때 에러 발생')
    return Promise.reject(error)
  },
)

// 1. DB에 저장하기 (Save)
const saveDocument = async (docId) => {
  if (!quill) return

  // Quill의 현재 전체 내용을 Delta 형식으로 가져옴
  const content = quill.getContents()

  try {
    await axios.post('/api/save', {
      id: docId,
      content: JSON.stringify(content), // JSON 문자열로 변환하여 저장
    })
    alert('저장되었습니다!')
  } catch (err) {
    console.error('저장 실패:', err)
  }
}

// 2. DB에서 불러오기 (Load)
const loadDocument = async (docId) => {
  try {
    const res = await axios.get(`/api/documents/${docId}`)
    if (res.data && res.data.content) {
      // 서버에서 가져온 JSON을 다시 객체로 변환하여 Quill에 주입
      const delta = JSON.parse(res.data.content)
      quill.setContents(delta)
    }
  } catch (err) {
    console.error('불러오기 실패:', err)
  }
}

export default { api, postApi }
