import postApi from '@/plugins/axiosinterceptor'
// 1. 서버로 저장하기 (POST)
const saveContent = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/posts', {
      content: content.value
    });
    alert('저장되었습니다!');
    console.log(response.data);
  } catch (error) {
    console.error('저장 실패:', error);
  }
};
/**
 * 게시글 저장 및 불러오기 관련 API 모음
 */

// 게시글 저장 / 불러오기 / 모두 불러오기
const savePost = async (postData) => {
  const post = await postApi.post('/posts', postData);

  return post
}
const getPost = async (idx) => {
  const post = await postApi.get(`/posts/${idx}`);

  return post
}
const allPosts = async () => {
  const post = await postApi.get('/posts');

  return post
}

export default {savePost, getPost, allPosts};