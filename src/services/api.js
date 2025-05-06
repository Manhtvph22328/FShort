import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

const API_BASE_URL = 'https://33cc-2401-d800-7c20-7ae4-5510-2822-5d34-a40c.ngrok-free.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Lỗi API:", error.response?.data || error.message);
    Alert.alert('Thông báo', error.response.data.message)
    return Promise.reject(error.response?.data || "Lỗi server!");
  }
);

export default api;
