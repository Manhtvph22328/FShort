import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    accessToken: "",
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLogin = !!action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = "";
      state.isLogin = false;
    },
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
