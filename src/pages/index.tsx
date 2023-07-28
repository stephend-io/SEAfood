import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SetStateAction, useEffect, useState } from 'react'
import { Head } from 'next/document'
import sample from '@/public/images/BRN0-0.png'
import { mock } from 'node:test'
import { dateSplicer } from '@/utils'
import Cart from './Cart'
import Reservations from './Reservations'
import Menu from './Menu'
import Specials from './Specials'

const inter = Inter({ subsets: ['latin'] })

const restaurantDetails = {
  name: 'Lorem Ipsum',
  tagline: 'Dolor sit amet consectetur adipiscing',
  address: '1234 Yonge St Toronto, ON M4T 1W5 Canada',
  phoneNo: '647 241 3030',

  schedule: [
    ['3:00 pm', '10:30 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '10:00 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '10:30 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '10:30 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '11:00 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '11:00 pm'],
    ['11:30 am', '3:00 pm', '5:00 pm', '11:00 pm'],
  ],
  timezone: 'UTC-4',
}

type NavCategories = 'Home' | 'Menu' | 'Specials' | 'Reservations' | 'Cart'
const categories: NavCategories[] = ['Home', 'Menu', 'Specials', 'Reservations', 'Cart']

export default function Home() {
  // TODO: Import css

  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start bg-primary font-primaryFont text-secondary">
      <Header />
      <Body />
    </div>
  )
}
type SEACountryType = 'Philippines' | 'Myanmar' | 'Malaysia' | 'Indonesia' | 'Singapore' | 'Thailand' | 'Vietnam' | 'East Timor' | 'Brunei' | 'Laos' | 'Cambodia'

const countries: SEACountryType[] = ['Brunei', 'Thailand', 'Philippines', 'Laos', 'Myanmar', 'Singapore', 'Indonesia', 'Vietnam', 'Malaysia', 'Cambodia', 'East Timor']

type OpenStatuses = 'Open' | 'Closing Soon' | 'Closed'

const Header = () => {
  // get actual data using getServerSideProps / getStaticProps ofc
  const data = restaurantDetails
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const today = new Date()
    setDate(today)
  }, [])

  return (
    <div className="top-0 flex w-full items-center justify-around px-6 py-4 text-2xl scrollbar-hide">
      <div className="space-around flex w-1/3 flex-col gap-2 text-lg ">
        {data.address.split(',').map((str) => {
          return <div>{str}</div>
        })}
        <a className="font-semibold" href={`tel:${data.phoneNo.replaceAll(' ', '-')}`}>
          {data.phoneNo}
        </a>
      </div>
      <div className="space-around flex w-1/3 flex-col gap-2 text-center">
        <div className="text-4xl font-black uppercase">{data.name}</div>
        <div>{data.tagline}</div>
      </div>
      <div className="flex w-1/3 flex-col items-end justify-end gap-2">
        <div className="font-semibold">Today's Hours:</div>
        {date?.getDay() &&
          dateSplicer(data.schedule[date?.getDay()]).map((dateFrame) => {
            return <div className="text-lg tracking-wide">{dateFrame}</div>
          })}
      </div>
    </div>
  )
}

type BodyProps = {
  categories: NavCategories[]
}
const Body = () => {
  const [selectedCategory, setSelectedCategory] = useState<NavCategories>('Menu')
  return (
    <div className=" w-full bg-primary text-secondary scrollbar-hide">
      <Navbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
      {selectedCategory === 'Cart' && <Cart />}
      {selectedCategory === 'Menu' && <Menu />}
      {selectedCategory === 'Reservations' && <Reservations />}
      {selectedCategory === 'Specials' && <Specials />}
      {selectedCategory === 'Home' && <div className="h-full w-full ">home</div>}
      {/* <div className="h-full w-full">test</div> */}
    </div>
  )
}

type NavbarProps = {
  categories: NavCategories[]
  selectedCategory: string
  setSelectedCategory: React.Dispatch<SetStateAction<NavCategories>>
}
const Navbar = ({ categories, selectedCategory, setSelectedCategory }: NavbarProps) => {
  return (
    <div className="flex min-h-[40px] w-full justify-between  ">
      {categories.map((category, index) => {
        let last = false
        if (index === categories.length - 1) {
          last = true
        }
        return (
          <button
            key={category}
            className={`${
              category === selectedCategory ? 'bg-secondary font-black text-primary ' : 'bg-primary font-medium text-secondary '
            } flex h-full w-full items-center justify-center border-b-2 border-t-2 border-dashed border-secondary p-4 transition-all duration-75 hover:scale-110 hover:border-l-2 hover:border-primary hover:bg-secondary hover:font-black hover:text-primary hover:shadow-xl active:saturate-150 ${
              !last && 'border-r-2'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

// const Header = () => {
//   const data = mockData
//   const { name, tagline, specialSchedule, schedule } = data
//   const [open, setOpen] = useState<OpenStatuses>('Closed')

//   return (
//     <div className="flex w-full font-black md:h-full ">
//       {/* <div className="relative flex h-full w-1/2 flex-col items-center border-r-4 border-r-accent text-accent">
//         <div className="pt-4 text-4xl">Today's Picks</div>
//         <div className="flex h-1/3 w-full items-center justify-around px-4 py-4">
//           <div className="flex h-1/2 w-1/3 flex-col">
//             <img src="/images/VNM28-2.png" className="h-full w-full object-cover " />
//             Vietnam
//           </div>
//           <div className="flex h-full w-1/3 flex-col place-self-end">
//             <img src="/images/TLS16-2.png" className="h-full w-2/3 object-cover" />
//             East Timor
//           </div>
//         </div>
//         <div className="flex h-1/3 w-full items-center justify-end gap-20 py-4 pr-20">
//           <div className="flex h-full w-1/3 flex-col">
//             <img src="/images/IDN14-2.png" className="h-full w-full object-cover" />
//             Indonesia
//           </div>
//           <div className="flex h-full w-1/2 flex-col place-self-end">
//             <img src="/images/PHL10-2.png" className="h-2/3 w-full object-cover" />
//             Philippines
//           </div>
//         </div>
//         <div className="flex h-1/3 w-full items-center justify-around px-4 py-4">
//           <div className="flex h-full w-1/4 flex-col">
//             <img src="/images/BRN20-2.png" className="h-full w-full object-cover" />
//             Brunei
//           </div>
//           <div className="flex h-full w-1/3 flex-col place-self-end">
//             <img src="/images/THA23-2.png" className="h-full w-full object-cover" />
//             Thailand
//           </div>
//         </div>
//         {/* <div className="flex h-1/3 w-full items-center justify-start gap-40  py-4 pl-20">
//           <div className="flex h-full w-1/4 flex-col place-self-end">
//             <img src="/images/MYS18-2.png" className="h-full w-full object-cover" />
//             Malaysia
//           </div>
//           <div className="flex h-full w-1/4 flex-col place-self-end">
//             <img src="/images/SGP28-2.png" className="h-full w-full object-cover" />
//             Singapore
//           </div>
//         </div>
//         <Image
//           src={'/images/IDN10-1.png'}
//                     fill={true}
//           objectFit="cover"
//           quality={100}
//           alt="lady holding chopsticks over a bowl of noodle salad"
//         />
//       </div> */}
//     </div>
//   )
// }
