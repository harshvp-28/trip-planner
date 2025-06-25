import React from 'react';
import PlaceCardItem from './PlaceCardItem';

const PlacesToVisit = ({ trip }) => {
  const itineraryRaw = trip?.tripData?.itinerary;

  let itineraryArray = [];

  if (Array.isArray(itineraryRaw)) {
    // Format 1: Array of day plans
    itineraryArray = itineraryRaw;
  } else if (Array.isArray(itineraryRaw?.daily_plan)) {
    // Format 2: Object with daily_plan array
    itineraryArray = itineraryRaw.daily_plan;
  } else if (itineraryRaw && typeof itineraryRaw === 'object') {
    // Format 3: Object with day1, day2, ... (Canberra style)
    itineraryArray = Object.entries(itineraryRaw)
      .map(([dayKey, data]) => ({
        day: dayKey,
        ...data
      }))
      .sort((a, b) => {
        // Extract day numbers and sort numerically
        const dayNumA = parseInt(a.day?.replace(/\D/g, '') || '0');
        const dayNumB = parseInt(b.day?.replace(/\D/g, '') || '0');
        return dayNumA - dayNumB;
      });
  }

  return (
    <div className='bg-gradient-to-tr from-amber-100 via-rose-100 to-lime-100 mt-10 p-4 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-6 transition-transform duration-300 hover:scale-[1.01]'>
      <h2 className='font-extrabold text-2xl text-gray-800 mb-4 border-b pb-2'>🗺️ Places To Visit</h2>

      {itineraryArray.length === 0 ? (
        <p className="text-gray-600">No itinerary available.</p>
      ) : (
        <div className='space-y-8'>
          {itineraryArray.map((item, index) => (
            <div key={index} className='space-y-4'>
              <h2 className='font-semibold text-xl text-purple-600 capitalize'>
                {item.day || `Day ${index + 1}`}
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                {item.plan?.map((place, idx) => (
                  <div
                    className='my-2 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300'
                    key={idx}
                  >
                    <h2 className='font-medium text-sm text-amber-600 mb-2'>⏰ {place.time}</h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesToVisit;
