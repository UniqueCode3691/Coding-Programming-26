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
  const { session, signUpNewUser, signInWithGoogle } = UserAuth()

  const handleSignUp = async (e) => {
      e.preventDefault()
      if (!captchaToken) {
        setError("Please complete the security check.")
        return
      }
      setLoading(true)
      try {
        const result = await signUpNewUser(name, email, password)
  
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

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError("")
    const result = await signInWithGoogle()
    
    if (!result.success) {
      setError(result.error)
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
            <div class="flex justify-center gap-4 mt-3">
              <button onClick={handleGoogleSignIn} class="flex items-center justify-center px-5 h-14 rounded-full border border-[#dde7d0] dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all group">
                <svg class="w-6 h-6" fill="currentColor" viewbox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <p className='ml-3 font-semibold text-lg'>Sign up with Google</p>
              </button>
            </div>
            <p className='text-center mt-3 font-semibold'>Been here before? <Link className='text-olivegreen hover:underline' to='/sign-in'>Sign in!</Link></p>
          </form>
        </div>
      </div>
  )
}

export default SignUp