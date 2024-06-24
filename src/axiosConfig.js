import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL || '/api';

console.log(`Axios base URL: ${baseURL}`); // Log the base URL being used

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Starting Request', JSON.stringify(config, null, 2));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  },
  (error) => {
    console.log('Error Response:', JSON.stringify(error.response, null, 2));
    return Promise.reject(error);
  }
);

export default instance;
