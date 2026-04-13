// BusinessesSignIn.jsx - Sign-in page for business users.
// This component provides a sign-in form for business owners, including email/password authentication, CAPTCHA verification, and account type validation.
// Redirects to business dashboard upon successful authentication.

import React, { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { UserAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../SupabaseClient'
import { Turnstile } from '@marsidev/react-turnstile'

// BusinessesSignIn functional component.
// Manages state for form inputs, loading, errors, and CAPTCHA token.
// Handles sign-in process with validation and navigation.
export default function BusinessesSignIn() {
  // State for toggling password visibility.
  const [showPassword, setShowPassword] = useState(false)

  // State for email input.
  const [email, setEmail] = useState("")

  // State for password input.
  const [password, setPassword] = useState("")

  // State for error messages.
  const [error, setError] = useState("")

  // State for loading indicator.
  const [loading, setLoading] = useState(false)

  // State for CAPTCHA token.
  const [captchaToken, setCaptchaToken] = useState(null)

  // Get sign-in and sign-out functions from auth context.
  const { signInUser, signOut } = UserAuth();

  // Hook for navigation.
  const navigate = useNavigate();

  // Function to handle form submission and sign-in.
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate CAPTCHA.
    if (!captchaToken) {
      setError("Please complete the security check.");
      setLoading(false);
      return;
    }

    try {
      // Attempt sign-in.
      const result = await signInUser(email, password, captchaToken);

      if (result.success) {
        // Check if account is business type.
        if (result.accountType === 'user') {
          await signOut();
          setError("This is not a Business account. Please use the regular login page.");
          setLoading(false);
          return;
        }
        // Navigate to dashboard on success.
        navigate('/businesses-dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-black text-olivedarkgreen mb-3 tracking-tight">Welcome back, Partner</h2>
            <p className="text-olivedarkgreen/60 text-lg">Log in to your NearMeer business dashboard.</p>
          </div>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-olivedarkgreen ml-4">Business Email</label>
              <input onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 rounded-full border-0 bg-white text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-4 focus:ring-olivesepia/20 focus:border-olivesepia transition-all outline-none" placeholder="owner@localshop.com" type="email"/>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4">
                <label className="block text-sm font-semibold text-olivedarkgreen">Password</label>
                <a className="text-sm font-medium text-olivesepia hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <input onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 rounded-full border-0 bg-white text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-4 focus:ring-olivesepia/20 focus:border-olivesepia transition-all outline-none" placeholder="••••••••" type={showPassword ? "text" : "password"}/>
                <button className="absolute right-5 top-1/2 -translate-y-1/2 text-olivedarkgreen/40 hover:text-olivesepia transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
            <div className='mx-auto mt-6'>
              <Turnstile
                siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
              />
            </div>
            <button onClick={handleSignIn} className="w-full py-4 bg-olivesepia text-white font-bold text-lg rounded-full hover:bg-olivesepia/90 hover:shadow-lg hover:shadow-olivesepia/30 active:scale-[0.98] transition-all" type="submit">
              Business Login
            </button>
          </form>
          {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-olivesepia/20"></div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <p className="text-olivedarkgreen/60">
              New to NearMeer? 
              <Link to="/businesses-sign-up" className="text-olivesepia font-bold hover:underline ml-1">Register your business</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}