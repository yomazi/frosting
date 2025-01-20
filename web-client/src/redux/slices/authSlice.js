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
      console.log("LOGIN");
      console.log(state.user);
      state.isLoading = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      console.log("LOGOUT");
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
