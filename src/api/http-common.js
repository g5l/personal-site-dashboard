import axios from 'axios';

const baseURL = process.env.API_PATH || 'http://localhost:3030';
export const HTTP = axios.create({ baseURL });