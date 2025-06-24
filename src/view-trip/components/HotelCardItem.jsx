import { GetPlacDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({hotel}) => {
    
    const [readMore, setReadMore] = useState(false);
    
    const [photoUrl,setPhotoUrl] = useState(hotel?.image_url);
    useEffect(() => {
    hotel && GetPlacePhoto();
    },[hotel])

    const GetPlacePhoto = async () => {
        try {
          const data = { textQuery: hotel?.name }
          const resp = await GetPlacDetails(data);
          const photos = resp.data.places[0].photos;
          if (photos?.length) {
            const randomIndex = Math.floor(Math.random() * photos.length);
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[randomIndex].name);
            setPhotoUrl(PhotoUrl);
          }
        } catch(err) {
          console.error("Photo Fetch error", err);
        }
    }



  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address}
      target='_blank'
    >
      <div className='bg-gradient-to-br from-cyan-100 via-emerald-100 to-lime-100 rounded-2xl shadow-md border border-gray-100 overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer'>
        <img
          src={photoUrl}
          alt={hotel?.name}
          className='w-full h-[200px] object-cover transition-all duration-300'
        />
        <div className='p-4 flex flex-col gap-2'>
          <h2 className='font-semibold text-lg text-gray-800'>🏨 {hotel?.name}</h2>
          <h2 className='text-sm text-gray-500'>
            📍 {readMore ? hotel?.address : hotel?.address?.substring(0, 40) + (hotel?.address?.length > 40 ? '...' : '')}
            {hotel?.address?.length > 40 && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // prevent Link click
                  setReadMore(!readMore);
                }}
                className='ml-2 text-blue-500 underline text-xs'
              >
                {readMore ? 'Read Less' : 'Read More'}
              </button>
            )}
          </h2>
          <div className='flex justify-between items-center text-sm text-gray-700'>
            <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs'>
              💰 {hotel?.price}
            </span>
            <span className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs'>
              ⭐ {hotel?.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem