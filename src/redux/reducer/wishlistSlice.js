import { createSlice } from '@reduxjs/toolkit';
import { getWishlist, addToWishlist, removeFromWishlist } from '../action/wishlistAction';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload; // Expecting an array
            })

            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.wishlist = action.payload; // Cập nhật wishlist
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.error = action.payload; // Cập nhật lỗi nếu có
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = action.payload; // Expecting wishlist.products
            })


    },
});

export default wishlistSlice.reducer;
