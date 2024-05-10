import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('accessToken');

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
            const res = await axios.post(`${baseURL}/auth/refresh`, 
            { 
                'refresh_token': sessionStorage.getItem("refreshToken") 
            }
        );
          if (res.status === 200) {
            const newAccessToken = res.data.access_token;
            const newRefreshToken = res.data.refresh_token;
            sessionStorage.setItem('accessToken', newAccessToken);
            sessionStorage.setItem('refreshToken', newRefreshToken);
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Unable to refresh token:', refreshError);
          await axios.post('/auth/logout', 
          { 
              'access_token': sessionStorage.getItem("accessToken"), 
              'refresh_token': sessionStorage.getItem("refreshToken") 
          });
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
