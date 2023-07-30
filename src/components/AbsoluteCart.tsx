import { get } from 'idb-keyval'
import { useState, useEffect, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, getTotalCartItems, selectCartState } from '@/store/cartSlice'
import { CartItem, CartType, OrderType } from '../../types'
import Image from 'next/image'

// type Props = {}
// const AbsoluteCart = (props: Props) => {
//   const totalItems = useSelector(getTotalCartItems)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     ;(async () => {
//       const res = (await get('a2a-cart')) as OrderType
//       if (res) {
//         dispatch(setCartItems(res))
//         dispatch(setCartTotal(Object.keys(res).length))
//       }
//     })()
//   }, [])
//   return <div className="absolute bottom-4 right-4 z-[51] bg-red-300 p-8">{totalItems}</div>

// }

const AbsoluteCart = () => {
  const totalItems = useSelector(getTotalCartItems)
  const cartItems = useSelector(getCartItems) as OrderType
  // const test: Record<string, string> = {}
  const [foodItems, setFoodItems] = useState<CartType>({})
  const [toggled, setToggled] = useState(false)
  useEffect(() => {
    function escapeCallback(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setToggled(false)
      }
    }

    if (toggled) {
      window.addEventListener('keydown', escapeCallback)
    }
    return () => window.removeEventListener('keydown', escapeCallback)
  }, [toggled])

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

  if (toggled)
    return (
      // <div className="sticky bottom-0 right-0 z-50 h-screen w-screen bg-red-300" onClick={() => setToggled(false)}>
      <div
        className={`${
          toggled ? 'max-h-[600px] min-h-[300px] min-w-[300px] ' : 'min-h-0 '
        } fixed bottom-2 right-2 z-[51]  overflow-scroll border-4 border-secondary  bg-primary shadow-2xl transition-[max-height] duration-[400ms] ease-linear scrollbar-hide`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sticky top-0  h-6 w-full bg-primary px-4" onClick={() => setToggled(false)}>
          {/* <div className=""> */}
          <Image fill alt={`down icon`} src={`icons/Chevron-Left.svg`} className="-rotate-90" />
          {/* </div> */}
        </button>
        <div className="px-4 pt-2">
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
      </div>
    )
  return (
    <div className="fixed bottom-2 right-2 z-[51] h-12 w-12 ">
      deez
      <button onClick={() => setToggled(true)}>
        {/* <Image width={20} height={20} alt={`down icon`} src={`icons/Shopping-cart.svg`} /> */}
        <Image fill alt={`down icon`} src={`icons/Shopping-cart.svg`} />
        {totalItems > 0 && <div className="absolute right-0 top-0 flex h-5  w-5 items-center justify-center rounded-full bg-secondary font-black text-primary">{totalItems}</div>}
      </button>
    </div>
  )
}
export default AbsoluteCart
