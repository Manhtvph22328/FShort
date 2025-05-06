// actions/wishlistAction.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { Alert } from 'react-native';

export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (_, thunkAPI) => {
    try {
        const response = await api.get('/wishlist/getWishlist');

        // ✅ Log kiểm tra
        console.log('FULL RESPONSE:', response);

        // ✅ Dùng trực tiếp response (vì response.data === undefined)
        if (response && response.wishlist) {
            const wishlist = response.wishlist;

            if (Array.isArray(wishlist.products)) {
                // Alert.alert('Thông báo', 'Đã thêm sản phẩm vào danh sách yêu thích');
                console.log('Dữ liệu wishlist hợp lệ:', wishlist);
                return wishlist.products;
            } else {
                throw new Error('Dữ liệu wishlist không hợp lệ (products không phải là mảng)');
            }
        } else {
            throw new Error('Dữ liệu phản hồi từ API không hợp lệ (wishlist bị thiếu)');
        }
    } catch (error) {
        console.log("** API Error:", error);
        let errorMessage = "Đã xảy ra lỗi khi lấy wishlist";

        if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
        } else if (error?.message) {
            errorMessage = error.message;
        }

        console.log("Lỗi lấy wishlist:", errorMessage);
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// ADD TO WISHLIST
export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId, thunkAPI) => {
    try {
        const response = await api.post(`/wishlist/addToWishlist/${productId}`);
        const wishlist = response.wishlist;

        // Kiểm tra xem wishlist có chứa mảng products không
        if (Array.isArray(wishlist?.products)) {
            return wishlist; // Trả về wishlist hợp lệ
        } else {
            throw new Error('Dữ liệu wishlist không hợp lệ');
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Lỗi thêm wishlist');
    }
});



// DELETE FROM WISHLIST
export const removeFromWishlist = createAsyncThunk('wishlist/deleteWishlist', async (productId, thunkAPI) => {
    try {
        const response = await api.delete(`/wishlist/deleteWishlist/${productId}`);

        const wishlist = response.wishlist;

        if (Array.isArray(wishlist.products)) {
            Alert.alert('Thông báo', 'Đã xóa sản phẩm khỏi danh sách yêu thích');
            return wishlist.products;
        } else {
            console.error('Dữ liệu wishlist không hợp lệ:', wishlist);
            throw new Error('Dữ liệu wishlist không hợp lệ (products không phải là mảng)');
        }
    } catch (error) {
        console.error('Lỗi xóa wishlist:', error);
        return thunkAPI.rejectWithValue(error.message || 'Lỗi xóa wishlist');
    }
});
