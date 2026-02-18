import React, { useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function BusinessesSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const { signInUser, signOut } = UserAuth();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const result = await signInUser(email, password, captchaToken);

        if (result.success) {
        if (result.accountType !== 'business') {
            await supabase.auth.signOut();
            setError("This is a Business account. Please use the Business Login page.");
            setLoading(false);
            return;
        }
        navigate('/');
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
            <button onClick={handleSignIn} className="w-full py-4 bg-olivesepia text-white font-bold text-lg rounded-full hover:bg-olivesepia/90 hover:shadow-lg hover:shadow-olivesepia/30 active:scale-[0.98] transition-all" type="submit">
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
          <div className="mt-12 text-center">
            <p className="text-olivedarkgreen/60">
              New to NearMeer? 
              <a className="text-olivesepia font-bold hover:underline ml-1" href="#">Register your business</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}