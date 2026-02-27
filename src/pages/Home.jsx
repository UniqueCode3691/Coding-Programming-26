// Home.jsx - Main landing page component.
// This component displays the homepage with hero section, rotating testimonials, and interactive map.
// Includes navigation buttons to businesses and events, and showcases community reviews.

import React from 'react'
import Header from './Components/Header'
import bostonImage from '../assets/home-page-boston.jpg'
import { Link } from "react-router-dom"
import CardSwap, { Card } from './Components/CardSwap'
import Star from './Components/Star';
import UserLocation from "./Components/UserLocation";
import Footer from './Components/Footer'
import Chatbot from './Components/Chatbot';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Home functional component.
// Manages user coordinates state and renders the main landing page.
// Displays hero with navigation, testimonials carousel, and location map.
const Home = () => {
  // State for user coordinates, defaults to Boston.
  const [coords, setCoords] = useState({ lat: 42.3601, lng: -71.0589 }); // Default to Boston

  return (
    <>
        <Header />

        {/* Hero section with background image and navigation buttons */}
        <div>
          <div className='relative h-80 sm:h-100'>
            <img src={bostonImage} alt="image of boston" className='w-screen h-80 sm:h-100 object-cover' />
            {/* Dark overlay for text readability */}
            <div className='absolute top-0 left-0 w-screen h-100 bg-black opacity-70'></div>

            {/* Navigation buttons to main features */}
            <Link to="/businesses" className='absolute top-45 sm:top-60 left-10 sm:left-100 rounded-3xl w-30 sm:w-45 text-center py-3 text-white font-semibold bg-olivedarkgreen text-xl hover:opacity-90 transform transition-transform duration-200 ease-in-out hover:scale-110'>Businesses</Link>
            <Link to="/events" className='absolute top-45 sm:top-60 right-10 sm:right-100 rounded-3xl w-30 sm:w-45 text-center py-3 text-white font-semibold bg-olivedarkgreen text-xl hover:opacity-90 transform transition-transform duration-200 ease-in-out hover:scale-110'>Events</Link>

            {/* Main headline */}
            <p className='absolute whitespace-nowrap top-20 left-1/2 -translate-x-1/2 font-bold text-xl sm:text-5xl text-white'>Find your next favorite spot today!</p>
          </div>
        </div>

        {/* Community testimonials section with rotating cards */}
        <div className='bg-olivegreen w-full relative h-100'>
          <p className='text-white text-5xl ml-10 font-bold pt-10 sm:pt-25 hidden w-130 sm:block'>The only community you need:</p>
          <p className='text-white text-2xl ml-5 font-bold pt-10 sm:hidden w-130'>The only community you need:</p>

          {/* Rotating testimonials carousel */}
          <div className='absolute top-55 sm:top-70 right-50 sm:right-40'>
            <CardSwap
              cardDistance={20}
              verticalDistance={30}
              delay={2000}
              pauseOnHover={false}
              width={500}
              height={225}
            >
              {/* First testimonial card */}
              <Card className="bg-white border-olivesepia">
                <div className='flex flex-row justify-between'>
                  <p className='text-xl font-bold ml-3 mt-2'>Buffalo Brickhouse Grill</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < 4} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                </div>
                <p className='ml-3'>-Amanda Peterson</p>
                <p className='mt-7 w-2/3 ml-3'>Fantastic meals with vibrant seasoning and a warm atmosphere. I also appreciated how clean everything was. It would be perfect if the menu had just a few more vegetarian options.</p>
              </Card>

              {/* Second testimonial card */}
              <Card className="bg-white border-olivesepia ">
                <div className='flex flex-row justify-between'>
                  <p className='text-xl font-bold ml-3 mt-2'>Niagara Street Smokehouse</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < 4} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                </div>
                <p className='ml-3'>-Marcus Hill</p>
                <p className='mt-7 w-2/3 ml-3'>Very flavorful food and generous serving sizes. The staff was welcoming and made sure we were taken care of quickly. The only downside is that the drinks were a bit pricier than expected.</p>
              </Card>

              {/* Third testimonial card */}
              <Card className="bg-white border-olivesepia ">
                <div className='flex flex-row justify-between'>
                  <p className='text-xl font-bold ml-3 mt-2'>Queen City Kitchen</p>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < 5} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                </div>
                <p className='ml-3'>-Sofia Alvarez</p>
                <p className='mt-7 w-2/3 ml-3'>Loved the smoky, grilled taste of the dishes and how fast everything came out. The service team was cheerful and attentive. My only issue was the noise level, which was higher than I prefer.</p>
              </Card>
            </CardSwap>
            </div>
        </div>

        {/* Interactive map section */}
        <div className='p-15 z-0 bg-olivetan'>
          <UserLocation onLocationFound={(c) => setCoords(c)} coords={coords} />
        </div>
        <Footer />
    </>
  )
}

export default Home