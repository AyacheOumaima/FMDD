import axios from 'axios';
import { API_BASE_URL, SANCTUM_COOKIE_URL } from './api.config';

const axiosAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

axiosAuth.getCsrf = () => axiosAuth.get(SANCTUM_COOKIE_URL);

export default axiosAuth;
