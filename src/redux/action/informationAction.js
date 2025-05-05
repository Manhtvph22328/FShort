import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';

export const getInformation = createAsyncThunk('information/getInforByUser', async (_, thunkAPI) => {
  try {
    const response = await api.get('/information/getInforByUser');
    console.log(response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});


export const addInformation = createAsyncThunk('information/addInformation', async (data, thunkAPI) => {
  try {
    const response = await api.post('/information/addInfor',{
      name : data.information.name,
      address : data.information.address,
      phoneNumber : data.information.phoneNumber,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});

export const updateInformation = createAsyncThunk('information/updateInformation', async (data, thunkAPI) => {
  try {
    const response = await api.put(`/information/updateInfor/${data._id}`,{
      name : data.information.name,
      address : data.information.address,
      phoneNumber : data.information.phoneNumber,
    });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});

export const setCheckedInformation = createAsyncThunk('information/setCheckedInformation', async (id, thunkAPI) => {
  try {
     await api.put(`/information/setChecked/${id}`)
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});


export const deleteInformation = createAsyncThunk('information/deleteInformation', async (id, thunkAPI) => {
  try {
    await api.put(`/information/deleteInfor/${id}`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.message || 'Lỗi lấy giỏ hàng');
  }
});
