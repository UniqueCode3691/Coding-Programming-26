import React, { useState } from 'react'
import LoginImage from '../assets/neighborhood.jpg'
import NMImage from '../assets/NearMeerLogoImgOnly.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'
import { supabase } from '../SupabaseClient'

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const navigate = useNavigate()
  const { session, signInUser, sendMagicLink } = UserAuth()
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await sendMagicLink(email);
    if (result.success) {
        setLinkSent(true);
    } else {
        setError(result.error);
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Please complete the security check.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await signInUser(email, password, captchaToken);
      if (result.success) {
        if (result.accountType === 'business') {
          await supabase.auth.signOut();
          setError("This is a Business account. Please use the Business Login page.");
          setLoading(false);
          return;
        }
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className='flex flex-row'>
        <div className='flex w-1/2 h-screen'>
          <img src={LoginImage} alt="Background image for town" className='h-full object-cover' />
          <div className='absolute top-0 left-0 h-full w-1/2 bg-black opacity-30'></div>
          <div className='absolute bottom-15 left-15 w-1/3'>
            <Link className='flex flex-row transform transition-transform duration-200 ease-in-out hover:scale-110' to="/">
              <img src={NMImage} alt="NearMeer Logo" className='w-10 h-10' />
              <p className='text-white my-auto ml-2 font-semibold text-2xl'>NearMeer</p>
            </Link>
            <br />
            <p className='text-white font-semibold text-5xl'>Support the heart of your town.</p>
            <br />
            <p className='text-white text-xl'>Discover unique local businesses, read authentic reviews, and connect with your neighbors in a meaningful way.</p>
          </div>
        </div>
        <div className='flex flex-col w-1/2 h-screen bg-olivetan overflow-y-auto'>
          <p className='text-4xl font-semibold mx-auto mt-15'>Welcome back, neighbor!</p>
          <p className='mt-3 mx-auto text-xl text-olivegreen'>Sign in to see what's happening in your community today!</p>
          {linkSent ? (
            <div className='mt-10 mx-15 p-6 bg-white border-2 border-olivegreen rounded-3xl text-center shadow-sm'>
              <p className='font-bold text-olivegreen text-lg'>Check your inbox!</p>
              <p className='text-gray-600 mt-2'>We sent a login link to <strong>{email}</strong>.</p>
              <button onClick={() => setLinkSent(false)} className='mt-4 text-sm underline text-gray-500'>Back to password login</button>
            </div>
          ): (
          <form onSubmit={handleSignIn} className='flex flex-col mx-auto mt-15'>
            <p className='ml-2 font-semibold text-md mb-2'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email:' type="email" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>
            <div className='flex flex-row justify-between'>
              <p className='ml-2 font-semibold text-md mb-2 mt-5'>Password:</p>
              <button onClick={handleMagicLink} type="button" className='text-red-700 mt-5'>Forgot Password?</button>
            </div>
            <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password:' type="password" className=" w-100 p-4 px-5  bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen" />
            <div className='mx-auto mt-6'>
                <Turnstile 
                    siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)} 
                />
            </div>
            <button type='submit' disabled={loading} className='text-xl mt-10 bg-olivegreen py-3 rounded-full font-semibold transform transition-transform duration-200 ease-in-out hover:scale-110'>
              {loading ? "Signing in..." : "Login"}
            </button>
            {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}
            <div className='flex justify-between flex-row mt-5'>
              <hr className='w-40 my-auto border-gray-400' />
              <p className='text-gray-400 font-semibold'>OR</p>
              <hr className='w-40 border-gray-400 my-auto' />
            </div>
          </form>
          )}
            <p className='text-center mt-4 font-semibold'>New to the neighborhood? <Link className='text-olivegreen hover:underline' to='/sign-up'>Create an account!</Link></p>
        </div>
      </div>
  )
}

export default SignIn