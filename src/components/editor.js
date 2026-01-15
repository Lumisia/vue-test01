import { ref, watch, onUnmounted, reactive } from 'vue'
import { useMouse } from '@vueuse/core'
import Quill from 'quill'
import postApi from '@/api/postApi'

let quill = null

export function useEditorSocket() {
  const remoteMice = ref({})
  //   const senderId = Math.floor(Math.random() * 9) + 1
  //   const myColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  const colorPalette = [
    '#FF0000', // 빨강
    '#FF7F00', // 주황
    '#FFFF00', // 노랑
    '#00FF00', // 초록
    '#0000FF', // 파랑
    '#4B0082', // 남색
    '#8B00FF', // 보라
    '#FF1493', // 핑크 (8번)
    '#00CED1', // 민트 (9번)
    '#ADFF2F', // 연두 (10번)
  ]
  const myNumber = Math.floor(Math.random() * 10) + 1 // 1~10
  const senderId = myNumber
  const myColor = colorPalette[myNumber - 1]

  let socket = null
  let editorChangeFromRemote = false

  const { x, y } = useMouse()

  // 에디터 및 소켓 초기화 함수 (onMounted 제거됨)
  const initEditor = (elementId) => {
    // 1. Quill 초기화
    quill = new Quill(elementId, {
      theme: 'snow',
      placeholder: '내용을 입력하세요...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    })

    // 2. 소켓 연결
    socket = new WebSocket('wss://www.cheeseduck.kro.kr:443/ws/chat')

    socket.onopen = () => console.log('Connected to WebSocket')

    socket.onmessage = (event) => {
      const recv = JSON.parse(event.data)
      const payload = JSON.parse(recv.payload)
      const recvSenderId = payload.senderId
      const delta = payload.delta

      if (delta && delta.ops) {
        if (senderId !== recvSenderId && quill) {
          editorChangeFromRemote = true
          quill.updateContents(delta)
          editorChangeFromRemote = false
        }
      } else if (payload.left !== undefined) {
        remoteMice.value[recvSenderId] = {
          senderId: recvSenderId,
          color: payload.color,
          left: payload.left,
          top: payload.top,
        }
      }
    }

    // 3. 에디터 이벤트 등록
    quill.on('text-change', (delta, source) => {
      if (source === 'user' && !editorChangeFromRemote && socket?.readyState === WebSocket.OPEN) {
        isFormValid
        socket.send(JSON.stringify({ senderId, delta }))
      }
    })
  }

  // 내 마우스 위치 전송
  watch([x, y], ([newX, newY]) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          senderId,
          color: myColor,
          left: newX,
          top: newY,
        }),
      )
    }
  })
  const getQuill = () => quill

  // 컴포넌트 언마운트 시 소켓 정리
  onUnmounted(() => {
    if (socket) socket.close()
  })

  return {
    remoteMice,
    initEditor,
    getQuill,
  }
}
export function save() {
  const title = ref('')

  const isFormValid = reactive(() => {
    const hasTitle = title.value.trim().length > 0
    const has_content = quill ? quill.getText().trim().length > 0 : false
    return hasTitle && has_content
  })

  // 1. DB에 저장하기 (Save)
  const savePost = async () => {
    if (!quill) return

    // 2. 서버로 보낼 페이로드 구성 (제목, 본문, 날짜)
    const payload = {
      title: title.value, // 제목 (문자열)
      content: JSON.stringify(quill.getContents()), // 본문 (Delta 객체를 JSON 문자열로 변환)
      updatedAt: new Date().toISOString(), // 업데이트 날짜 (ISO 8601 형식: 2026-01-15T...)
    }

    try {
      await postApi.savePost(payload)
      alert('저장되었습니다!')
    } catch (err) {
      console.error('저장 실패:', err)
    }
  }

  return {
    title,
    isFormValid,
    savePost,
  }
}
