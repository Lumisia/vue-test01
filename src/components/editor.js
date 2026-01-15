import { ref, onUnmounted, computed } from 'vue'
import Quill from 'quill'
import postApi from '@/api/postApi'

// Yjs 관련 임포트
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'
import QuillCursors from 'quill-cursors'

Quill.register('modules/cursors', QuillCursors)

let quill = null
// Yjs 관련 인스턴스를 전역 변수처럼 관리 (cleanup을 위해)
let ydoc = null
let provider = null
let binding = null

export function useEditorSocket() {
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
  const myColor = colorPalette[myNumber]
  const myName = `User ${myNumber+1}`

  // 에디터 및 소켓 초기화 함수 (onMounted 제거됨)
  const initEditor = (elementId) => {
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

    // 2. 소켓 연결
    ydoc = new Y.Doc()

    const roomName = 'quill - demo - room'
    provider = new WebsocketProvider(
      'ws://localhost:1234', // 접속할 Yjs 웹소켓 서버 주소
      roomName,
      ydoc
    )

    // 4. 공유할 텍스트 타입 정의
    const ytext = ydoc.getText('quill')

    // 5. Quill과 Yjs 바인딩 (연결)
    // 이 한 줄이 에디터 내용 변경 감지, 타인 변경사항 반영, 커서 표시를 모두 자동화합니다.
    binding = new QuillBinding(ytext, quill, provider.awareness)

    // 6. 내 사용자 정보(Awareness) 설정
    // 다른 사람들에게 내 커서 색상과 이름을 알려줍니다.
    provider.awareness.setLocalStateField('user', {
      name: myName,
      color: myColor,
    })

    // 'connected' or 'disconnected'
    provider.on('status', event => {
      console.log('Websocket connection status:', event.status)
    })
  }

  const getQuill = () => quill

  // 컴포넌트 언마운트 시 연결 해제 및 메모리 정리
  onUnmounted(() => {
    if (binding) binding.destroy()
    if (provider) provider.disconnect()
    if (ydoc) ydoc.destroy()
    quill = null
  })

  return {
    initEditor,
    getQuill,
  }
}

export function save() {
  let title = ref('')

  const isFormValid = computed(() => {
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

  // // 2. 제목(Title) 동기화 설정
  //   const ytitle = ydoc.getText('title-content')

  //   // [A] 다른 사람이 제목을 수정했을 때 -> 내 화면의 title 변수 업데이트
  //   ytitle.observe(event => {
  //     // 무한 루프 방지를 위해 값이 다를 때만 업데이트
  //     if (title_event.value !== ytitle.toString()) {
  //       title_event.value = ytitle.toString()
  //     }
  //   })

  //   // [B] 내가 제목을 입력했을 때 -> Yjs 공유 데이터 업데이트
  //   // 컴포넌트에서 title 변수를 v-model로 연결했다고 가정합니다.
  //   watch(title, (newTitle) => {
  //     if (newTitle !== ytitle.toString()) {
  //       ydoc.transact(() => {
  //         ytitle.delete(0, ytitle.length)
  //         ytitle.insert(0, newTitle)
  //       })
  //     }
  //   })

  return {
    title,
    isFormValid,
    savePost,
  }
}
