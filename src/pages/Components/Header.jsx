// Header.jsx - Header component for the NearMeer application.
// This component displays the navigation bar with logo, search, menu, and user profile options.
// It handles search functionality, navigation, and user authentication display.

import React from 'react'
import NMLogo from '../../assets/NearMeerLogo.png'
import SearchLogo from "../../assets/search_image.svg"
import MenuImage from "../../assets/menu.svg"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from '../../context/AuthContext'

// Header functional component.
// Manages state for search query, profile dropdown, mobile menu, and spinning animation.
function Header() {
  const [query, setQuery] = React.useState("")
  const [profileOpen, setProfileOpen] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSpinning, setIsSpinning] = React.useState(false)
  const {session, signOut} = UserAuth()
  const navigate = useNavigate()

  // Function to handle search submission.
  // Navigates to businesses page with search query.
  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(query)}`)
      setQuery("")
    }
  }

  // Function to toggle mobile navbar menu.
  // Sets spinning animation for the menu icon.
  function toggleNavbar() {
        setIsOpen(prevIsOpen => !prevIsOpen)
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
        }, 500);
  }

  // Function to handle user sign out.
  // Calls signOut from context, clears profile open, and navigates to home.
  const handleSignOut = async (e) => {
    e.preventDefault()
    try {
      const result = await signOut()
      if (result && result.success === false) {
        console.error('Sign out failed:', result.error)
        return
      }
      setProfileOpen(false)
      navigate('/')
    } catch (err) {
      console.log("Error signing out: ", err)
    }
  }

  return (
    <>
        {/* Main header bar with logo, search, and user options. */}
        <div className='bg-oliveleather w-full sm:h-20 h-15 flex flex-row items-center justify justify-between'>
            {/* Logo link to home. */}
            <Link to="/">
              <img src={NMLogo} alt="NM Logo" className='sm:ml-3 sm:w-45 w-30 hover:opacity-90 transform transition-transform duration-200 ease-in-out hover:scale-110' />
            </Link>
                {/* Search form, hidden on small screens. */}
                <form onSubmit={handleSearch} className="bg-white hidden sm:flex rounded-full sm:p-1.5 flex-row focus-within:border-2 hover:border-2 border-olivegreen">
                    <input
                    type="text"
                    placeholder="What's on your mind today?..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="sm:w-100 p-2 pl-5 focus:outline-none text-black focus:ring-0 focus:border-transparent"
                    />
                    <button type="submit" className="w-5 mr-5 cursor-pointer">
                      <img src={SearchLogo} alt="searchlogo" />
                    </button>
                </form>
              {/* User profile section if logged in. */}
              {session && <div className='my-auto flex flex-row mr-5'>
                <p className='sm:text-xl font-semibold my-auto'>Hi, {session?.user?.user_metadata?.name?.split(' ')[0]}</p>
                  <div 
                      onClick={() => setProfileOpen(!profileOpen)}
                      className='w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white ml-3 cursor-pointer flex items-center justify-center font-bold border-2 border-transparent hover:border-olivegreen transition-all'
                  >
                      {session?.user?.user_metadata?.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Profile dropdown menu. */}
                  {profileOpen && (
                    <div className='absolute right-0 top-14 w-48 bg-white rounded-xl shadow-lg py-2 z-[100] border border-gray-200'>
                      <div className='px-4 py-2 border-b border-gray-100 md:hidden'>
                          <p className='font-bold text-olivegreen'>{session?.user?.user_metadata?.name}</p>
                      </div>
                      {/* Link to profile or business dashboard based on account type. */}
                      {session?.user?.user_metadata?.account_type === 'user' ? <Link to="/profile" className='block px-4 py-2 hover:bg-olivetan text-black transition-colors'>My Profile</Link> : <Link to="/businesses-dashboard" className='block text-black px-4 py-2 hover:bg-olivetan transition-colors'>My Business Profile</Link>}
                      {/* Sign out button. */}
                      <button 
                          onClick={handleSignOut}
                          className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold transition-colors'
                      >
                          Sign Out
                      </button>
                    </div>
                  )}
            </div>}
            {/* Sign in link if not logged in. */}
            {!session && <Link to="/sign-in" className='my-auto ml-2 mr-5 font-semibold text-xl hover:cursor-pointer'>Sign In</Link>}
            {/* Mobile menu button. */}
            <button onClick={toggleNavbar} className={`cursor-pointer sm:hidden`}>
              <img src={MenuImage} className={`w-7 sm:w-10 h-7 sm:hidden sm:h-10 mr-5 ${isSpinning ? 'animate-spin' : ''} transition-transform duration-1000 ease-in-out`} alt="menu image"/>
            </button>
        </div>
        {/* Navigation links bar, hidden on small screens. */}
        <div className='bg-olivesepia flex-row justify-evenly font-semibold text-lg hidden sm:flex'>
          <Link to="/businesses" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Businesses</Link>
          <Link to="/events" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Local Events</Link>
          <Link to="/deals" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Deals</Link>
          <Link to="/about-us" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>About Us</Link>
          <Link to="/for-businesses" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>For Businesses</Link>
        </div>
    </>
  )
}

export default Header