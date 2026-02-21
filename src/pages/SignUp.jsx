import React, { useState } from 'react'
import SignUpImage from '../assets/signUpImage.avif'
import NMImage from '../assets/NearMeerLogoImgOnly.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [captchaToken, setCaptchaToken] = useState(null)
  const navigate = useNavigate()
  const { signUpNewUser } = UserAuth()

  const handleSignUp = async (e) => {
      e.preventDefault()
      if (!captchaToken) {
        setError("Please complete the security check.")
        return
      }
      setLoading(true)
      try {
        const result = await signUpNewUser(name, email, password, captchaToken, 'user')
  
        if (result.success)
        {
          navigate('/')
        }
      } catch (error)
      {
        setError(error.message)
      } finally
      {
        setLoading(false)
      }
    }

  return (
      <div className='flex flex-row'>
        <div className='flex w-1/2 h-screen'>
          <img src={SignUpImage} alt="Background image for town" className='h-full object-cover' />
          <div className='absolute top-0 left-0 h-full w-1/2 bg-black opacity-30'></div>
          <div className='absolute bottom-15 left-15 w-1/3'>
            <Link className='flex flex-row transform transition-transform duration-200 ease-in-out hover:scale-110' to="/">
              <img src={NMImage} alt="NearMeer Logo" className='w-10 h-10' />
              <p className='text-white my-auto ml-2 font-semibold text-2xl'>NearMeer</p>
            </Link>
            <br />
            <p className='text-white font-semibold text-5xl'>Empowering neighborhoods through discovery.</p>
            <br />
            <p className='text-white text-xl'>Join thousands of community members sharing reviews and finding the best hidden gems in your area.</p>
          </div>
        </div>
        <div className='flex flex-col w-1/2 h-screen bg-olivetan overflow-y-auto'>
          <p className='text-4xl font-semibold mx-auto mt-8'>Howdy, neighbor!</p>
          <p className='mt-3 w-1/2 mx-auto text-xl text-olivegreen'>Discover the best local businesses and share your experiences with neighbors!</p>
          <form onSubmit={handleSignUp} className='flex flex-col mx-auto mt-10'>
            <p className='ml-2 font-semibold text-md mb-2'>First Name:</p>
            <input onChange={(e) => setName(e.target.value)} placeholder='Enter your name:' type="text" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>
            <p className='mt-3 ml-2 font-semibold text-md mb-2'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email:' type="email" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>
            <div className='flex flex-row justify-between'>
              <p className='ml-2 font-semibold text-md mb-2 mt-3'>Password:</p>
              <Link className='text-red-700 mt-5'>Forgot Password?</Link>
            </div>
            <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password:' type="password" className=" w-100 p-4 px-5  bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen" />
            <div className='mx-auto mt-3'>
                <Turnstile 
                    siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)} 
                />
            </div>
            <button type='submit' disabled={loading} className='text-xl mt-3 bg-olivegreen py-3 rounded-full font-semibold transform transition-transform duration-200 ease-in-out hover:scale-110'>
              Sign Up
            </button>
            {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}
            <div className='flex justify-between flex-row mt-3'>
                <hr className='w-40 my-auto border-gray-400' />
              <p className='text-gray-400 font-semibold'>OR</p>
              <hr className='w-40 border-gray-400 my-auto' />
            </div>
            <p className='text-center mt-3 font-semibold'>Been here before? <Link className='text-olivegreen hover:underline' to='/sign-in'>Sign in!</Link></p>
          </form>
        </div>
      </div>
  )
}

export default SignUp