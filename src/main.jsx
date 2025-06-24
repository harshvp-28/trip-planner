import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/custom/header'
import { Toaster } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Viewtrip from './view-trip/[tripId]'
import MyTrips from './my-trips'

const router =  createBrowserRouter([
  {
    path:'/',
    element:<App></App>
  },
  {
    path:'/create-trip',
    element:<CreateTrip></CreateTrip>
  },
  {
    path:'view-trip/:tripId',
    element:<Viewtrip></Viewtrip>
  },
  {
    path:'/my-trip',
    element:<MyTrips></MyTrips>
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
        <Header></Header>
        <Toaster></Toaster>
        <RouterProvider router={router}><App /></RouterProvider>
      
    </GoogleOAuthProvider>
    
    
  </StrictMode>,
)
