// actions/cartAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import {Alert} from 'react-native';

// GET CART
export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
  try {
    const response = await api.get('/cart/getCart');
    return response.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});
export const updateCart = createAsyncThunk(
  'cart/update',
  async ({ itemId, quantity, checked }, thunkAPI) => {
    try {
      const response = await api.put('/cart/updateCart', {
        productInCart: itemId,
        quantity,
        checked,
      });

      return response.cart; // Return dữ liệu từ API (cart updated) để Redux lưu trữ.
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể cập nhật giỏ hàng');
      console.error('API updateCart lỗi:', error);
      return thunkAPI.rejectWithValue(error.message); // Trả về lỗi nếu có
    }
  }
);


// ADD TO CART
export const addToCart = createAsyncThunk('cart/addToCart', async (data, thunkAPI) => {
  try {
    const response = await api.post('/cart/addToCart', {
      productId: data.productId,
      color: data.color,
      quantity: data.quantity,
      size: data.size
    });
    if (response.cart) {
      Alert.alert('Thông báo','Thêm vào giỏ hàng thành công');
    }
    return response.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi thêm vào giỏ hàng');
  }
});

