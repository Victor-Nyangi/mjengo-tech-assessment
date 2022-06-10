import axios from 'axios';

const getToken = () => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
  };

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers: { Authorization: `Bearer ${getToken()}` }
});
export default apiClient;


