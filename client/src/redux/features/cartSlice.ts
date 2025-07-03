import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
  slug: string;
  inventory: {
    size: {
      _id: string;
      namesize: string;
    };
    color: {
      _id: string;
      namecolor: string;
    };
    quantity: number;
  };
}

export interface CartState {
  productsInCart: Product[];
  total: number;
}

const initialState: CartState = {
  productsInCart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.productsInCart.find(
        (product) =>
          product._id === action.payload._id &&
          product.inventory.size._id === action.payload.inventory.size._id &&
          product.inventory.color._id === action.payload.inventory.color._id
      );

      if (existingProduct) {
        existingProduct.inventory.quantity += action.payload.inventory.quantity;
      } else {
        state.productsInCart.push(action.payload);
      }

      // Cập nhật tổng tiền
      const total = state.productsInCart.reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.inventory.quantity;
      }, 0);

      state.total = total;
    },

    // Xoá sản phẩm khỏi giỏ
    removeItemFromCart: (
      state,
      action: PayloadAction<{ _id: string; sizeId: string; colorId: string }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) =>
          !(
            product._id === action.payload._id &&
            product.inventory.size._id === action.payload.sizeId &&
            product.inventory.color._id === action.payload.colorId
          )
      );

      // Cập nhật lại total
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.inventory.quantity;
      }, 0);
    },

    changeItemQuantity: (
      state,
      action: PayloadAction<{
        _id: string;
        sizeId: string;
        colorId: string;
        quantity: number;
      }>
    ) => {
      const product = state.productsInCart.find(
        (item) =>
          item._id === action.payload._id &&
          item.inventory.size._id === action.payload.sizeId &&
          item.inventory.color._id === action.payload.colorId
      );

      if (product) {
        product.inventory.quantity = action.payload.quantity;

        if (product.inventory.quantity <= 0) {
          // Tự xoá nếu số lượng <= 0
          state.productsInCart = state.productsInCart.filter(
            (item) =>
              !(
                item._id === action.payload._id &&
                item.inventory.size._id === action.payload.sizeId &&
                item.inventory.color._id === action.payload.colorId
              )
          );
        }
      }

      // Cập nhật tổng
      state.total = state.productsInCart.reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.inventory.quantity;
      }, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, changeItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
