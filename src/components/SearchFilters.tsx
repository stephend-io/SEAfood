import { AllergenType, CategoryType, CountryType, DietType, FoodItemType } from '../../types'

type Props = {
  foodCategories: CategoryType
  countries: CountryType
  dietCategories: DietType
  allergenCategories: AllergenType
  foodItems: FoodItemType
}

// ! debugging only
const SearchFilters = (data: any) => {
  return (
    <div className="w-1/3 ">
      <div className="m-4 flex flex-col border-2 border-dashed border-b-primary p-4">
        <div className="border-b-2 border-dashed border-primary pb-2">
          <div>Categories:</div>
          {data.foodCategories.map((category) => {
            return (
              <div className="flex justify-between">
                <div>{category}</div>
                <div className="h-4 w-4 rounded-sm bg-primary"></div>
              </div>
            )
          })}
        </div>
        <div className="border-b-2 border-dashed border-primary py-4">
          <div>Countries:</div>
          {data.countries.map((country) => {
            return (
              <div className="flex justify-between">
                <div>{country}</div>
                <div className="h-4 w-4 rounded-sm bg-primary"></div>
              </div>
            )
          })}
        </div>

        <div className="border-dashed border-primary pt-4">
          <div>Allergens:</div>
          {data.allergens.map((allergen) => {
            return (
              <div className="flex justify-between">
                <div>{allergen}</div>
                <div className="h-4 w-4 rounded-sm bg-primary"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default SearchFilters
