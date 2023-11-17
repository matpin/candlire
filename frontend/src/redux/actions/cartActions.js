import { createAction } from '@reduxjs/toolkit';

export const updateCartCount = createAction('UPDATE_CART_COUNT');

export const increaseCartCount = createAction('INCREASE_CART_COUNT');

export const decreaseCartCount = createAction('DECREASE_CART_COUNT');

export const resetCartCount = createAction('RESET_CART_COUNT');