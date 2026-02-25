// SignIn.jsx - User sign-in page component.
// This component provides multiple authentication methods: email/password, Google OAuth, and magic link.
// Includes CAPTCHA verification and handles business account detection to redirect to appropriate login.

import React, { useState } from 'react'
import LoginImage from '../assets/neighborhood.jpg'
import NMImage from '../assets/NearMeerLogoImgOnly.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'
import { supabase } from '../SupabaseClient'

// SignIn functional component.
// Manages user authentication state and provides multiple sign-in options.
// Handles form validation, CAPTCHA, and navigation after successful login.
const SignIn = () => {
  // State for form inputs.
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // State for error messages and loading status.
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // State for CAPTCHA token.
  const [captchaToken, setCaptchaToken] = useState(null)

  // Navigation hook.
  const navigate = useNavigate()

  // Auth context functions.
  const { session, signInUser, signInWithGoogle, sendMagicLink, signOut } = UserAuth()

  // State for magic link mode and success status.
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  // Function to handle magic link authentication.
  // Sends passwordless login link to user's email.
  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await sendMagicLink(email, captchaToken);
    if (result.success) {
        setLinkSent(true);
    } else {
        setError(result.error);
    }
    setLoading(false);
  };

  // Function to handle email/password sign-in.
  // Validates CAPTCHA, calls auth function, and handles business account detection.
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
            await signOut();
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

  // Function to handle Google OAuth sign-in.
  // Initiates OAuth flow and handles navigation on success.
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    // If Supabase returned an OAuth URL, the browser will be redirected and
    // this code won't continue. If a session was returned immediately
    // (e.g. popup flow), navigate to the app home.
    if (result.session) {
      navigate('/');
    }
    setLoading(false);
  };

  return (
      <div className='flex flex-row'>
        {/* Left side - Background image and branding */}
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

        {/* Right side - Sign-in form */}
        <div className='flex flex-col w-1/2 h-screen bg-olivetan overflow-y-auto'>
          <p className='text-4xl font-semibold mx-auto mt-15'>Welcome back, neighbor!</p>
          <p className='mt-3 mx-auto text-xl text-olivegreen'>Sign in to see what's happening in your community today!</p>

          {/* Magic link success message */}
          {linkSent ? (
            <div className='mt-10 mx-15 p-6 bg-white border-2 border-olivegreen rounded-3xl text-center shadow-sm'>
              <p className='font-bold text-olivegreen text-lg'>Check your inbox!</p>
              <p className='text-gray-600 mt-2'>We sent a login link to <strong>{email}</strong>.</p>
              <button onClick={() => setLinkSent(false)} className='mt-4 text-sm underline text-gray-500'>Back to password login</button>
            </div>
          ): (
          <form onSubmit={handleSignIn} className='flex flex-col mx-auto mt-15'>
            {/* Email input */}
            <p className='ml-2 font-semibold text-md mb-2'>Email:</p>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email:' type="email" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>

            {/* Password input with forgot password link */}
            <div className='flex flex-row justify-between'>
              <p className='ml-2 font-semibold text-md mb-2 mt-5'>Password:</p>
              <button onClick={handleMagicLink} type="button" className='text-red-700 mt-5'>Forgot Password?</button>
            </div>
            <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password:' type="password" className=" w-100 p-4 px-5  bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen" />

            {/* CAPTCHA verification */}
            <div className='mx-auto mt-6'>
                <Turnstile
                    siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                    onSuccess={(token) => setCaptchaToken(token)}
                />
            </div>

            {/* Sign-in button */}
            <button type='submit' disabled={loading} className='text-xl mt-10 bg-olivegreen py-3 rounded-full font-semibold transform transition-transform duration-200 ease-in-out hover:scale-110'>
              {loading ? "Signing in..." : "Login"}
            </button>

            {/* Error message display */}
            {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}

            {/* Divider */}
            <div className='flex justify-between flex-row mt-5'>
              <hr className='w-40 my-auto border-gray-400' />
              <p className='text-gray-400 font-semibold'>OR</p>
              <hr className='w-40 border-gray-400 my-auto' />
            </div>
          </form>
          )}

          {/* Google sign-in button */}
          <div className="flex justify-center gap-4 mt-5">
              <button onClick={handleGoogleSignIn} className="flex items-center justify-center px-5 h-14 rounded-full border border-[#dde7d0] dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all group">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <p className='ml-3 font-semibold text-lg'>Sign in with Google</p>
              </button>
            </div>

            {/* Sign-up link */}
            <p className='text-center mt-4 font-semibold'>New to the neighborhood? <Link className='text-olivegreen hover:underline' to='/sign-up'>Create an account!</Link></p>
        </div>
      </div>
  )
}

export default SignIn