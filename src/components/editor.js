import { ref, onUnmounted, computed, watch } from 'vue'
import Quill from 'quill'
import postApi from '@/api/postApi'
import QuillCursors from 'quill-cursors'
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'
import { WebsocketProvider } from 'y-websocket'

// Quill 모듈 등록
Quill.register('modules/cursors', QuillCursors)

// [수정] 공유 상태를 모듈 레벨로 이동하여 두 함수에서 모두 접근 가능하게 함
let quill = null
const title = ref('') // 제목 상태
const hasContent = ref(false) // 본문 존재 여부 상태
const remoteMice = ref({}) // 마우스

export function useEditorSocket() {
  let ydoc = null
  let provider = null

  const colorPalette = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF',
    '#4B0082', '#8B00FF', '#FF1493', '#00CED1', '#ADFF2F',
  ]

  const myNumber = Math.floor(Math.random() * 10) 
  const myColor = colorPalette[myNumber]
  const myName = `사용자 ${myNumber + 1}`

  const initEditor = (elementId, roomName = 'default-room') => {
    if (!roomName) roomName = 'default-room'

    ydoc = new Y.Doc()
    provider = new WebsocketProvider(
      'ws://www.cheeseduck.kro.kr/:1234',
      roomName,
      ydoc,
    )

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

    // [추가] 실시간 본문 입력 감지 로직
    quill.on('text-change', () => {
      // 공백을 제외한 실제 텍스트가 있는지 확인
      hasContent.value = quill.getText().trim().length > 0
    })

    const ytext = ydoc.getText('quill')
    new QuillBinding(ytext, quill, provider.awareness)

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

    // 1. 내 마우스 정보를 초기 설정 (이름, 색상)
    provider.awareness.setLocalStateField('user', {
      name: myName,
      color: myColor,
    })

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
    
    provider.awareness.on('change', () => {
      const states = provider.awareness.getStates()
      const mice = {}
      states.forEach((state, clientID) => {
        // 내 마우스가 아니고, 상대방이 마우스 위치와 유저 정보를 가지고 있을 때
        if (clientID !== ydoc.clientID && state.mouse && state.user) {
          mice[clientID] = {
            left: state.mouse.left,
            top: state.mouse.top,
            name: state.user.name,
            color: state.user.color,
          }
        }
      })
      remoteMice.value = mice
    })
  }

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
  // [수정] 제목(title)과 본문(hasContent)을 실시간으로 감시하여 버튼 상태 결정
  const isFormValid = computed(() => {
    const hasTitle = title.value.trim().length > 0
    return hasTitle && hasContent.value
  })

  // [수정] 외부에서 인자를 전달받지 않고 내부의 공유된 상태를 사용하여 저장
  const savePost = async () => {
    if (!quill || !title.value.trim()) return

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