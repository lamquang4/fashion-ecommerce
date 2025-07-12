import { ProductInWishlist, Wishlist } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const items = localStorage.getItem("wishlist");
const wishlist = items ? JSON.parse(items) : null;

const initialState: Wishlist = {
  productsInWishlist: wishlist?.productsInWishlist || [],
  isLoading: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<ProductInWishlist>) => {
      const existingProduct = state.productsInWishlist.find(
        (product) =>
          product._id === action.payload._id &&
          product.variant._id === action.payload.variant._id
      );

      if (!existingProduct) {
        state.productsInWishlist.push(action.payload);
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          productsInWishlist: state.productsInWishlist,
        })
      );
    },

    removeItemFromWishlist: (
      state,
      action: PayloadAction<{ _id: string; variantId: string }>
    ) => {
      state.productsInWishlist = state.productsInWishlist.filter(
        (product) =>
          !(
            product._id === action.payload._id &&
            product.variant._id === action.payload.variantId
          )
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify({
          productsInWishlist: state.productsInWishlist,
        })
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
