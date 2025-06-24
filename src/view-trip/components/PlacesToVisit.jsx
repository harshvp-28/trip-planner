import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {

    
  return (
    <div className='bg-gradient-to-tr from-amber-100 via-rose-100 to-lime-100 mt-10 p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-6 transition-transform duration-300 hover:scale-[1.01]'>
      <h2 className='font-extrabold text-2xl text-gray-800 mb-4 border-b pb-2'>🗺️ Places To Visit</h2>
      <div className='space-y-8'>
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary)
            .sort((a, b) => {
              // Extract day numbers and sort numerically
              const dayA = parseInt(a[0].replace('day', ''));
              const dayB = parseInt(b[0].replace('day', ''));
              return dayA - dayB;
            }).map(([dayKey, item], index) => (
          <div key={index} className='space-y-4'>
            <h2 className='font-semibold text-xl text-purple-600'>Day {index + 1}</h2>
            <div className='grid md:grid-cols-2 gap-6'>
              {item.plan.map((place, idx) => (
                <div className='my-2 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300' key={idx}>
                  <h2 className='font-medium text-sm text-amber-600 mb-2'>⏰ {place.time}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>




    
  )
}
export default PlacesToVisit