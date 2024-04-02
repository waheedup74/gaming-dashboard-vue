import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
// const baseUrl = config.VUE_APP_API_URL; // || process.env.VUE_APP_API_URL;

const instance = axios.create({
  baseURL:  'http://localhost:5183',
  withCredentials: false, // TODO get from config
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const authStore = useAuthStore();

    if (error.response && error.response.config && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken != null) {
        try {
          const response = await instance({
            method: 'post',
            url: '/user/refresh-token',
            data: {
              refreshToken: refreshToken,
            }
          });

          localStorage.setItem('authToken', response.data.jwt);
          instance.defaults.headers.common['Authorization'] = `bearer ${response.data.jwt}`;
          error.config.headers['Authorization'] = `bearer ${response.data.jwt}`;
        } catch (error) {
          authStore.logout();
        }
      }
      else {
        authStore.logout();
      }
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;