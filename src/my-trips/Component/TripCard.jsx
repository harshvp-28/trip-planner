import { GetPlacDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TripCard = ({trip}) => {
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
    <Link to={'/view-trip/' + trip?.id}>
      <div className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-transform transform hover:scale-[1.03] bg-gradient-to-br from-blue-50 via-white to-pink-50 p-2">
        <img
          className="w-full rounded-xl h-[250px] object-cover border-4 border-white shadow-md group-hover:blur-[1px] transition-all duration-300"
          src={photoUrl}
          alt="Trip"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-xl text-white">
          <h2 className="font-extrabold text-xl truncate">{trip?.userSelection?.location?.label}</h2>
          <h3 className="text-sm font-medium text-gray-200 mt-1">
            {trip?.userSelection?.noOfDays} Days Trip , Budget: {trip?.userSelection?.budget}
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default TripCard