import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slices/add-cart/addCartSlices';
import productReducer from "../slices/products-2/ProductSlice";

export const store = configureStore({
    reducer: {
      counter: counterReducer,
      product: productReducer, // Correct key
    },
  });
