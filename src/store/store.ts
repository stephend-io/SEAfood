import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit'
import { authSlice } from './authSlice'
import { cartSlice } from './cartSlice'
import { createWrapper } from 'next-redux-wrapper'
import { persistReducer, persistStore } from 'redux-persist'
import { menuSlice } from './menuSlice'
// import storage from 'redux-persist/lib/storage'

// Fix from https://github.com/rt2zz/redux-persist/issues/1208
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [menuSlice.name]: menuSlice.reducer,
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })

export const makeStore = () => {
  const storage = typeof window === 'undefined' ? createNoopStorage() : require('redux-persist/lib/storage').default
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return makeConfiguredStore()
  } else {
    // we need it only on client side

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['auth'], // make sure it does not clash with server keys
      // storage: require('redux-persist/lib/storage').default,
      storage: createNoopStorage(),
    }

    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'production',
    })

    store.__persistor = persistStore(store) // Nasty hack

    return store
  }
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore)
