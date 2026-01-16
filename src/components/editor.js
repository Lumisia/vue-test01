import { ref, onUnmounted, computed } from 'vue'
import Quill from 'quill'
import postApi from '@/api/postApi'
import QuillCursors from 'quill-cursors'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'

// Quill 모듈 등록
Quill.register('modules/cursors', QuillCursors)

let quill = null
let ydoc = null
let provider = null

export function useEditorSocket() {
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
  const title = save.title
  const myNumber = Math.floor(Math.random() * 10) // 1~10
  const myColor = colorPalette[myNumber]
  const myName = `사용자 ${myNumber + 1}`

  // 에디터 및 소켓 초기화 함수 (onMounted 제거됨)
  const initEditor = (elementId, roomName) => {
    ydoc = new Y.Doc()
    provider = new WebsocketProvider(
      'ws://localhost:1234', // 서버가 y-websocket 프로토콜을 지원해야 함
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

    // 4. 커서(Awareness) 정보 설정
    provider.awareness.setLocalStateField('user', {
      name: myName,
      color: myColor,
    })

    const getQuill = () => quill

    // 컴포넌트 언마운트 시 소켓 정리
    onUnmounted(() => {
      if (provider) provider.destroy()
      if (ydoc) ydoc.destroy()
    })
  }

  return {
    initEditor,
    title,
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
