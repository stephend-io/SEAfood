import { useSelector } from 'react-redux'
import { getCartItems, getTotalCartItems, selectCartState } from '@/store/cartSlice'

const Cart = () => {
  const totalItems = useSelector(getTotalCartItems)
  const cartItems = useSelector(getCartItems)
  return <div className="h-full w-full bg-green-200">{JSON.stringify({ cartItems })}</div>
}
export default Cart
