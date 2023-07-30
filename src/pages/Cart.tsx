import { useSelector } from 'react-redux'
import { getCartItems, getTotalCartItems, selectCartState } from '@/store/cartSlice'
import { CartItem, CartType, OrderType } from '../../types'
import { useEffect, useState } from 'react'

const Cart = () => {
  const totalItems = useSelector(getTotalCartItems)
  const cartItems = useSelector(getCartItems) as OrderType
  // const test: Record<string, string> = {}
  const [foodItems, setFoodItems] = useState<CartType>({})

  useEffect(() => {
    const tempFoodItem: CartType = {}

    cartItems.map((cartItem) => {
      if (tempFoodItem[cartItem.type]) {
        tempFoodItem[cartItem.type].push(cartItem)
      } else {
        tempFoodItem[cartItem.type] = [cartItem]
      }
    })

    setFoodItems(tempFoodItem)
  }, [cartItems])

  return (
    <div className="flex h-full w-full flex-wrap overflow-scroll p-4">
      <div className="w-1/3">
        {Object.entries(foodItems).map((category, index) => {
          const [categoryName, categoryValue] = category
          return (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{categoryName}s</div>
              {categoryValue.map((item) => {
                return (
                  <div className="flex justify-between">
                    <div className="w-1/3">{item.name}</div>
                    {/* <div>{JSON.stringify(item)}</div> */}
                    <div className="">{item.price}</div>
                    <div>${item.quantity * item.price}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="w-1/2 bg-secondary text-primary">Total</div>
      {/* {foodItems.map((item) => {
        return (
          <div>
            item name:
            {JSON.stringify(item)}
            {item.name}
          </div>
        )
      })} */}
    </div>
  )
}
export default Cart
