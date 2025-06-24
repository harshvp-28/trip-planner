import { Button } from '@/components/ui/button'
import { GetPlacDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaLocationArrow } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const PlaceCardItem = ({place}) => {
  const [photoUrl,setPhotoUrl] = useState();
      
      
      
  useEffect(() => {
  place && GetPlacePhoto();
  },[place])

  const GetPlacePhoto = async () => {
      const data = {
      textQuery: place?.place
      }
      const result = await GetPlacDetails(data).then(resp => {
        const photos = resp.data.places[0].photos;
        const randomIndex = Math.floor(Math.random() * photos.length); // random photo
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photos[randomIndex].name);
        setPhotoUrl(PhotoUrl);
      });
  }


  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + place?.place}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='bg-gradient-to-br from-cyan-100 via-emerald-100 to-lime-100 flex gap-4 items-center rounded-2xl shadow-lg border border-gray-200 p-3 transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer'>
        <img
          src={photoUrl}
          alt={place.place}
          className='w-[100px] h-[100px] object-cover rounded-xl shadow-sm border border-gray-300'
        />
        <div className='flex-1 flex flex-col gap-2'>
          <h2 className='font-semibold text-lg text-gray-800'>{place.place}</h2>
          <p className='text-sm text-gray-600 line-clamp-3'>{place.details}</p>
        </div>
        <Button
          size="sm"
          className='bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-full shadow-md hover:scale-110 transition-transform'
        >
          <FaLocationArrow className='text-lg' />
        </Button>
      </div>
    </Link>
  )
}

export default PlaceCardItem