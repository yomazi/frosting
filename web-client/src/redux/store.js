import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import performaceReducer from "./slices/performanceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performaceReducer,
  },
});
