import axios from 'axios';
import {
  getStudentFromLocalStorage,
  getStudentTokenFromLocalStorage,
} from './localStorage';

const apiBaseUrl = import.meta.env.VITE_API_URL;

const studentFetch = axios.create({
  baseURL: apiBaseUrl,
});

studentFetch.interceptors.request.use((config) => {
  const student = getStudentFromLocalStorage();
  if (student) {
    const token = getStudentTokenFromLocalStorage();
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

export default studentFetch;
