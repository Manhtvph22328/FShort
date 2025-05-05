import { createSlice } from '@reduxjs/toolkit';
import {
  addInformation,
  deleteInformation,
  getInformation,
  setCheckedInformation,
  updateInformation,
} from '../action/informationAction';

const informationSlice = createSlice({
  name: 'information',
  initialState: {
    information: [],
    loading: false,
    error: null,
  },
  reducers : {},
  extraReducers: builder => {
    // getInformation
    builder
    .addCase(getInformation.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(getInformation.fulfilled, (state, action) => {
      state.loading = false;
      state.information = action.payload; // nhớ check response.data từ API
    })
    .addCase(getInformation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // addInformation
    .addCase(addInformation.fulfilled, (state, action) => {
      state.information.push(action.payload);
    })

    // updateInformation
    .addCase(updateInformation.fulfilled, (state, action) => {
      const index = state.information.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.information[index] = action.payload;
      }
    })
    // deleteInformation
      .addCase(setCheckedInformation.fulfilled, (state, action) => {
        const id = action.payload;
        state.information = state.information.map(item => ({
          ...item,
          checked: item._id === id,  // set true cho item có _id trùng, false cho các item còn lại
        }));
      })
  }
});

export default informationSlice.reducer;
