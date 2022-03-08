import axios from 'axios';
import { appContext } from '~/configs/appContext';

export const API = axios.create({
  baseURL: appContext.api,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }
});

API.interceptors.request.use(
  async config => {
    const { token } = await JSON.parse(localStorage.getItem('userInfo'))

    if (!token) {
      return config
    }
    
    config.headers["Authorization"] = "bearer " + token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
