import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import performaceReducer from "./slices/performance-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    performances: performaceReducer,
  },
});
