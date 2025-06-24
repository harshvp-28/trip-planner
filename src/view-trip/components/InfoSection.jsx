import { Button } from '@/components/ui/button'
import { GetPlacDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoShareSocial } from "react-icons/io5";



const InfoSection = ({trip}) => {
  const [photoUrl,setPhotoUrl] = useState();



  useEffect(() => {
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label
      }
      try {
        const resp = await GetPlacDetails(data);
        const photos = resp.data.places[0].photos;
        
        if (photos && photos.length > 0) {
          const randomIndex = Math.floor(Math.random() * photos.length); // random index
          const randomPhotoName = photos[randomIndex].name;

          const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', randomPhotoName);
          setPhotoUrl(PhotoUrl);
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
  }



  return (
      <div className='p-4 bg-gradient-to-tr from-amber-100 via-rose-100 to-lime-100 md:p-6 bg-white rounded-2xl shadow-xl border border-gray-100 space-y-4        transition-transform duration-300 hover:scale-[1.01]'>
        <img
          src={photoUrl}
          alt="Place"
          style={{ imageRendering: 'auto' }}
          className='h-[300px] w-full object-center object-cover rounded-xl shadow-md border border-gray-200 transition-transform duration-500 ease-in-out hover:scale-105'
        />
        <div className='flex justify-between items-center'>
          <div className='my-3 flex flex-col gap-3'>
            <h2 className='font-extrabold text-2xl text-gray-800'>
              {trip?.userSelection?.location?.label}
            </h2>
            <div className='flex flex-wrap gap-3'>
              <span className='p-2 px-4 bg-gradient-to-r from-purple-200 to-purple-100 rounded-full text-purple-700 text-xs md:text-sm shadow-sm'>
                📅 {trip?.userSelection?.noOfDays} Day
              </span>
              <span className='p-2 px-4 bg-gradient-to-r from-green-200 to-green-100 rounded-full text-green-700 text-xs md:text-sm shadow-sm'>
                💸 {trip?.userSelection?.budget} Budget
              </span>
              <span className='p-2 px-4 bg-gradient-to-r from-yellow-200 to-yellow-100 rounded-full text-yellow-700 text-xs md:text-sm shadow-sm'>
                🥂 Travelers: {trip?.userSelection?.traveler}
              </span>
            </div>
          </div>
          <Button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-all duration-300'>
            <IoShareSocial className='text-xl' />
          </Button>
        </div>
      </div>
  )
}

export default InfoSection