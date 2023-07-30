export type CategoryType = 'Appetizer' | 'Main' | 'Drink' | 'Dessert'

export type CountryType = 'Philippines' | 'Myanmar' | 'Malaysia' | 'Indonesia' | 'Singapore' | 'Thailand' | 'Vietnam' | 'East Timor' | 'Brunei' | 'Laos' | 'Cambodia'

export type DietType = 'Vegetarian' | 'Vegan' | 'Pescatarian' | 'Gluten-Free' | 'Nuts'

export type AllergenType =
  | 'Peanuts'
  | 'Crustaceans'
  | 'Soy'
  | 'Wheat'
  | 'Fish'
  | 'Coconut'
  | 'Eggs'
  | 'Nuts'
  | 'Shellfish'
  | 'Dairy'
  | 'Pork'
  | 'Seafood'
  | 'Shrimp'
  | 'Mollusks'
  | 'Sesame'
  | 'Poultry'

export type FoodItemType = {
  country: CountryType
  type: CategoryType
  name: string
  description: string
  price: number
  diet: DietType[]
  allergens: AllergenType[]
  id: string
}

export type CartItem = FoodItemType & {
  quantity: number
  modifications?: string
}
// export type CartItem = {
//   id: string
//   name: string
//   price: number

//     // id: String
//     quantity: number
//     // price: number
//     modifications?: String
// }

export type OrderType = CartItem[]
// [key: string]: {
//   items: {
//     id: String
//     quantity: number
//     price: number
//     modifications: String
//   }[]
// }

export type CartType = {
  [key: string]: CartItem[]
}

export type ReservationStatus = 'showed' | 'reschedule' | 'noshow'

export type ReservationType = {
  date: Date
  partySize: number
  status: ReservationStatus
  instructions: string
}

export type UserType = {
  name: string
  favourites: string[]
  email: string
  purchaseHistory: OrderType[]
  reservations: ReservationType[]
}

export type MenuType = {
  [category in CategoryType]: {
    description: string
    foodItems: FoodItemType[]
  }
}
