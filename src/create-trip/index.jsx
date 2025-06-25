import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { VscLoading } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place,setPlace] = useState();
  const [formData,setFormData] = useState([]);
  const [loading,setLoading]= useState(false);
  const navigate= useNavigate();

  const [openDialog,setOpenDialog] = useState(false);
  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

  const OnGenerateTrip= async ()=>{
    const user =  localStorage.getItem('user');
    if(!user) {
      setOpenDialog(true);
      return;
    }


    if((formData?.noOfDays > 15 && !formData?.location) || !formData?.budget || !formData?.traveler ) {
      toast("Please fill all details!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}',formData?.location.label).replace('{totalDays}',formData?.noOfDays).replace('{traveler}',formData?.traveler).replace('{budget}',formData.budget).replace('{totalDays}',formData?.noOfDays)


    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text())
    setLoading(false);
    saveAITrip(result?.response?.text())


  }

  const saveAITrip =async (TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))

    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);
    navigate('/view-trip/' + docId);
  }


  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    
    <div className='min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-5 sm:px-10 md:px-20 lg:px-44 xl:px-60 space-y-10'>
      <div>
        <h2 className='font-extrabold text-3xl text-gray-800'>✨ Tell Your Travel Preferences</h2>
        <p className='mt-3 text-gray-500 text-lg'>Provide some basic information and we'll generate a trip plan just for you.</p>
      </div>

      <div className='space-y-8'>
        {/* Destination */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-xl font-semibold text-gray-700'>📍 What is your destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
              className: 'w-full'
            }}
          />
        </div>

        {/* Days */}
        <div>
          <h2 className='text-xl font-semibold text-gray-700'>🗓️ For how many days are you planning?</h2>
          <Input className='mt-5' placeholder={'Ex. 5'} type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>

        {/* Budget */}
        <div>
          <h2 className='text-xl font-semibold text-gray-700'>💸 What's your budget?</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 
                ${formData?.budget === item.title ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}>
                <div className='text-4xl'>{item.icon}</div>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500 text-center'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className='text-xl font-semibold text-gray-700'>🧳 Who's traveling with you?</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-6 mt-4'>
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col items-center gap-2 
                ${formData?.traveler === item.people ? 'ring-2 ring-green-400 bg-green-50' : ''}`}>
                <div className='text-4xl'>{item.icon}</div>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <p className='text-sm text-gray-500 text-center'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className='flex justify-end'>
          <Button disabled={loading} onClick={OnGenerateTrip} className='cursor-pointer px-6 py-3 text-lg font-semibold'>
            {loading ? <VscLoading className='h-6 w-6 animate-spin' /> : '🚀 Generate Trip'}
          </Button>
        </div>
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="relative">
          <DialogHeader>
            <DialogDescription className='flex flex-col items-center gap-4'>
              <img src='/logo.svg' alt='App Logo' className='w-16 h-16' />
              <h2 className='font-bold text-lg mt-2'>Sign In With Google</h2>
              <p className='text-sm text-gray-500 text-center'>
                Sign in to unlock personalized trip planning using your Google account.
              </p>
              <Button 
                onClick={login} 
                className='cursor-pointer w-full mt-4 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white'
              >
                <FcGoogle className='h-6 w-6' /> Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>

          {/* This is the correct way to implement a close button in Shadcn/Radix Dialog */}
          <DialogClose asChild>
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip