import React, { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'

export default function BusinessesSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  

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
              <input className="w-full px-6 py-4 rounded-full border-0 bg-white text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-4 focus:ring-olivesepia/20 focus:border-olivesepia transition-all outline-none" placeholder="owner@localshop.com" type="email"/>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-4">
                <label className="block text-sm font-semibold text-olivedarkgreen">Password</label>
                <a className="text-sm font-medium text-olivesepia hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <input className="w-full px-6 py-4 rounded-full border-0 bg-white text-olivedarkgreen shadow-sm ring-1 ring-inset ring-olivesepia/30 placeholder:text-olivedarkgreen/40 focus:ring-4 focus:ring-olivesepia/20 focus:border-olivesepia transition-all outline-none" placeholder="••••••••" type={showPassword ? "text" : "password"}/>
                <button className="absolute right-5 top-1/2 -translate-y-1/2 text-olivedarkgreen/40 hover:text-olivesepia transition-colors" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <input className="w-5 h-5 rounded border-olivesepia/30 text-olivesepia focus:ring-olivesepia cursor-pointer" id="remember" type="checkbox"/>
              <label className="text-sm text-olivedarkgreen/60 cursor-pointer select-none" htmlFor="remember">Remember this device</label>
            </div>
            <button className="w-full py-4 bg-olivesepia text-white font-bold text-lg rounded-full hover:bg-olivesepia/90 hover:shadow-lg hover:shadow-olivesepia/30 active:scale-[0.98] transition-all" type="submit">
              Business Login
            </button>
          </form>
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-olivesepia/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-olivedarkgreen/60 font-medium">Or continue with business accounts</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-6 rounded-full border-2 border-olivesepia/20 hover:bg-olivetan transition-colors">
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAIXUsN73oiTOrJyIb5YPOy2T_DTfYdeCdCcIKE-mWY04aB1ce-LFwE_daWsr15V3RxSyzXANeLffwOb9Cq6q_t2x5vAb2qU1jnda6DlpIZjlybCk3IjAjaz1efIsXlG3HDUTtfAjcMZm5xvvv-uXBKk5VzaKzD3x3VGF8jes1waGRfEHuVy38DhPHZoocjlZb1RTZ7Zki6eWaTJSJEmd851gHz_WrU7la4FO9DN4eq486cq5mmeVMsGYMuPanWCd-132OhQuVdzJe"/>
              <span className="text-sm font-semibold text-olivedarkgreen">Google</span>
            </button>
          </div>
          <div className="mt-12 text-center">
            <p className="text-olivedarkgreen/60">
              New to NearMeer? 
              <a className="text-olivesepia font-bold hover:underline ml-1" href="#">Register your business</a>
            </p>
          </div>
          <div className="mt-auto pt-12 flex gap-6 text-xs text-olivedarkgreen/40 font-medium">
            <a className="hover:text-olivesepia transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-olivesepia transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-olivesepia transition-colors" href="#">Help Center</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}