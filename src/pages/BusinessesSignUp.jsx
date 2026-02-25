// BusinessesSignUp.jsx - Sign-up page for business users.
// This component provides a registration form for new business owners, including business details, email/password, CAPTCHA verification, and account creation.
// Upon successful sign-up, redirects to the business dashboard.

import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import expandIcon from '../assets/icons/expand.png'
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'
import { Link, useNavigate } from 'react-router-dom'

// BusinessesSignUp functional component.
// Manages state for form inputs, loading, errors, and CAPTCHA token.
// Handles sign-up process with validation and navigation.
export default function BusinessesSignUp() {
    // State for business name input.
    const [name, setName] = useState("")

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

    // Get sign-up and Google sign-in functions from auth context.
    const { signUpNewUser, signInWithGoogle } = UserAuth();

    // Hook for navigation.
    const navigate = useNavigate();

    // Function to handle form submission and sign-up.
    const handleSignUp = async (e) => {
      e.preventDefault();
      setError("");

      // Validate CAPTCHA.
      if (!captchaToken) {
        setError("Please complete the security check.");
        return;
      }

      setLoading(true);
      try {
        // Attempt sign-up with business account type.
        const result = await signUpNewUser(name, email, password, captchaToken, 'business');
        if (result.success) {
          // Navigate to dashboard on success.
          navigate('/businesses-dashboard');
        } else {
          // Display error message.
          setError(result.error?.message || result.error || "Sign up failed. Please try again.");
        }
      } catch (error) {
        // Handle unexpected errors.
        setError(error.message || "An unexpected error occurred.");
      }
      setLoading(false);
    };

    // Note: Google sign-in is not available for business accounts to maintain security and verification.
    return (
      <>
        {/* Header component. */}
        <Header />

        {/* Main sign-up form container. */}
        <div className="bg-white min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-md">
            {/* Page title and description. */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-olivedarkgreen">Grow your business with NearMeer.</h2>
              <p className="mt-3 text-olivedarkgreen/60">Join a community of local entrepreneurs and reach customers in your neighborhood.</p>
            </div>

            {/* Sign-up form. */}
            <form className="space-y-6" onSubmit={handleSignUp}>
              {/* Business name input field. */}
              <div>
                <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="business-name">Business Name</label>
                <div className="mt-2">
                  <input onChange={(e) => setName(e.target.value)} className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="business-name" name="business-name" placeholder="e.g., The Coffee Nook" required type="text"/>
                </div>
              </div>

              {/* Email input field. */}
              <div>
                <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="email">Business Email</label>
                <div className="mt-2">
                  <input onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="email" name="email" placeholder="hello@yourbusiness.com" required type="email"/>
                </div>
              </div>

              {/* Business category select dropdown. */}
              <div>
                <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="category">Business Category</label>
                <div className="mt-2 relative">
                  <select className="block w-full appearance-none rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="category" name="category">
                    <option disabled selected value="">Select a category</option>
                    <option value="retail">Retail &amp; Boutique</option>
                    <option value="food">Food &amp; Beverage</option>
                    <option value="services">Professional Services</option>
                    <option value="health">Health &amp; Wellness</option>
                    <option value="art">Art &amp; Craft</option>
                  </select>
                  {/* Custom dropdown arrow icon. */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
                    <img src={expandIcon} alt="Expand" className="w-5 h-5 text-olivedarkgreen/40" />
                  </div>
                </div>
              </div>

              {/* Password input field. */}
              <div>
                <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="password">Password</label>
                <div className="mt-2">
                  <input onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="password" name="password" placeholder="Minimum 8 characters" required type="password"/>
                </div>
              </div>

              {/* CAPTCHA verification component. */}
              <div className='mx-auto mt-6'>
                  <Turnstile
                      siteKey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
                      onSuccess={(token) => setCaptchaToken(token)}
                  />
              </div>

              {/* Submit button and error display. */}
              <div className="pt-4">
                <button className="flex w-full justify-center rounded-full bg-olivesepia px-6 py-4 text-sm font-bold leading-6 text-white shadow-lg hover:bg-olivesepia/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olivesepia transition-all active:scale-[0.98]" type="submit">
                  Create Business Account
                </button>
                {/* Display error message if present. */}
                {error && <p className='text-red-700 mx-auto pt-10'>{error}</p>}
              </div>
            </form>

            {/* Link to sign-in page. */}
            <p className="mt-10 text-center text-sm text-olivedarkgreen/60">
              Already have an account?
              <Link to="/businesses-sign-in" className="font-semibold leading-6 text-olivesepia hover:text-olivesepia/80 ml-1">Log in here</Link>
          </p>
          <p className="mt-6 text-center text-xs text-olivedarkgreen/40 px-6">
            By creating an account, you agree to NearMeer's 
            <a className="underline" href="#">Terms of Service</a> and 
            <a className="underline" href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}