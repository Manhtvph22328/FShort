import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../reducer/userSlice';
import cartSlice from '../reducer/cartSlice';
import orderSlice from '../reducer/orderSlice';
import wishlistReducer from '../reducer/wishlistSlice';
import informationReducer from '../reducer/informationReducer';

export default configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    order: orderSlice,
    wishlist: wishlistReducer,
    information : informationReducer
  }
})
