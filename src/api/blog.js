import { HTTP } from './http-common'

export function fetchPosts() {
  try {
    return HTTP.get('/posts');
  } catch (e) {
    throw e;
  }
}

export function fetchPost(slug) {
  try {
    return HTTP.get(`/post/${slug}`);
  } catch (e) {
    throw e;
  }
}

export function createPost({ title, image, article }) {
  let formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('article', article);

  try {
    return HTTP.post('/post', formData);
  } catch (e) {
    throw e;
  }
}

export function editPost({ id, title, image, article }) {
  let formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('article', article);

  try {
    return HTTP.put('/post', { id, title, image, article });
  } catch (e) {
    throw e;
  }
}

export function deletePost(id) {
  try {
    return HTTP.delete('/post', { data: { id } });
  } catch (e) {
    throw e;
  }
}