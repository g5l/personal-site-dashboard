import axios from 'axios';

const baseURL = process.env.API_PATH || 'http://localhost:3000';
export const HTTP = axios.create({ baseURL });