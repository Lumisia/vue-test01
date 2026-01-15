import postApi from '@/plugins/axiosinterceptor'
// 1. 서버로 저장하기 (POST)
// const saveContent = async () => {
//   try {
//     const response = await axios.post('http://localhost:8090/api/posts', {
//       content: content.value,
//     })
//     alert('저장되었습니다!')
//     console.log(response.data)
//   } catch (error) {
//     console.error('저장 실패:', error)
//   }
// }
/**
 * 게시글 저장 및 불러오기 관련 API 모음
 */

const posts = postApi.postApi

// 게시글 저장 / 불러오기 / 모두 불러오기
const savePost = async (postData) => {
  const post = await posts.post('user/posts', postData)
  console.log(api)
  return post
}
const getPost = async (idx) => {
  const post = await posts.get(`user/posts/${idx}`)

  return post
}
const allPosts = async () => {
  const post = await posts.get('user/posts')

  return post
}

export default { savePost, getPost, allPosts }
