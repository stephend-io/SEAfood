'use client'

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { Head } from 'next/document'
import sample from '@/public/images/BRN0-0.png'

const inter = Inter({ subsets: ['latin'] })

const mockData = {
  name: 'Lorem Ipsum',
  tagline: 'Dolor sit amet consectetur adipiscing',
  menu: {
    items: [],
    filters: [],
    categories: [],
  },
  specials: {},
  aboutUs: {
    headline: '',
    secondary: '',
  },
  schedule: [{ day: 'M' }, { day: 'T' }, { day: 'W' }, { day: 'TH' }, { day: 'F' }, { day: 'S' }, { day: 'SU' }],
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
  return (
    <div className=" flex h-screen w-screen flex-col bg-primary font-primaryFont md:flex-row">
      <Header />
    </div>
  )
}
type SEACountryType = 'Philippines' | 'Myanmar' | 'Malaysia' | 'Indonesia' | 'Singapore' | 'Thailand' | 'Vietnam' | 'East Timor' | 'Brunei' | 'Laos' | 'Cambodia'

const countries: SEACountryType[] = ['Brunei', 'Thailand', 'Philippines', 'Laos', 'Myanmar', 'Singapore', 'Indonesia', 'Vietnam', 'Malaysia', 'Cambodia', 'East Timor']

type OpenStatuses = 'Open' | 'Closing Soon' | 'Closed'

const Header = () => {
  const data = mockData
  const { name, tagline, specialSchedule, schedule } = data
  const [open, setOpen] = useState<OpenStatuses>('Closed')

  return (
    <div className="flex w-full font-black md:h-full ">
      <div className="relative flex h-full w-1/2 flex-col items-center border-r-4 border-r-accent text-accent">
        <div className="pt-4 text-4xl">Today's Picks</div>
        <div className="flex h-1/3 w-full items-center justify-around px-4 py-4">
          <div className="flex h-1/2 w-1/3 flex-col">
            <img src="/images/VNM28-2.png" className="h-full w-full object-cover " />
            Vietnam
          </div>
          <div className="flex h-full w-1/3 flex-col place-self-end">
            <img src="/images/TLS16-2.png" className="h-full w-2/3 object-cover" />
            East Timor
          </div>
        </div>
        <div className="flex h-1/3 w-full items-center justify-end gap-20 py-4 pr-20">
          <div className="flex h-full w-1/3 flex-col">
            <img src="/images/IDN14-2.png" className="h-full w-full object-cover" />
            Indonesia
          </div>
          <div className="flex h-full w-1/2 flex-col place-self-end">
            <img src="/images/PHL10-2.png" className="h-2/3 w-full object-cover" />
            Philippines
          </div>
        </div>
        <div className="flex h-1/3 w-full items-center justify-around px-4 py-4">
          <div className="flex h-full w-1/4 flex-col">
            <img src="/images/BRN20-2.png" className="h-full w-full object-cover" />
            Brunei
          </div>
          <div className="flex h-full w-1/3 flex-col place-self-end">
            <img src="/images/THA23-2.png" className="h-full w-full object-cover" />
            Thailand
          </div>
        </div>
        {/* <div className="flex h-1/3 w-full items-center justify-start gap-40  py-4 pl-20">
          <div className="flex h-full w-1/4 flex-col place-self-end">
            <img src="/images/MYS18-2.png" className="h-full w-full object-cover" />
            Malaysia
          </div>
          <div className="flex h-full w-1/4 flex-col place-self-end">
            <img src="/images/SGP28-2.png" className="h-full w-full object-cover" />
            Singapore
          </div>
        </div> */}
        {/* Full big image */}
        {/* <Image
          src={'/images/IDN10-1.png'}
                    fill={true}
          objectFit="cover"
          quality={100}
          alt="lady holding chopsticks over a bowl of noodle salad"
        /> */}
      </div>
      <div className="flex h-full w-1/2 flex-col items-center justify-center text-accent">
        <div className="text-4xl">Menu</div>
        <div className="font-medium">Appetizers</div>
        <div className="font-medium">Mains</div>
        <div className="font-medium">Dessert</div>
        <div className="font-medium">Drinks</div>
        <div className="font-medium">Dietary Restrictions</div>
      </div>
    </div>
  )
}
