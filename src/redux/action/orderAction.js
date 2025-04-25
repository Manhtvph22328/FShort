import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Alert } from 'react-native';
import {getCart} from './cartAction';

// Tạo đơn hàng
export const createOrder = createAsyncThunk('order/createOrder', async (orderData, thunkAPI) => {
  try {
    const {shippingAddress, paymentMethod} = orderData;
    const response = await api.post('/order/create', {
      shippingAddress,
      paymentMethod,
    }); // POST /orders
    thunkAPI.dispatch(getCart())
    return response.order;
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể tạo đơn hàng');
    console.error('Lỗi createOrder:', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Lỗi tạo đơn hàng');
  }
});

// Lấy đơn hàng theo trạng thái
export const getOrdersByStatus = createAsyncThunk('order/getOrdersByStatus', async (status, thunkAPI) => {
  try {
    const response = await api.get(`/order/getByStatus`,{
      params : {
        status,
      }
    }); // GET /orders?status=
    return response.orders;
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể lấy đơn hàng');
    console.error('Lỗi getOrdersByStatus:', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Lỗi lấy đơn hàng');
  }
});

// Hủy đơn hàng theo ID
export const cancelOrder = createAsyncThunk('order/cancelOrder', async (orderId, thunkAPI) => {
  try {
    const response = await api.put('/order/cancelOrder',{
      orderId,
    });
    return response; // Trả về đơn hàng đã được cập nhật
  } catch (error) {
    Alert.alert('Lỗi', 'Không thể hủy đơn hàng');
    console.error('Lỗi cancelOrder:', error);
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Lỗi hủy đơn hàng');
  }
});

export const payment = createAsyncThunk('momo/payment', async (data, thunkAPI) => {
  try {
    const response = await api.post('momo/payment', {
      priceProduct : data.priceProduct,
      rawOrderId  : data.rawOrderId,
      idOrder : data.idOrder,
    });

    // Kiểm tra kết quả trả về từ MoMo
    if (response && response.resultCode === 0) {
      // Trả về URL thanh toán để mở webview hoặc deep link
      return response.payUrl;
    } else {
      Alert.alert('Thông báo','Thanh toán thất bại vui lòng chọn phương thức thanh toán khác')
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Lỗi khi gọi API thanh toán');
  }
});

