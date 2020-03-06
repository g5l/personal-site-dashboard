import { HTTP } from './http-common'

export function fetchProducts() {
  try {
    return HTTP.get('/products');
  } catch (e) {
    throw e;
  }
}

export function fetchProduct(id) {
  try {
    return HTTP.get(`/product/${id}`);
  } catch (e) {
    throw e;
  }
}

export function createProduct({ name, image, description }) {
  let formData = new FormData();
  formData.append('image', image);
  formData.append('name', name);
  formData.append('description', description);

  try {
    return HTTP.post('/product', formData);
  } catch (e) {
    throw e;
  }
}

export function editProduct({ id, name, image, description }) {
  try {
    return HTTP.put('/product', { id, name, image, description });
  } catch (e) {
    throw e;
  }
}

export function deleteProduct(id) {
  try {
    return HTTP.delete('/product', { data: { id } });
  } catch (e) {
    throw e;
  }
}