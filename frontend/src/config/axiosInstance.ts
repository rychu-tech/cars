import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = Cookies.get('token');

    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
      if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const refreshToken = Cookies.get('refreshToken');
            if (refreshToken != null) {
              const res = await axios.post(`${baseURL}/auth/refresh`, 
                { 
                  'refresh_token': refreshToken 
                }
              );
              if (res.status === 200) {
                originalRequest.headers['Authorization'] = `Bearer ${Cookies.get('refreshToken')}`;
                return axiosInstance(originalRequest);
              }
            }
        } catch (refreshError) {
          console.error('Unable to refresh token:', refreshError);
          await axios.post(`${baseURL}/auth/logout`, 
          { 
              'access_token': Cookies.get('token'),
              'refresh_token': Cookies.get('refreshToken')
          });
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
