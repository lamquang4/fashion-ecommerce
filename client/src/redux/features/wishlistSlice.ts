import { ProductInWishlist, Wishlist } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Wishlist = {
  productsInWishlist: [],
  isLoading: false,
};

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
    hideLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, hideLoading } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
