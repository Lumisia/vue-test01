import { ref, watch, onUnmounted } from 'vue'
import { useMouse } from '@vueuse/core'
import Quill from 'quill'

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
  let quill = null
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
    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user' && !editorChangeFromRemote && socket?.readyState === WebSocket.OPEN) {
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

  // 컴포넌트 언마운트 시 소켓 정리
  onUnmounted(() => {
    if (socket) socket.close()
  })

  return {
    remoteMice,
    initEditor,
  }
}
