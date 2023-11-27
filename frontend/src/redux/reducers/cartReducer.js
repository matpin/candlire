import { createReducer } from '@reduxjs/toolkit';
import { updateCartCount, increaseCartCount, decreaseCartCount, resetCartCount } from '../actions/cartActions';

const initialState = {
  count: 0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCartCount, (state, action) => {
    state.count = action.payload;
  });
  builder.addCase(increaseCartCount, (state, action) => {
    state.count += action.payload;
  });
  builder.addCase(decreaseCartCount, (state, action) => {
    state.count -= action.payload;
  });
  builder.addCase(resetCartCount, (state, action) => {
    state.count = 0;
  });
});

export default cartReducer;