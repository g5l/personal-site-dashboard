import { HTTP } from './http-common'

export function fetchProducts() {
  try {
    return HTTP.get('/products');
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