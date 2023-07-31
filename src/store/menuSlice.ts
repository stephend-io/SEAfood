import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppState } from './store'
import { HYDRATE } from 'next-redux-wrapper'
import { OrderType } from '../../types'

export interface menuState {
  selectedItemId?: string
}

const initialState: menuState = {}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedMenuItem(state, action: PayloadAction<string>) {
      state.selectedItemId = action.payload
    },
    clearSelectedMenuItem(state) {
      alert('current menuItem is: ' + state.selectedItemId)
      state.selectedItemId = undefined
    },
    // setmenuItems(state, action) {
    //   state.menuItems = action.payload
    // },
    // setmenuTotal(state, action) {
    //   state.totalmenuItems = action.payload
    // },
    // addTomenu(state, action: PayloadAction<menuItem>) {
    //   state.menuItems.push(action.payload)
    //   state.totalmenuItems += action.payload.quantity
    // },
    // setmenu(state, action: PayloadAction<boolean>) {
    //   state.menuShown = action.payload
    // },
    // togglemenu(state) {
    //   state.menuShown = !state.menuShown
    // },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.menu,
      }
    },
  },
})

export const { setSelectedMenuItem, clearSelectedMenuItem } = menuSlice.actions
export const actions = menuSlice.actions
export const getSelectedMenuItem = (state: AppState) => state.menu?.selectedItemId

// export const selectmenuState = (state: AppState) => state.menu?.menuState
// export const getTotalmenuItems = (state: AppState) => state.menu?.totalmenuItems
// export const getmenuItems = (state: AppState) => state.menu?.menuItems
// export const getmenuShown = (state: AppState) => state.menu?.menuShown

export default menuSlice.reducer
