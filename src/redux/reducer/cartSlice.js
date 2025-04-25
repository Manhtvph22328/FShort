import { createSlice } from '@reduxjs/toolkit';
import { getCart, addToCart, updateCart } from '../action/cartAction'; // Đảm bảo bạn có action updateCart

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    orderSuccess: (state) => {
      state.cart.products = state.cart.products.filter(item => item.checked === false);
    },
    removeCart: (state) => {
      state.cart = [];
    }

  },
  extraReducers: builder => {
    builder
      // GET CART
      .addCase(getCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Giỏ hàng từ API
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi tải giỏ hàng.';
      })

      // ADD TO CART
      .addCase(addToCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ.';
      })

      // UPDATE CART (ví dụ: thay đổi số lượng hoặc cập nhật trạng thái đã chọn)
      .addCase(updateCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi cập nhật giỏ hàng.';
      });
  },
});
export const { orderSuccess, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
