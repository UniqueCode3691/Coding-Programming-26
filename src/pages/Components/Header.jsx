import React from 'react'
import NMLogo from '../../assets/NearMeerLogo.png'
import SearchLogo from "../../assets/search_image.svg"
import MenuImage from "../../assets/menu.svg"
import { Link } from "react-router-dom"

function Header() {
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSpinning, setIsSpinning] = React.useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', query)
  }

  function toggleNavbar() {
        setIsOpen(prevIsOpen => !prevIsOpen)
        setIsSpinning(true);
        setTimeout(() => {
            setIsSpinning(false);
        }, 500);
        console.log(isOpen)
  }

  return (
    <>
        <div className='bg-oliveleather w-full sm:h-20 h-15 flex flex-row items-center justify justify-between'>
            <img src={NMLogo} alt="NM Logo" className='sm:ml-3 sm:w-45 w-30 hover:opacity-90 transform transition-transform duration-200 ease-in-out hover:scale-110' />
                <div className="bg-white hidden sm:flex rounded-full sm:p-1.5 flex-row focus-within:border-2 hover:border-2 border-olivegreen">
                    <input
                    type="text"
                    placeholder="What's on your mind today?..."
                    onChange={(e) => handleSearch(e)}
                    className="sm:w-100 p-2 pl-5 focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                    <button className="w-5 mr-5">
                      <img src={SearchLogo} alt="searchlogo" />
                    </button>
                </div>
            <div className='my-auto flex flex-row'>
              <p className='sm:text-xl font-semibold my-auto'>Hi, asdfdasfdf</p>
              <div className='w-7 sm:w-12 h-7 sm:h-12  rounded-full bg-black text-white ml-2 sm:ml-5 sm:mr-5'></div>
            </div>
            <button onClick={toggleNavbar} className={`cursor-pointer sm:hidden`}>
              <img src={MenuImage} className={`w-7 sm:w-10 h-7 sm:hidden sm:h-10 mr-5 ${isSpinning ? 'animate-spin' : ''} transition-transform duration-1000 ease-in-out`} alt="menu image"/>
            </button>
        </div>
        <div className={` absolute right-0 flex flex-col font-semibold items-center text-lg ${isOpen ? "translate-x-0" : "translate-x-full"} transform transition-transform duration-500 ease-in-out z-50`}>
          <Link to="/" className='text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>Reviews</Link>
          <Link to="/" className='text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>Businesses</Link>
          <Link to="/" className='text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>Local Events</Link>
          <Link to="/" className='text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>Deals</Link>
          <Link to="/" className='text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>About Us</Link>
          <Link to="/" className='rounded-b-xl text-white py-2 px-10 transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90 w-full text-center block bg-olivesepia'>For Businesses</Link>
        </div>
        <div className='bg-olivesepia flex-row justify-evenly font-semibold text-lg hidden sm:flex'>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Reviews</Link>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Businesses</Link>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Local Events</Link>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>Deals</Link>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>About Us</Link>
          <Link to="/" className='p-2 text-white transform transition-transform duration-200 ease-in-out hover:scale-110 active:scale-110 hover:opacity-90'>For Businesses</Link>
        </div>
    </>
  )
}

export default Header