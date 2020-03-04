import { HTTP } from './http-common';
const LOGIN_TOKEN = "X-G5L-Token";

export function login(email, password) {
  try {
    return HTTP.post('/login', { email, password });
  } catch (e) {
    throw e;
  }
}

export function logout() {
  localStorage.removeItem(LOGIN_TOKEN);
}