import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({trip}) => {
  return (
     <div className='mt-10 bg-gradient-to-tr from-amber-100 via-rose-100 to-lime-100 p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-4 transition-transform duration-300 hover:scale-[1.01]'>
      <h2 className='font-extrabold text-2xl text-gray-800 mb-4 border-b pb-2'>🏨 Hotel Recommendations</h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {trip?.tripData?.hotel_options?.map((hotel, index) => (
          <div key={index} className="h-full">
            <HotelCardItem hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels