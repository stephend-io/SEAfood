import { get } from 'idb-keyval'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, getTotalCartItems, selectCartState } from '@/store/cartSlice'
import { CartItem, CartType, OrderType } from '../../types'
import Image from 'next/image'

const AbsoluteFilter = () => {
  const totalItems = useSelector(getTotalCartItems)
  const cartItems = useSelector(getCartItems) as OrderType
  // const test: Record<string, string> = {}
  const [foodItems, setFoodItems] = useState<CartType>({})
  const [toggled, setToggled] = useState(false)

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
    <div className={`${!toggled ? 'fixed bottom-2 right-2 z-[51] h-12 w-12' : 'fixed bottom-2 right-2 z-[51] max-h-[600px] min-h-[300px] min-w-[300px] bg-white p-4 shadow-2xl'} `}>
      {toggled ? (
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
      ) : (
        <button onClick={() => setToggled(true)}>
          {/* <Image width={20} height={20} alt={`down icon`} src={`icons/Shopping-cart.svg`} /> */}
          <Image fill alt={`down icon`} src={`icons/Shopping-cart.svg`} />
          {totalItems > 0 && <div className="absolute right-0 top-0 flex h-5  w-5 items-center justify-center rounded-full bg-secondary font-black text-primary">{totalItems}</div>}
        </button>
      )}
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
export default AbsoluteFilter
