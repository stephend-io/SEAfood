import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'
import { CartItem, OrderType } from '../../types'

export interface CartState {
  cartItems: OrderType
  totalCartItems: number
}

const initialState: CartState = {
  // cartState: false,
  cartItems: [],
  totalCartItems: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload
    },
    setCartTotal(state, action) {
      state.totalCartItems = action.payload
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      state.cartItems.push(action.payload)
      state.totalCartItems += action.payload.item.quantity
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      }
    },
  },
})

export const { setCartItems, setCartTotal, addToCart } = cartSlice.actions
export const actions = cartSlice.actions

export const selectCartState = (state: AppState) => state.cart?.cartState
export const getTotalCartItems = (state: AppState) => state.cart?.totalCartItems
export const getCartItems = (state: AppState) => state.cart?.cartItems

export default cartSlice.reducer
