import { HTTP } from './http-common'

export function fetchNotices() {
  try {
    return HTTP.get('/notices');
  } catch (e) {
    throw e;
  }
}

export function fetchCategories() {
  try {
    return HTTP.get('/categories');
  } catch (e) {
    throw e;
  }
}

export function fetchNotice(id) {
  try {
    return HTTP.get(`/notice/${id}`);
  } catch (e) {
    throw e;
  }
}

export function createNotice({ title, image, article, noticeCategoryId, source }) {
  let formData = new FormData();
  formData.append('title', title);
  formData.append('image', image);
  formData.append('article', article);
  formData.append('noticeCategoryId', noticeCategoryId);
  formData.append('source', source);

  try {
    return HTTP.post('/notice', formData);
  } catch (e) {
    throw e;
  }
}

export function editNotice({ id, name, image, description }) {
  try {
    return HTTP.put('/notice', { id, name, image, description });
  } catch (e) {
    throw e;
  }
}

export function deleteNotice(id) {
  try {
    return HTTP.delete('/notice', { data: { id } });
  } catch (e) {
    throw e;
  }
}