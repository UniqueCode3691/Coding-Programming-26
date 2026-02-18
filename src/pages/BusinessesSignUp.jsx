import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import expandIcon from '../assets/icons/expand.png'

export default function BusinessesSignUp() {
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-olivedarkgreen">Grow your business with NearMeer.</h2>
            <p className="mt-3 text-olivedarkgreen/60">Join a community of local entrepreneurs and reach customers in your neighborhood.</p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="business-name">Business Name</label>
              <div className="mt-2">
                <input className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="business-name" name="business-name" placeholder="e.g., The Coffee Nook" required type="text"/>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="email">Business Email</label>
              <div className="mt-2">
                <input autoComplete="email" className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="email" name="email" placeholder="hello@yourbusiness.com" required type="email"/>
              </div>
            </div>
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-6">
                  <img src={expandIcon} alt="Expand" className="w-5 h-5 text-olivedarkgreen/40" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold leading-6 text-olivedarkgreen ml-1" htmlFor="password">Password</label>
              <div className="mt-2">
                <input autoComplete="new-password" className="block w-full rounded-full border-0 py-4 px-6 text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-2 focus:ring-inset focus:ring-olivesepia sm:text-sm sm:leading-6 bg-white" id="password" name="password" placeholder="Minimum 8 characters" required type="password"/>
              </div>
            </div>
            <div className="pt-4">
              <button className="flex w-full justify-center rounded-full bg-olivesepia px-6 py-4 text-sm font-bold leading-6 text-white shadow-lg hover:bg-olivesepia/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olivesepia transition-all active:scale-[0.98]" type="submit">
                Create Business Account
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-olivedarkgreen/60">
            Already have an account?
            <a className="font-semibold leading-6 text-olivesepia hover:text-olivesepia/80 ml-1" href="#">Log in here</a>
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