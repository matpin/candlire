import { createReducer } from '@reduxjs/toolkit';
import { updateCartCount, increaseCartCount, decreaseCartCount, resetCartCount } from '../actions/cartActions';

const initialState = {
  count: 0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCartCount, (state, action) => {
    console.log("Updating cart count in reducer:", action.payload);
    state.count = action.payload;
  });
  builder.addCase(increaseCartCount, (state, action) => {
    console.log("Increase cart count in reducer by:", action.payload);
    state.count += action.payload;
  });
  builder.addCase(decreaseCartCount, (state, action) => {
    console.log("Decrease cart count in reducer by:", action.payload);
    state.count -= action.payload;
  });
  builder.addCase(resetCartCount, (state, action) => {
    console.log("Decrease cart count in reducer by:", action.payload);
    state.count = 0;
  });
});

export default cartReducer;