import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
const Header = () => {
  const users = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(users);
  },[])
  console.log(users);
  const [openDialog,setOpenDialog] = useState(false);
  const login = useGoogleLogin({
    scope: 'profile email',
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })

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
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }


  return (
    <header className="w-full shadow-md bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-10 w-auto object-contain" />
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">AI TripGen</h1>
        </div>

        <div>
          {
            users ? 
            <div className='flex items-center gap-3'>
              <a href='/create-trip'><Button varient="outline" className="cursor-pointer rounded-full">+ Create Trip</Button></a>

              <a href='/my-trip'><Button varient="outline" className=" cursor-pointer rounded-full">My Trips</Button></a>
              
              <Popover>
                <PopoverTrigger>
                  <img src={users?.picture} className='cursor-pointer h-[35px] w-[35px] alt="User" 
                   rounded-full'></img>
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.href = '/';
                  }}>Logout</h2>
                </PopoverContent>
              </Popover>
              


              
            </div> : 
            <Button onClick={()=>setOpenDialog(true)} className="rounded-full cursor-pointer px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition duration-300 shadow-md">
            Sign In
            </Button>

          }
          
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription className='flex flex-col items-center gap-4'>
                <img src='/logo.svg' alt='App Logo' className='w-16 h-16' />
                <h2 className='font-bold text-lg mt-2'>Sign In With Google</h2>
                <p className='text-sm text-gray-500 text-center'>Sign in to unlock personalized trip planning using your Google account.</p>
                <Button onClick={login} className='cursor-pointer w-full mt-4 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white'>
                  <FcGoogle className='h-6 w-6' /> Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}

export default Header