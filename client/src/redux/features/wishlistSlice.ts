import { ProductInWishlist, Wishlist } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const wishlistLocalStorage = (): Wishlist => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("wishlist");
    if (data) {
      return JSON.parse(data);
    }
  }
  return {
    productsInWishlist: [],
  };
};

const initialState: Wishlist = wishlistLocalStorage();

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<ProductInWishlist>) => {
      const existingProduct = state.productsInWishlist.find(
        (product) => product._id === action.payload._id
      );

      if (!existingProduct) {
        state.productsInWishlist.push(action.payload);
      }
    },

    removeItemFromWishlist: (state, action: PayloadAction<{ _id: string }>) => {
      state.productsInWishlist = state.productsInWishlist.filter(
        (product) => product._id !== action.payload._id
      );
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
