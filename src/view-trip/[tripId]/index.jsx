import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import { Hotel } from 'lucide-react';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const Viewtrip = () => {
    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);


    useEffect(()=>{
        tripId && GetTripData();
    },[tripId])

    const GetTripData= async ()=> {
        const docRef = doc(db,'AITrips',tripId);
        const docSnap = await getDoc(docRef); 
        if(docSnap.exists()) {
            console.log("Document : ", docSnap.data())
            setTrip(docSnap.data());
        } else{ 
            console.log("No Such Document");
            toast("No Trip Found");
        }
    }


  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-10 px-4 md:px-20 lg:px-32 xl:px-48 space-y-12'>
      {/* Info Section */}
      <div className='animate-fadeInUp'>
        <InfoSection trip={trip} />
      </div>

      {/* Hotels */}
      <div className='animate-fadeInUp delay-100'>
        <Hotels trip={trip} />
      </div>

      {/* Itinerary */}
      <div className='animate-fadeInUp delay-200'>
        <PlacesToVisit trip={trip} />
      </div>

      {/* Footer */}
      <div className='animate-fadeInUp delay-300'>
        <Footer trip={trip} />
      </div>
    </div>
  )
}

export default Viewtrip