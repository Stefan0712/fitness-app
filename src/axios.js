import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = '69420';
  return config;
});

export default axiosInstance;
