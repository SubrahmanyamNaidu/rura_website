import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payload: [], // holds the cart items
  cartPrice: 0, // total cart price
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, measurement } = action.payload;
      const existingItem = state.payload.find(
        (item) => item.productId === productId && item.measurement === measurement
      );

      if (existingItem) {
        // If item exists in cart, just update the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Add new item to cart
        state.payload.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      const { productId, measurement } = action.payload;
      state.payload = state.payload.filter(
        (item) => !(item.productId === productId && item.measurement === measurement)
      );
    },

    incrementQuantity: (state, action) => {
      const { productId, measurement, quantity } = action.payload;
      const item = state.payload.find(
        (item) => item.productId === productId && item.measurement === measurement
      );

      if (item) {
        item.quantity = quantity; // Update quantity
      }
    },

    decrementQuantity: (state, action) => {
      const { productId, measurement, quantity } = action.payload;
      const item = state.payload.find(
        (item) => item.productId === productId && item.measurement === measurement
      );

      if (item && item.quantity > 1) {
        item.quantity = quantity; // Update quantity
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
