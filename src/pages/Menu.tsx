import { get, set } from 'idb-keyval'
import { useEffect, useState } from 'react'
import { CartItem, MenuType } from '../../types'
import Image from 'next/image'
import { OrderType } from '../../types'
import AbsoluteCart from '@/components/AbsoluteCart'
import { useDispatch, useSelector } from 'react-redux'
import cartSlice, { actions, addToCart, getCartShown, getTotalCartItems, setCart, setCartItems } from '@/store/cartSlice'
import { getFontOverrideCss } from 'next/dist/server/font-utils'
import FoodModal from '@/components/FoodModal'
import { clearSelectedMenuItem, getSelectedMenuItem, setSelectedMenuItem } from '@/store/menuSlice'
const mockData = {
  foodCategories: ['Appetizer', 'Main', 'Drink', 'Dessert'],
  specials: {},
  aboutUs: {
    headline: '',
    secondary: '',
  },
  allergens: ['Vegetarian', 'Vegan', 'Peanuts', 'Crustaceans', 'Soy', 'Wheat', 'Fish', 'Coconut', 'Eggs', 'Nuts', 'Shellfish', 'Dairy', 'Pork', 'Seafood', 'Shrimp', 'Mollusks', 'Sesame', 'Poultry'],
  countries: ['Philippines', 'Myanmar', 'Malaysia', 'Indonesia', 'Singapore', 'Thailand', 'Vietnam', 'East Timor', 'Brunei', 'Laos', 'Cambodia'],
  specialSchedule: [
    {
      date: 29,
      month: 7,
      reason: 'Restaurant Anniversary',
      schedule: {
        open: 700,
        close: 2300,
        breaks: [
          { breakStart: 1000, breakEnd: 1130 },
          { breakStart: 1500, breakEnd: 1700 },
        ],
        comments: 'Complementary drink and appetizer with every meal',
      },
    },
  ],
  reservations: {},
  orderTime: {},
  user: {
    order: {},
    orderHistory: [],
    details: {
      address: '',
      contactNo: 0,
      email: '',
    },
  },
  cart: [{}, {}],
  contactDetails: {},
  items: [
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Gado-Gado',
      description: 'A salad made with mixed vegetables, tofu, and hard-boiled eggs, topped with peanut sauce.',
      price: 6.99,
      diet: ['Vegetarian', 'Vegan'],
      allergens: ['Peanuts'],
      id: 'IDN0',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Lumpia Semarang',
      description: 'Crispy spring rolls filled with bamboo shoots, shrimp, and chicken, served with a sweet and sour dipping sauce.',
      price: 8.99,
      diet: ['Pescatarian'],
      allergens: ['Crustaceans', 'Soy', 'Wheat'],
      id: 'IDN1',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Sate Ayam',
      description: 'Grilled chicken skewers marinated in a fragrant blend of spices, served with peanut sauce.',
      price: 9.99,
      allergens: ['Peanuts'],
      id: 'IDN2',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Siomay',
      description: 'Steamed fish and shrimp dumplings served with a spicy peanut sauce and sweet soy sauce.',
      price: 7.99,
      diet: ['Pescatarian'],
      allergens: ['Fish', 'Soy', 'Peanuts', 'Wheat'],
      id: 'IDN3',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Martabak',
      description: 'A savory stuffed pancake filled with minced meat, vegetables, and spices.',
      price: 10.99,
      allergens: ['Wheat', 'Soy'],
      id: 'IDN4',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Otak-Otak',
      description: 'Grilled fish cake made from ground fish mixed with spices and wrapped in banana leaves.',
      price: 7.99,
      diet: ['Pescatarian'],
      allergens: ['Fish', 'Coconut'],
      id: 'IDN5',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Perkedel Kentang',
      description: 'Fried potato cakes made with mashed potatoes, onions, and spices.',
      price: 5.99,
      diet: ['Vegetarian', 'Vegan'],
      id: 'IDN6',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Bakwan Jagung',
      description: 'Crispy corn fritters made with sweet corn kernels, flour, and spices.',
      price: 6.99,
      diet: ['Vegetarian'],
      id: 'IDN7',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Pempek',
      description: 'Fishcake made from ground fish and tapioca flour, served with a tangy vinegar-based sauce.',
      price: 8.99,
      diet: ['Pescatarian', 'Gluten-Free'],
      allergens: ['Fish'],
      id: 'IDN8',
    },
    {
      country: 'Indonesia',
      type: 'Appetizer',
      name: 'Rujak',
      description: 'A mixed fruit salad with a spicy tamarind dressing, often garnished with peanuts and fried shallots.',
      price: 7.99,
      diet: ['Vegetarian', 'Vegan'],
      allergens: ['Peanuts'],
      id: 'IDN9',
    },
    {
      country: 'Indonesia',
      type: 'Main',
      name: 'Nasi Goreng',
      description: 'Indonesian-style fried rice cooked with a combination of meats, vegetables, and spices, usually served with a fried egg on top.',
      price: 12.99,
      id: 'IDN10',
    },
    {
      country: 'Indonesia',
      type: 'Main',
      name: 'Rendang',
      description: 'A flavorful and spicy slow-cooked beef dish in a rich coconut-based sauce.',
      price: 15.99,
      allergens: ['Coconut'],
      id: 'IDN11',
    },
    {
      country: 'Indonesia',
      type: 'Main',
      name: 'Sate Ayam',
      description: 'Grilled chicken skewers marinated in a fragrant blend of spices, served with peanut sauce and rice cakes.',
      price: 14.99,
      allergens: ['Peanuts'],
      id: 'IDN12',
    },
  ],
}

