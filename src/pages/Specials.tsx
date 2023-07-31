import { useEffect, useState } from 'react'
import { FoodItemType } from '../../types'

const Specials = () => {
  const [test, setTest] = useState<FoodItemType[]>([])
  const [testToo, setTestToo] = useState<string>('')
  useEffect(() => {
    ;(async () => {
      const res = await fetch('http://localhost:3001/api/v1/food/', { method: 'GET' })
      // console.log(res)
      const data = await res?.json()
      console.log(data)
      // console.log(data.keys)
      setTestToo(JSON.stringify(data))
    })()
  }, [])
  return (
    <div className=" flex h-screen w-screen items-center justify-center bg-orange-200 text-4xl font-black text-secondary">
      {testToo && testToo}
      {/* {test.map((val) => (
        <div>{val.name}</div>
      ))} */}
    </div>
  )
}
export default Specials
