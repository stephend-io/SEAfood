import { get } from 'idb-keyval'
import { useState, useEffect, use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, getCartShown, getTotalCartItems, selectCartState, setCart, toggleCart } from '@/store/cartSlice'
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
  const [total, setTotal] = useState(0)
  // const test: Record<string, string> = {}
  const [foodItems, setFoodItems] = useState<CartType>({})
  // const [toggled, setToggled] = useState(false)
  const toggled = useSelector(getCartShown)
  const dispatch = useDispatch()

  useEffect(() => {
    function escapeCallback(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        // setToggled(false)
        // alert('Escape hit')
        dispatch(setCart(true))
      }
    }

    if (toggled) {
      window.addEventListener('keydown', escapeCallback)
    }
    return () => window.removeEventListener('keydown', escapeCallback)
  }, [toggled])

  useEffect(() => {
    const tempFoodItem: CartType = {}
    let tempTotal = 0

    cartItems.map((cartItem) => {
      tempTotal += cartItem.quantity * cartItem.price
      if (tempFoodItem[cartItem.type]) {
        tempFoodItem[cartItem.type].push(cartItem)
      } else {
        tempFoodItem[cartItem.type] = [cartItem]
      }
    })

    setFoodItems(tempFoodItem)
    setTotal(Number(tempTotal.toFixed(2)))
  }, [cartItems])

  // if (toggled)
  return (
    <div
      className={`fixed bottom-2 right-2 z-[60] flex flex-col overflow-scroll border-4 border-secondary bg-primary text-secondary  shadow-2xl  transition-[max-height] duration-[400ms] ease-linear scrollbar-hide ${
        !toggled ? 'max-h-[70%] min-h-0  max-w-[70%] ' : 'max-h-[0] max-w-[0] '
      } transition-all duration-500 ease-linear`}
      onClick={() => dispatch(toggleCart())}
    >
      <div className="min-w-[300px] p-4">
        <div className="py-2 text-4xl font-black">Order:</div>
        {Object.entries(foodItems).map((category, index) => {
          const [categoryName, categoryValue] = category
          return (
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{categoryName}s</div>
              {categoryValue.map((item) => {
                return (
                  <div className="flex justify-between">
                    <div className="w-3/4">
                      {item.name} {item.quantity > 1 && `x ${item.quantity}`}
                    </div>
                    <div>${item.quantity * item.price}</div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className="font-base flex justify-between border-t-2 border-dashed border-secondary px-3 pt-3 text-xl">
        <div className="">Subtotal:</div>
        <div className="">{total}</div>
      </div>
      <div className="font-base flex justify-between px-3 text-xl">
        <div className="">Tax:</div>
        <div className="">{(total * 0.13).toFixed(2)}</div>
      </div>

      <div className="flex justify-between px-3 pb-6 text-2xl font-black">
        <div className="">Total:</div>
        <div className="">{Number(total + total * 0.13).toFixed(2)}</div>
      </div>
      {/* <div className="border-b-2 border-secondary">Total:</div> */}
    </div>
  )
}

export function CartToo() {
  const dispatch = useDispatch()
  const totalItems = useSelector(getTotalCartItems)

  return (
    <div className="fixed bottom-4 right-[0.1rem] z-[61] h-[2rem] hover:opacity-80 active:opacity-100 active:saturate-150">
      <button
        onClick={() => {
          // alert('clicked')
          dispatch(toggleCart())
        }}
        // className={`absolute right-0 top-0 h-12 w-12 `}
        className={`relative h-12 w-12`}
      >
        <Image fill alt={`down icon`} src={`icons/Shopping-cart.svg`} />
        {/* <Image width alt={`down icon`} src={`icons/Shopping-cart.svg`} /> */}
        {totalItems > 0 && <div className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-secondary   font-bold text-primary">{totalItems}</div>}
      </button>
    </div>
  )
}

export default AbsoluteCart

// <div
//   className={`${
//     toggled ? 'max-h-[600px] min-h-[300px] min-w-[300px] ' : 'max-h-[5vh] max-w-[12rem] '
//   } fixed bottom-2 right-2 z-[51]  overflow-hidden border-4 border-secondary  bg-primary shadow-2xl transition-[max-height] duration-[400ms] ease-linear scrollbar-hide`}
// >
//   <button className="sticky top-0  h-6 w-full bg-primary px-4" onClick={() => dispatch(toggleCart())}>
//     {/* <div className=""> */}
//     <Image fill alt={`down icon`} src={`icons/Chevron-Left.svg`} className="-rotate-90" />
//     {/* </div> */}
//   </button>
//   <div className="px-4 pt-2">
//     {Object.entries(foodItems).map((category, index) => {
//       const [categoryName, categoryValue] = category
//       return (
//         <div className="flex flex-col">
//           <div className="text-2xl font-bold">{categoryName}s</div>
//           {categoryValue.map((item) => {
//             return (
//               <div className="flex justify-between">
//                 <div className="w-1/3">{item.name}</div>
//                 {/* <div>{JSON.stringify(item)}</div> */}
//                 <div className="">{item.price}</div>
//                 <div>${item.quantity * item.price}</div>
//               </div>
//             )
//           })}
//         </div>
//       )
//     })}
//   </div>
// </div>

{
  /* ) */
}
{
  /* // return (
  //   <div className="fixed bottom-2 right-2 z-[51] h-12 w-12 ">
  //     deez
  //     <button onClick={() => setToggled(true)}>
  //       {/* <Image width={20} height={20} alt={`down icon`} src={`icons/Shopping-cart.svg`} /> 
  //       <Image fill alt={`down icon`} src={`icons/Shopping-cart.svg`} />
  //       {totalItems > 0 && <div className="absolute right-0 top-0 flex h-5  w-5 items-center justify-center rounded-full bg-secondary font-black text-primary">{totalItems}</div>}
  //     </button>
  //   </div>
  // ) */
}
{
  /* return ( */
}
// <div
//   className={`fixed bottom-2 right-2 z-[51] overflow-hidden bg-red-100 p-4 transition-[max-height] duration-[400ms] ease-linear ${
//     !toggled ? 'max-h-[50%]' : 'max-h-0'
//   } transition-all duration-500 ease-linear`}
//   onClick={() => dispatch(toggleCart())}
// >
//   {/* teset */}
//   {}
//   <div className="px-4 pt-2">
//     {Object.entries(foodItems).map((category, index) => {
//       const [categoryName, categoryValue] = category
//       return (
//         <div className="flex flex-col">
//           <div className="text-2xl font-bold">{categoryName}s</div>
//           {categoryValue.map((item) => {
//             return (
//               <div className="flex justify-between">
//                 <div className="w-1/3">{item.name}</div>
//                 {/* <div>{JSON.stringify(item)}</div> */}
//                 <div className="">{item.price}</div>
//                 <div>${item.quantity * item.price}</div>
//               </div>
//             )
//           })}
//         </div>
//       )
//     })}
//   </div>

{
  /* {data.foodCategories.map((category) => {
        return (
          <div className={` flex items-center justify-between gap-1 transition-all duration-200`}>
            <div className="flex items-center gap-1">
              <div>{category}</div>
              <Image width={30} height={30} alt={`icon of ${category}`} src={`/icons/${category}.svg`} />
            </div>
            <div className="h-4 w-4 rounded-sm bg-secondary"></div>
          </div>
        )
      })}
    */
}
// </div>
