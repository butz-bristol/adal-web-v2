import axios from 'axios';
import {
  getTokenFromLocalStorage,
  getUserFromLocalStorage,
} from './localStorage';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const adalFetch = axios.create({
  baseURL: apiBaseUrl,
});

adalFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    const token = getTokenFromLocalStorage();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login';
  }
  return Promise.reject(error);
};

export default adalFetch;
