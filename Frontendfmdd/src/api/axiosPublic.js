import axios from 'axios';
import { API_BASE_URL } from './api.config';

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default axiosPublic;
