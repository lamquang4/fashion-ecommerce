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

store.subscribe(() => {
  const state = store.getState();
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.cartSlice));
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlistSlice));
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
