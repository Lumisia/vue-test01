import postApi from '@/plugins/axiosinterceptor'

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
