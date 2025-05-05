import { createSlice } from '@reduxjs/toolkit';
import {cancelOrder, createOrder, getOrdersByStatus} from '../action/orderAction';

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Nếu sau này có các reducers đồng bộ thì thêm ở đây
  },
  extraReducers: (builder) => {
    // --- Create Order ---
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // --- Get Orders by Status ---
    builder
      .addCase(getOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(cancelOrder.fulfilled, (state, action) => {
        // Cập nhật trạng thái đơn hàng trong state (nếu bạn lưu danh sách orders)
        const updatedOrder = action.payload.order;
        const index = state.orders.findIndex(order => order._id === updatedOrder._id);
        if (index !== -1) {
          state.orders.splice(index, 1);
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
