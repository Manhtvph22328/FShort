import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../reducer/userSlice';
import cartSlice from '../reducer/cartSlice';
import orderSlice from '../reducer/orderSlice';

export default configureStore({
  reducer: {
    user : userSlice,
    cart: cartSlice,
    order : orderSlice,
  }
})
