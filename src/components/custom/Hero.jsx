import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-5">
      <div className="max-w-5xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            Discover Your Next Adventure with AI:
          </span><br />
          Personalized Itineraries at Your Fingertips
        </h1>

        <p className="text-lg md:text-xl text-gray-600">
          Your personal trip planner and travel curator powered by AI ✨
        </p>

        <Link to="/create-trip">
          <Button className="mt-4 cursor-pointer px-6 py-3 rounded-full text-lg bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-all duration-300">
            🚀 Get Started
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default Hero