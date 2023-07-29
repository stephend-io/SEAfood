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
  name: String
  description: String
  price: number
  diet: DietType[]
  allergens: AllergenType[]
  id: String
}

export type CartItem = {
  id: string
  item: {
    // id: String
    quantity: number
    // price: number
    modifications: String
  }
}

export type OrderType = CartItem[]
// [key: string]: {
//   items: {
//     id: String
//     quantity: number
//     price: number
//     modifications: String
//   }[]
// }

export type CartType = OrderType[]

export type ReservationStatus = 'showed' | 'reschedule' | 'noshow'

export type ReservationType = {
  date: Date
  partySize: number
  status: ReservationStatus
  instructions: String
}

export type UserType = {
  name: String
  favourites: String[]
  email: String
  purchaseHistory: OrderType[]
  reservations: ReservationType[]
}

export type MenuType = {
  [category in CategoryType]: {
    description: String
    foodItems: FoodItemType[]
  }
}
