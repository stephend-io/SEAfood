import { clearSelectedMenuItem, getSelectedMenuItem } from '@/store/menuSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const FoodModal = () => {
  const id = useSelector(getSelectedMenuItem)
  const dispatch = useDispatch()
  return (
    <div className="fixed right-0 top-0 z-[99] h-full w-full ">
      <div
        className="h-full w-full backdrop-blur-md"
        onClick={() => {
          dispatch(clearSelectedMenuItem())
        }}
      ></div>
      <div className="fixed right-1/2 top-1/2  z-[51] h-[80%] w-[80%] -translate-y-1/2 translate-x-1/2 border-2 border-secondary bg-primary p-8 ">{id}</div>
    </div>
  )
}
export default FoodModal
