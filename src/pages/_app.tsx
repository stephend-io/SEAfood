import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'

function App({ Component, ...rest }: AppProps) {
  // const store: any = useStore()
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...props} />
    </PersistGate>
  )
}

export default wrapper.withRedux(App)
