import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import wishlistSlice from "./features/wishlistSlice";

export const store = configureStore({
  reducer: {
    cartSlice,
    wishlistSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
