import React, { useState } from 'react'
import SignUpImage from '../assets/signUpImage.avif'
import NMImage from '../assets/NearMeerLogoImgOnly.png'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'

// SignUp component: This component renders the sign-up page for new users.
// It provides a form for users to create an account with email/password or Google OAuth.
// The component handles form validation, CAPTCHA verification, and user registration.
// Upon successful sign-up, users are redirected to the home page.
// It uses state to manage form inputs, loading states, errors, and CAPTCHA tokens.
// Integrates with AuthContext for authentication logic and Supabase for backend operations.
const SignUp = () => {
  // State variables to manage form inputs and component state
  // name: Stores the user's first name input
  // email: Stores the user's email input
  // password: Stores the user's password input
  // error: Stores any error messages to display to the user
  // loading: Boolean to indicate if a sign-up process is in progress (disables submit button)
  // captchaToken: Stores the CAPTCHA token from Turnstile for security verification
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")
  const [captchaToken, setCaptchaToken] = useState(null)

  // useNavigate hook from React Router for programmatic navigation
  const navigate = useNavigate()

  // Destructure authentication functions from AuthContext
  // signUpNewUser: Function to sign up a new user with email/password
  // signInWithGoogle: Function to sign in with Google OAuth
  const { signUpNewUser, signInWithGoogle } = UserAuth()

  // handleSignUp function: Handles the form submission for user sign-up
  // Validates CAPTCHA token, sets loading state, calls signUpNewUser from context
  // On success, navigates to home page; on error, displays error message
  const handleSignUp = async (e) => {
      e.preventDefault()  // Prevent default form submission behavior
      if (!captchaToken) {  // Check if CAPTCHA is completed
        setError("Please complete the security check.")
        return
      }
      setLoading(true)  // Set loading to true to disable button and show progress
      try {
        // Call signUpNewUser with form data, CAPTCHA token, and user type
        const result = await signUpNewUser(name, email, password, captchaToken, 'user')
  
        if (result.success)  // If sign-up successful
        {
          navigate('/')  // Navigate to home page
        }
      } catch (error)  // Catch any errors during sign-up
      {
        setError(error.message)  // Set error message to display
      } finally  // Always execute, regardless of success or failure
      {
        setLoading(false)  // Reset loading state
      }
    }

  // handleGoogleSignIn function: Handles Google OAuth sign-in
  // Sets loading state, clears errors, calls signInWithGoogle from context
  // If unsuccessful, sets error message and resets loading
  const handleGoogleSignIn = async () => {
    setLoading(true)  // Set loading to true
    setError("")  // Clear any previous errors
    const result = await signInWithGoogle()  // Attempt Google sign-in
    
    if (!result.success) {  // If sign-in failed
      setError(result.error)  // Set error message
      setLoading(false)  // Reset loading state
    }
  }

  // JSX return: Renders the sign-up page UI
  // The page is split into two halves: left side with background image and branding,
  // right side with the sign-up form
  return (
      <div className='flex flex-row'>  {/* Main container with flex row layout */}
        {/* Left side: Background image with overlay and branding */}
        <div className='flex w-1/2 h-screen'>  {/* Container for left half */}
          <img src={SignUpImage} alt="Background image for town" className='h-full object-cover' />  {/* Background image */}
          <div className='absolute top-0 left-0 h-full w-1/2 bg-black opacity-30'></div>  {/* Dark overlay for text readability */}
          <div className='absolute bottom-15 left-15 w-1/3'>  {/* Branding section positioned at bottom left */}
            <Link className='flex flex-row transform transition-transform duration-200 ease-in-out hover:scale-110' to="/">  {/* Logo link with hover effect */}
              <img src={NMImage} alt="NearMeer Logo" className='w-10 h-10' />  {/* Logo image */}
              <p className='text-white my-auto ml-2 font-semibold text-2xl'>NearMeer</p>  {/* Logo text */}
            </Link>
            <br />
            <p className='text-white font-semibold text-5xl'>Empowering neighborhoods through discovery.</p>  {/* Tagline */}
            <br />
            <p className='text-white text-xl'>Join thousands of community members sharing reviews and finding the best hidden gems in your area.</p>  {/* Description */}
          </div>
        </div>
        {/* Right side: Sign-up form */}
        <div className='flex flex-col w-1/2 h-screen bg-olivetan overflow-y-auto'>  {/* Container for right half with background color and scroll */}
          <p className='text-4xl font-semibold mx-auto mt-8'>Howdy, neighbor!</p>  {/* Welcome heading */}
          <p className='mt-3 w-1/2 mx-auto text-xl text-olivegreen'>Discover the best local businesses and share your experiences with neighbors!</p>  {/* Subheading */}
          {/* Sign-up form */}
          <form onSubmit={handleSignUp} className='flex flex-col mx-auto mt-10'>  {/* Form with submit handler */}
            <p className='ml-2 font-semibold text-md mb-2'>First Name:</p>  {/* Label for name input */}
            <input onChange={(e) => setName(e.target.value)} placeholder='Enter your name:' type="text" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>  {/* Name input field */}
            <p className='mt-3 ml-2 font-semibold text-md mb-2'>Email:</p>  {/* Label for email input */}
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email:' type="email" className="w-100 p-4 px-5 bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen"/>  {/* Email input field */}
            <div className='flex flex-row justify-between'>  {/* Container for password label and forgot password link */}
              <p className='ml-2 font-semibold text-md mb-2 mt-3'>Password:</p>  {/* Label for password input */}
              <Link className='text-red-700 mt-5'>Forgot Password?</Link>  {/* Forgot password link (placeholder) */}
            </div>
            <input onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password:' type="password" className=" w-100 p-4 px-5  bg-white focus:outline-none focus:ring-0 focus:border-transparent rounded-full focus-within:border-2 hover:border-2 border-olivegreen" />  {/* Password input field */}
            {/* CAPTCHA widget for security */}
            <div className='mx-auto mt-3'>  {/* Container for CAPTCHA */}
                <Turnstile 
                    siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}  // Site key from environment variables 
                    onSuccess={(token) => setCaptchaToken(token)}   // Callback to set CAPTCHA token on success
                />
            </div>
            {/* Submit button */}
            <button type='submit' disabled={loading} className='text-xl mt-3 bg-olivegreen py-3 rounded-full font-semibold transform transition-transform duration-200 ease-in-out hover:scale-110'>  {/* Submit button with loading state and hover effect */}
              Sign Up
            </button>
            {/* Error message display */}
            {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}  {/* Conditional error message */}
            {/* Divider for alternative sign-up methods */}
            <div className='flex justify-between flex-row mt-3'>  {/* OR divider */}
                <hr className='w-40 my-auto border-gray-400' />  {/* Left horizontal line */}
              <p className='text-gray-400 font-semibold'>OR</p>  {/* OR text */}
              <hr className='w-40 border-gray-400 my-auto' />  {/* Right horizontal line */}
            </div>
            {/* Google sign-in button */}
            <div class="flex justify-center gap-4 mt-3">  {/* Container for Google button */}
              <button onClick={handleGoogleSignIn} class="flex items-center justify-center px-5 h-14 rounded-full border border-[#dde7d0] dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all group">  {/* Google sign-in button */}
                <svg class="w-6 h-6" fill="currentColor" viewbox="0 0 24 24">  {/* Google logo SVG */}
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <p className='ml-3 font-semibold text-lg'>Sign up with Google</p>  {/* Button text */}
              </button>
            </div>
            {/* Link to sign-in page */}
            <p className='text-center mt-3 font-semibold'>Been here before? <Link className='text-olivegreen hover:underline' to='/sign-in'>Sign in!</Link></p>  {/* Sign-in link */}
          </form>
        </div>
      </div>
  )
}

export default SignUp