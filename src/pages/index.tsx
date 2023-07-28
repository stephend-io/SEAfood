import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Head } from 'next/document'
import sample from '@/public/images/BRN0-0.png'
import { mock } from 'node:test'
import { dateSplicer } from '@/utils'

const inter = Inter({ subsets: ['latin'] })

const mockData = {
  name: 'Lorem Ipsum',
  tagline: 'Dolor sit amet consectetur adipiscing',
  address: '1234 Yonge St Toronto, ON M4T 1W5 Canada',
  phoneNo: '647 241 3030',
  menu: {
    items: [],
    filters: [],
    categories: [],
  },

  categories: ['Home', 'Appetizer', 'Main', 'Drink', 'Dessert', 'Cart'],
  specials: {},
  aboutUs: {
    headline: '',
    secondary: '',
  },
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
}

export default function Home() {
  // TODO: Import css
  const [category, setCategory] = useState(0)
  return (
    <div className="flex h-screen w-screen flex-col items-start justify-start bg-primary font-primaryFont text-secondary">
      <Header />
      <Navbar />
    </div>
  )
}
type SEACountryType = 'Philippines' | 'Myanmar' | 'Malaysia' | 'Indonesia' | 'Singapore' | 'Thailand' | 'Vietnam' | 'East Timor' | 'Brunei' | 'Laos' | 'Cambodia'

const countries: SEACountryType[] = ['Brunei', 'Thailand', 'Philippines', 'Laos', 'Myanmar', 'Singapore', 'Indonesia', 'Vietnam', 'Malaysia', 'Cambodia', 'East Timor']

type OpenStatuses = 'Open' | 'Closing Soon' | 'Closed'

const Header = () => {
  const data = mockData
  const [date, setDate] = useState<Date>()
  const [isOpen, setIsOpen] = useState(false)
  // if (date) {
  // console.log(data?.schedule[date?.getDay()])
  // }
  // const timeFrames: String[][] = dateSplicer(data?.schedule[date?.getDay()])
  // console.log('timeFrames is: ')
  // console.log(timeFrames)

  useEffect(() => {
    const today = new Date()
    setDate(today)
    // console.log(`${mockData.schedule[today.getDay()].schedule.open / 100} >= ${today.getHours()} && ${mockData.schedule[today.getDay()].schedule.close / 100} <= ${today.getHours()}`)
    // if (mockData.schedule[today.getDay()].schedule.open / 100 <= today.getHours() && mockData.schedule[today.getDay()].schedule.close / 100 >= today.getHours()) {
    //   setIsOpen(true)
    // }
  }, [])
  return (
    <div className="top-0 flex w-full items-center justify-around px-6 py-4 text-2xl scrollbar-hide">
      <div className="space-around flex w-1/3 flex-col gap-2 text-lg ">
        {data.address.split(',').map((str) => {
          return <div>{str}</div>
        })}
        <div className="font-semibold">{data.phoneNo}</div>
      </div>
      <div className="space-around flex w-1/3 flex-col gap-2 text-center">
        <div className="text-4xl font-black uppercase">{data.name}</div>
        <div>{data.tagline}</div>
      </div>
      <div className="flex w-1/3 flex-col items-end justify-end gap-2">
        <div className="font-semibold">Today's Hours:</div>
        {/* {date?.getDay()} */}
        {/* {new Date().getDay()} */}
        {/* {date?.getDay() && <div>{data.schedule[date.getDay()]}</div>} */}
        {date?.getDay() &&
          dateSplicer(data.schedule[date?.getDay()]).map((dateFrame) => {
            return <div className="text-lg tracking-wide">{dateFrame}</div>
          })}

        {/* {isOpen ? 'OPEN' : 'CLOSED'} */}
      </div>
    </div>
  )
}

const Navbar = () => {
  const data = mockData
  return (
    <div className="flex min-h-[40px] w-full justify-between  ">
      {data.categories.map((category, index) => {
        let last = false
        if (index === data.categories.length - 1) {
          last = true
        }
        return (
          <button
            key={category}
            className={`flex h-full w-full items-center justify-center border-b-2 border-t-2 border-dashed border-secondary p-4 font-medium transition-all duration-75 hover:scale-110 hover:border-l-2 hover:border-primary hover:bg-secondary hover:font-black hover:text-primary hover:shadow-xl active:saturate-150 ${
              !last && 'border-r-2'
            }`}
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