type MenuViews = 'Menu' | 'List' | 'Card'

const Menu = () => {
  // fetched Data
  const data = mockData
  const [categoriesToggled, setCategoriesToggled] = useState(false)
  const [countriesToggled, setCountriesToggled] = useState(false)
  const [allergensToggled, setAllergensToggled] = useState(false)
  const [isSearchOffScreen, setIsSearchOffScreen] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [menuView, setMenuView] = useState<MenuViews>('Menu')
  const [hoveredItemID, setHoveredItemID] = useState('')
  const selectedMenuItemID = useSelector(getSelectedMenuItem)
  const [itemNos, setItemNos] = useState<Record<string, number>>({})
  const [selectedMenuNumberItems, setSelectedMenuNumberItems] = useState(1)

  const totalCartItems = useSelector(getTotalCartItems)
  const addToCartToo = useSelector(actions.addToCart)
  const addToCartOne = useSelector(addToCart)
  const dispatch = useDispatch()
  const toggled = useSelector(getCartShown)

  // console.log('rerendered')
  // useEffect(() => {
  // 500ms timeout is to account for component transitioning and changing sizes
  // setTimeout(() => {
  //   const filterComponent = document.querySelector('.filters-component')

  //   if (filterComponent) {
  //     const boundingRect = filterComponent.getBoundingClientRect()
  //     if (window.scrollY > boundingRect.y + boundingRect.height) {
  //       alert('off screen')
  //     }
  //   }
  // console.log(filterComponent?.getBoundingClientRect())
  // if (filterComponent?.getBoundingClientRect().y < 1920)
  // console.log(window.screen)
  //   }, 500)
  // }, [categoriesToggled, countriesToggled, allergensToggled])

  // 100ms scrolling debounce to reduce unnecessary callbacks
  let scrollTimerID: NodeJS.Timer
  useEffect(() => {
    clearTimeout(scrollTimerID)
    function callback(e: Event) {
      setTimeout(() => {
        const filterComponent = document.querySelector('.filters-component')

        if (filterComponent) {
          const boundingRect = filterComponent.getBoundingClientRect()
          if (window.scrollY > boundingRect.y + boundingRect.height) {
            setIsSearchOffScreen(true)
          } else {
            setIsSearchOffScreen(false)
          }
        }
      }, 100)
    }
    window.addEventListener('scroll', callback)
    return () => window.removeEventListener('scroll', callback)
  }, [])

  function cb() {
    console.log('cb is caled')
  }

  useEffect(() => {
    function hideCartCallback(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch(setCart(true))
      }
    }
    function hideModalCallback(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch(clearSelectedMenuItem())
      }
    }
    if (selectedMenuItemID) {
      window.addEventListener('keydown', hideModalCallback)
    }
    if (!toggled) {
      window.addEventListener('keydown', hideCartCallback)
    }
    return () => {
      window.removeEventListener('keydown', hideCartCallback)
      window.removeEventListener('keydown', hideModalCallback)
    }
  }, [toggled, selectedMenuItemID])

  return (
    <div className="inherit flex w-full justify-around pt-6">
      <div className="flex h-full w-[97%] justify-around bg-primary">
        {/* Cart */}
        <AbsoluteCart />
        {/* SearchFilters */}

        {/* original sticky but has issues when all options are open */}
        <div className={`filters-component relative top-0 h-[90%] w-1/3 pt-2 ${!showFilters && ' hidden '}`}>
          <div className="mx-4 flex flex-col border-2 border-dashed border-secondary  p-4">
            <div className="border-b-2 border-dashed border-secondary pb-4 ">
              <div className="flex w-full items-center justify-between text-2xl font-bold">
                <div>Categories:</div>
                <button onClick={() => setCategoriesToggled((prev) => !prev)}>
                  <Image width={20} height={20} alt={`down icon`} src={`icons/Chevron-Left.svg`} className={`${!categoriesToggled ? 'rotate-90' : '-rotate-90'} transition-all duration-200`} />
                </button>
              </div>
              <div className={`overflow-hidden transition-[max-height] duration-[400ms] ease-linear ${!categoriesToggled ? 'max-h-[50vh]' : 'max-h-0'}`}>
                {data.foodCategories.map((category) => {
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
              </div>
              <div>Selected categories here</div>
            </div>

            <div className="border-b-2 border-dashed border-secondary py-4 ">
              <div className="flex w-full items-center justify-between text-2xl font-bold">
                <div>Countries:</div>
                <button onClick={() => setCountriesToggled((prev) => !prev)}>
                  <Image width={20} height={20} alt={`down icon`} src={`icons/Chevron-Left.svg`} className={`${!countriesToggled ? 'rotate-90' : '-rotate-90'} transition-all duration-200`} />
                </button>
              </div>
              <div className={`overflow-hidden transition-[max-height] duration-[400ms] ease-linear ${!countriesToggled ? 'max-h-[50vh]' : 'max-h-0'}`}>
                {data.countries.map((country) => {
                  return (
                    <div className={` flex items-center justify-between gap-1 transition-all duration-200`}>
                      <div className="flex items-center gap-1">
                        <div>{country}</div>
                        <Image width={30} height={30} alt={`icon of ${country}`} src={`/icons/${country}.svg`} />
                      </div>
                      <div className="h-4 w-4 rounded-sm bg-secondary"></div>
                    </div>
                  )
                })}
              </div>
              <div>Selected countries here</div>
            </div>
            <div className="border-b-2 border-dashed border-secondary py-4 ">
              <div className="flex w-full items-center justify-between text-2xl font-bold">
                <div>Allergens:</div>
                <button onClick={() => setAllergensToggled((prev) => !prev)}>
                  <Image width={20} height={20} alt={`down icon`} src={`icons/Chevron-Left.svg`} className={`${!allergensToggled ? 'rotate-90' : '-rotate-90'} transition-all duration-200`} />
                </button>
              </div>
              <div className={`overflow-hidden transition-[max-height] duration-[400ms] ease-linear ${!allergensToggled ? 'max-h-[80vh]' : 'max-h-0'}`}>
                {data.allergens.map((allergen) => {
                  return (
                    <div className={` flex items-center justify-between gap-1 transition-all duration-200`}>
                      <div className="flex items-center gap-1">
                        <div>{allergen}</div>
                        <Image width={30} height={30} alt={`icon of ${allergen}`} src={`/icons/${allergen}.svg`} />
                      </div>
                      <div className="h-4 w-4 rounded-sm bg-secondary"></div>
                    </div>
                  )
                })}
              </div>
              <div>Selected allergens here</div>
            </div>

            <div className="border-dashed border-secondary pt-4 ">
              <div className="flex w-full items-center justify-between text-2xl font-bold">Price</div>
              <div>range here</div>
            </div>
          </div>
        </div>

        {isSearchOffScreen && (
          <button
            className="fixed bottom-4 left-4 transition-all duration-150"
            onClick={() => {
              const elem = document.querySelector('.filters-component')
              elem?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <Image width={20} height={20} alt={`down icon`} src={`icons/Chevron-Left.svg`} className={`${!countriesToggled ? 'rotate-90' : '-rotate-90'} transition-all duration-200`} />
          </button>
        )}

        <div className="h-full w-full ">
          <div
            className={`
                 mt-2 flex w-full flex-wrap justify-center  `}
          >
            {data.items.map((foodIn, index) => {
              const foodItem = foodIn as CartItem
              return (
                <button
                  className={`${
                    // Dirty hack to fix the last item always appearing a few pixels higher than expected
                    // index === data.items.length - 1 && ' border-2 border-dashed border-secondary outline-0 '
                    index === data.items.length - 1
                      ? '  mt-[1.5px] w-full -translate-x-[1px] outline-dashed outline-2 outline-secondary md:w-[45%] lg:w-[32.7%] xl:w-[24%]'
                      : 'w-full md:w-[45%] lg:w-[33%] xl:w-[24%]'
                  } group relative flex items-center justify-between gap-1 overflow-visible bg-primary p-4 outline-dashed outline-2 outline-secondary transition-all duration-75 hover:z-50  hover:cursor-pointer hover:shadow-2xl hover:outline hover:outline-4 md:aspect-square md:flex-col md:hover:scale-105  md:hover:p-1 `}
                  onMouseEnter={() => {
                    setHoveredItemID(foodItem.id)
                    const currItems = itemNos[foodItem.id]
                    currItems ? setSelectedMenuNumberItems(currItems) : setSelectedMenuNumberItems(1)
                  }}
                  onMouseLeave={() => {
                    const currItems = selectedMenuNumberItems
                    currItems > 1 && setItemNos({ ...itemNos, [foodItem.id]: selectedMenuNumberItems })
                  }}
                  onClick={() => {
                    dispatch(setSelectedMenuItem(foodItem.id))
                  }}
                  key={foodItem.id}
                >
                  {/* absolute hover */}
                  {/* <div className="invisible absolute left-0 top-0 z-50 h-[50vh] w-[50vw] group-hover:visible ">
                      <div className="relative flex h-full w-full">
                        <Image alt={`Image of ${foodItem.name}`} fill objectFit="cover" src={`/images/${foodItem.id}-0.png`} />
                      </div>
                      <div className="flex w-full flex-col ">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xl font-semibold">
                            <div className="line-clamp-1 ">{foodItem.name}</div>
                            <div className="flex pl-2 font-mono text-base">
                              {foodItem.allergens?.map((allergen) => (
                                <abbr title={allergen}>
                                  <Image width={35} height={35} alt={allergen} src={`/icons/${allergen}.svg`} />
                                </abbr>
                              ))}
                            </div>
                          </div>
                          <div className="text-xl font-bold tracking-tighter">{foodItem.price}</div>
                        </div>
                        <div className=" line-clamp-2 text-lg tracking-wide">{foodItem.description}</div>
                      </div>
                    </div>
  */}
                  {/* end of absolute hover */}
                  <div className="group relative flex h-full w-full justify-between">
                    {/* <div className="hidden h-20 w-[90%] bg-green-300 group-hover:absolute group-hover:bottom-0"> */}
                    {/* <Image alt={`Flag of ${foodItem.country}`} width={35} height={35} src={`/icons/${foodItem.country}.svg`} /> */}

                    {/* Optional button to change between images if this is interestin */}
                    {/* <div className="absolute right-0 top-1/2 z-50 hidden   w-full justify-between group-hover:flex">
                        <button className="bg-slate-100 p-2 text-center opacity-70 hover:bg-slate-200 hover:opacity-90 ">{'<'}</button>
                        <button className="bg-slate-100 p-2 text-center opacity-70 hover:bg-slate-200 hover:opacity-90 ">{'>'}</button>
                      </div> */}
                    {hoveredItemID === foodItem.id && (
                      <div className="invisible bottom-2 z-50 flex h-[10%] w-full items-center justify-between self-end px-2 pb-4 group-hover:visible">
                        <abbr title={foodItem.country}>
                          <Image alt={`Flag of ${foodItem.country}`} width={35} height={35} src={`/icons/${foodItem.country}.svg`} />
                        </abbr>
                        <div className="flex pb-2" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-center gap-2  font-medium">
                            <div className="group flex items-center justify-center gap-2 rounded-lg bg-white  transition-colors duration-150 ">
                              <button
                                className="rounded-l-lg  px-2 py-1 hover:bg-secondary hover:text-primary active:saturate-150"
                                onClick={() => {
                                  selectedMenuNumberItems > 1 && setSelectedMenuNumberItems((prev) => prev - 1)
                                }}
                              >
                                -
                              </button>
                              <div>{selectedMenuNumberItems} </div>
                              <button className="rounded-r-lg  px-2 py-1 hover:bg-secondary hover:text-primary active:saturate-150" onClick={() => setSelectedMenuNumberItems((prev) => prev + 1)}>
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    ...foodItem,
                                    quantity: selectedMenuNumberItems,
                                    modifications: 'empty',
                                  })
                                )
                              }}
                              className="text-gray h-6 w-6 rounded-full bg-green-200 font-black text-gray-600 hover:bg-green-600 hover:text-gray-200 active:bg-secondary active:text-primary"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <Image alt={`Image of ${foodItem.name}`} fill objectFit="cover" src={`/images/${foodItem.id}-0.png`} />
                  </div>
                  <div className="flex w-full flex-col ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xl font-semibold">
                        <div className=" line-clamp-1 truncate">{foodItem.name}</div>

                        <div className="flex max-w-[60%] pl-2 font-mono text-base">
                          {foodItem.allergens?.map((allergen) => (
                            <abbr title={allergen}>
                              <Image width={25} height={25} alt={allergen} src={`/icons/${allergen}.svg`} />
                            </abbr>
                          ))}
                        </div>
                      </div>
                      <div className="text-xl font-bold tracking-tighter">{foodItem.price}</div>
                    </div>
                    <div className="line-clamp-2 text-sm tracking-wide  md:group-hover:text-xs">{foodItem.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Menu

// <div
//             className={`
//                mt-2 flex w-full flex-wrap justify-center pr-4 `}
//           >
//             {data.items.map((foodItem, index) => {
//               return (
//                 <div
//                   className={`group relative z-0 flex aspect-square flex-col items-center justify-between overflow-visible bg-primary p-4 outline-dashed outline-2 outline-secondary transition-all  duration-75 hover:z-50 hover:scale-105 hover:cursor-pointer hover:p-1 hover:shadow-2xl hover:outline hover:outline-4  md:w-[45%] lg:w-[33%] xl:w-[24%]`}
//                   onMouseEnter={() => setSelectedItemID(foodItem.id)}
//                   key={foodItem.id}
//                 >
//                   {/* absolute hover */}
//                   {/* <div className="invisible absolute left-0 top-0 z-50 h-[50vh] w-[50vw] group-hover:visible ">
//                     <div className="relative flex h-full w-full">
//                       <Image alt={`Image of ${foodItem.name}`} fill objectFit="cover" src={`/images/${foodItem.id}-0.png`} />
//                     </div>
//                     <div className="flex w-full flex-col ">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center text-xl font-semibold">
//                           <div className="line-clamp-1 ">{foodItem.name}</div>
//                           <div className="flex pl-2 font-mono text-base">
//                             {foodItem.allergens?.map((allergen) => (
//                               <abbr title={allergen}>
//                                 <Image width={35} height={35} alt={allergen} src={`/icons/${allergen}.svg`} />
//                               </abbr>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="text-xl font-bold tracking-tighter">{foodItem.price}</div>
//                       </div>
//                       <div className=" line-clamp-2 text-lg tracking-wide">{foodItem.description}</div>
//                     </div>
//                   </div>
// */}
//                   {/* end of absolute hover */}
//                   <div className="group relative flex h-full w-full justify-between">
//                     {/* <div className="hidden h-20 w-[90%] bg-green-300 group-hover:absolute group-hover:bottom-0"> */}
//                     {/* <Image alt={`Flag of ${foodItem.country}`} width={35} height={35} src={`/icons/${foodItem.country}.svg`} /> */}

//                     {/* Optional button to change between images if this is interestin */}
//                     {/* <div className="absolute right-0 top-1/2 z-50 hidden   w-full justify-between group-hover:flex">
//                       <button className="bg-slate-100 p-2 text-center opacity-70 hover:bg-slate-200 hover:opacity-90 ">{'<'}</button>
//                       <button className="bg-slate-100 p-2 text-center opacity-70 hover:bg-slate-200 hover:opacity-90 ">{'>'}</button>
//                     </div> */}
//                     {selectedItemID === foodItem.id && (
//                       <div className="invisible bottom-2 z-50 flex h-[10%] w-full items-center justify-between self-end px-2 pb-4 group-hover:visible">
//                         <abbr title={foodItem.country}>
//                           <Image alt={`Flag of ${foodItem.country}`} width={35} height={35} src={`/icons/${foodItem.country}.svg`} />
//                         </abbr>
//                         <div className="flex pb-2">
//                           <div className="flex items-center justify-center gap-2 rounded-lg bg-white p-2">
//                             <button onClick={() => alert(`${selectedMenuNumberItems} orders of: ${foodItem.name}`)}>✓</button>
//                             <button
//                               onClick={() => {
//                                 selectedMenuNumberItems > 1 && setSelectedMenuNumberItems((prev) => prev - 1)
//                               }}
//                             >
//                               -
//                             </button>
//                             <div>{selectedMenuNumberItems}</div>
//                             <button onClick={() => setSelectedMenuNumberItems((prev) => prev + 1)}>+</button>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* </div> */}

//                     <Image alt={`Image of ${foodItem.name}`} fill objectFit="cover" src={`/images/${foodItem.id}-0.png`} />
//                   </div>
//                   <div className="flex w-full flex-col ">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center text-xl font-semibold">
//                         <div className="line-clamp-1 ">{foodItem.name}</div>

//                         <div className="flex max-w-[60%] pl-2 font-mono text-base">
//                           {foodItem.allergens?.map((allergen) => (
//                             <abbr title={allergen}>
//                               <Image width={25} height={25} alt={allergen} src={`/icons/${allergen}.svg`} />
//                             </abbr>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="text-xl font-bold tracking-tighter">{foodItem.price}</div>
//                     </div>
//                     <div className="line-clamp-2 text-sm tracking-wide group-hover:line-clamp-none group-hover:text-xs">{foodItem.description}</div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
