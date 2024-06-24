// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
