import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/add-cart/addCartSlices'

export const store = configureStore({
    reducer:{
        counter: counterReducer,
    },
});