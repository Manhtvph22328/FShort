// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.3.2:5000/api', // Đảm bảo đúng với địa chỉ của backend
});

export default api;
