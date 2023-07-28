import { useEffect, useState } from 'react'
import { MenuType } from '../../types'
import Image from 'next/image'
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

const Menu = () => {
  // fetched Data
  const data = mockData
  const [categoriesToggled, setCategoriesToggled] = useState(false)
  const [countriesToggled, setCountriesToggled] = useState(false)
  const [allergensToggled, setAllergensToggled] = useState(false)
  const [isSearchOffScreen, setIsSearchOffScreen] = useState(false)

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

  return (
    <div className="relative flex w-full pt-8">
      {/* SearchFilters */}
      <div className="filters-component relative top-0 h-[90%] w-1/3">
        {/* original sticky but has issues when all options are open */}
        {/* <div className="sticky top-0 h-[90%] w-1/3 "> */}
        <div className="m-4 flex flex-col border-2 border-dashed border-secondary  p-4">
          {/* <div className="border-b-2 border-dashed border-secondary pb-2">
            <div className="">Categories:</div>
            {data.foodCategories.map((category) => {
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div>{category}</div>
                    <Image width={30} height={30} alt={`icon of ${category}`} src={`/icons/${category}.svg`} />
                  </div>
                  <div className="h-4 w-4 rounded-sm bg-secondary"></div>
                </div>
              )
            })}
          </div> */}
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
            {/* } */}
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
            {/* } */}
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
            {/* } */}
          </div>

          {/* 
          <div className="border-dashed border-secondary pt-4">
            <div>Allergens:</div>
            {data.allergens.map((allergen) => {
              return (
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <div>{allergen}</div>
                    <Image width={30} height={30} alt={`icon of ${allergen}`} src={`/icons/${allergen}.svg`} />
                  </div>

                  <div className="h-4 w-4 rounded-sm bg-secondary"></div>
                </div>
              )
            })}
          </div> */}
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

      {/* End of Search Filters */}

      {/* Actual menu */}
      <div>
        {data.foodCategories.map((category, index) => {
          return (
            <div className={`${index !== data.foodCategories.length - 1 && 'border-b-2 border-dashed border-b-secondary'} flex flex-col gap-2  p-4`}>
              <div className="text-4xl font-black">{category}</div>
              {data.items.map((foodItem) => {
                return (
                  <div className="flex w-full items-center justify-center">
                    <div className="relative mr-4 h-20 w-40">
                      <Image alt={`Image of ${foodItem.name}`} fill objectFit="cover" src={`/images/${foodItem.id}-0.png`} />
                    </div>
                    <div></div>
                    <div className="flex w-full flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xl font-semibold">
                          <div>{foodItem.name}</div>
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
                      <div className="text-lg tracking-wide">{foodItem.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Menu
