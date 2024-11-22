import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
