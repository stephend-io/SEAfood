import { get } from 'idb-keyval'
import { useState, useEffect } from 'react'
import { OrderType } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalCartItems, selectCartState, setCartItems, setCartTotal } from '@/store/cartSlice'

type Props = {}
const AbsoluteCart = (props: Props) => {
  const totalItems = useSelector(getTotalCartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      const res = (await get('a2a-cart')) as OrderType
      if (res) {
        dispatch(setCartItems(res))
        dispatch(setCartTotal(Object.keys(res).length))
      }
    })()
  }, [])
  return <div className="absolute bottom-4 right-4 z-[51] bg-red-300 p-8">{totalItems}</div>
}
export default AbsoluteCart
