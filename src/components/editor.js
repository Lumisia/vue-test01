import { ref, onUnmounted, computed, watch } from 'vue'
import Quill from 'quill'
import postApi from '@/api/postApi'
import QuillCursors from 'quill-cursors'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'

// Quill 모듈 등록
Quill.register('modules/cursors', QuillCursors)

let quill = null

export function useEditorSocket() {
  const title = ref('') // 제목 반응형 데이터
  const remoteMice = ref({}) // 다른 사용자들의 마우스 위치
  let quill = null
  let ydoc = null
  let provider = null

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

  const myNumber = Math.floor(Math.random() * 10) // 1~10
  const myColor = colorPalette[myNumber]
  const myName = `사용자 ${myNumber + 1}`

  // 에디터 및 소켓 초기화 함수 (onMounted 제거됨)
  const initEditor = (elementId, roomName = 'default-room') => {
    if (!roomName) roomName = 'default-room'

    ydoc = new Y.Doc()
    provider = new WebsocketProvider(
      'wss://www.cheeseduck.kro.kr/:1234', // 서버가 y-websocket 프로토콜을 지원해야 함
      roomName,
      ydoc,
    )

    // 1. Quill 초기화
    quill = new Quill(elementId, {
      theme: 'snow',
      placeholder: '내용을 입력하세요...',
      modules: {
        cursors: true,
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

    // 3. Yjs-Quill 바인딩 (이 부분이 핵심: 자동 동기화)
    const ytext = ydoc.getText('quill')
    new QuillBinding(ytext, quill, provider.awareness)

    // 3. 제목 동기화
    const yTitle = ydoc.getText('title')
    yTitle.observe(() => {
      if (title.value !== yTitle.toString()) title.value = yTitle.toString()
    })
    watch(title, (newVal) => {
      if (yTitle.toString() !== newVal) {
        ydoc.transact(() => {
          yTitle.delete(0, yTitle.length)
          yTitle.insert(0, newVal)
        })
      }
    })

    // 3. 마우스 위치 공유 (Awareness 활용)
    // 내 마우스 움직임을 다른 사람에게 전송
    window.addEventListener('mousemove', (e) => {
      if (provider?.awareness) {
        provider.awareness.setLocalStateField('mouse', {
          x: e.clientX,
          y: e.clientY,
          name: myName,
          color: myColor,
        })
      }
    })
    // 다른 사람들의 마우스 위치 변화 감지
    provider.awareness.on('update', () => {
      const states = provider.awareness.getStates()
      const mice = {}
      states.forEach((state, clientID) => {
        if (clientID !== ydoc.clientID && state.mouse) {
          mice[clientID] = state.mouse
        }
      })
      remoteMice.value = mice
    })
    // 4. 커서(Awareness) 정보 설정
    provider.awareness.setLocalStateField('user', {
      name: myName,
      color: myColor,
    })

    console.log(remoteMice.value)
  }
  // 컴포넌트 언마운트 시 소켓 정리
  onUnmounted(() => {
    if (provider) provider.destroy()
    if (ydoc) ydoc.destroy()
  })
  return {
    initEditor,
    title,
    remoteMice,
  }
}
export function save() {
  const title = ref('')

  const isFormValid = computed(() => {
    const hasTitle = title.value.trim().length > 0
    const has_content = quill ? quill.getText().trim().length > 0 : false
    return hasTitle && has_content
  })

  // 1. DB에 저장하기 (Save)
  const savePost = async (quill, title) => {
    if (!quill || title.value.trim() === '') return

    const payload = {
      title: title.value,
      content: JSON.stringify(quill.getContents()),
      updatedAt: new Date().toISOString(),
    }

    try {
      await postApi.savePost(payload)
      alert('저장되었습니다!')
    } catch (err) {
      console.error('저장 실패:', err)
    }
  }

  return {
    isFormValid,
    savePost,
  }
}
