import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Link } from 'react-router-dom'
import visibilityIcon from '../assets/icons/visibility.png'
import reviewsIcon from '../assets/icons/reviews.png'
import barchartIcon from '../assets/icons/barchart.png'
import trendingupIcon from '../assets/icons/trendingup.png'
import checkcircleIcon from '../assets/icons/checkcircle.png'
import Star from './Components/Star'
import Chatbot from './Components/Chatbot';


export default function ForBusinesses() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      
      <main className="max-w-[1200px] mx-auto px-6 flex-1">
        <section className="py-16 md:py-24">
          <div className="flex flex-col gap-10 md:flex-row items-center">
            <div className="flex-1 flex flex-col gap-8 order-2 md:order-1">
              <div className="flex flex-col gap-4">
                <h1 className="text-olivegreen text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                  Grow your business with NearMeer
                </h1>
                <p className="text-lg md:text-xl text-olivedarkgreen font-normal leading-relaxed max-w-[540px]">
                  Connect with your local community, build trust through reviews, and scale your operations with data-driven insights.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/businesses-sign-up" className="flex min-w-[180px] items-center justify-center rounded-full h-14 px-8 bg-olivesepia text-white text-lg font-bold tracking-wide shadow-lg shadow-olivesepia/20 hover:scale-105 transition-transform">
                  Sign Up
                </Link>
                <Link to="/businesses-sign-in" className="flex min-w-[180px] items-center justify-center rounded-full h-14 px-8 border-2 border-olivesepia text-olivesepia text-lg font-bold tracking-wide hover:bg-olivesepia/5 transition-colors">
                  Log In
                </Link>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2 w-full">
              <div className="relative group">
                <div className="absolute -inset-4 bg-olivesepia/10 rounded-xl blur-2xl group-hover:bg-olivesepia/20 transition-all"></div>
                <div className="relative w-full aspect-video md:aspect-[4/3] bg-center bg-no-repeat bg-cover rounded-xl shadow-2xl overflow-hidden" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6za4SKzdWX5KfIQsRlEEvvgr8qSYRENlbdAELX7mneia0Zbu9XRntXbxSdvIgMZZl6tGbXQhpk6qJMGyjzD-3SIahquHf4V7xFK3Mj6gFq7jjTY9Nx8SL1VeBsoRADRbHg8plY_O4YWvRUZLW0OwmTzi8_1f4msFcBB1TtNtPKX4P6Bilut_JSU41-n969dyFIpZybHkm78PnEImvX4UUjO_ucYLnv-M3w_n27f6cgwn5P4TiR_BBPFamTJtNPDxR-fFFdAxUqo0T")'}}></div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 border-t border-olivetan" id="benefits">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-[720px]">
              <h2 className="text-olivesepia text-sm font-bold uppercase tracking-[0.2em]">Why Choose Us</h2>
              <h3 className="text-olivegreen text-4xl font-bold leading-tight">Everything you need to thrive in your neighborhood.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-4 rounded-lg border border-olivetan bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="size-12 rounded-full bg-olivesepia/10 text-olivesepia flex items-center justify-center">
                  <img src={visibilityIcon} alt="Visibility Icon" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-olivegreen">Local Visibility</h4>
                  <p className="text-olivedarkgreen leading-relaxed">
                    Get discovered by neighbors looking for your specific services. Our hyper-local SEO ensures you show up when it matters most.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-olivetan bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="size-12 rounded-full bg-olivesepia/10 text-olivesepia flex items-center justify-center">
                  <img src={reviewsIcon} alt="Reviews Icon" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-olivegreen">Trusted Reviews</h4>
                  <p className="text-olivedarkgreen leading-relaxed">
                    Build trust through authentic community feedback. Respond to reviews and show customers you value their experience.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border border-olivetan bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="size-12 rounded-full bg-olivesepia/10 text-olivesepia flex items-center justify-center">
                  <img src={barchartIcon} alt="Analytics Icon" />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-xl font-bold text-olivegreen">Smart Analytics</h4>
                  <p className="text-olivedarkgreen leading-relaxed">
                    Understand your foot traffic and online engagement with simplified charts. Make decisions based on real community data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-10" id="analytics">
          <h2 className="text-olivegreen text-3xl font-bold leading-tight tracking-tight mb-6">Powerful Analytics at your fingertips</h2>
          <div className="flex flex-wrap gap-6">
            <div className="flex min-w-[320px] flex-1 flex-col gap-4 rounded-xl border border-olivetan bg-white p-8">
              <div>
                <p className="text-olivedarkgreen text-sm font-semibold uppercase">Profile Visits</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-olivegreen text-4xl font-bold tracking-tight">12,450</p>
                  <p className="text-green-600 text-sm font-bold flex items-center">
                    <img src={trendingupIcon} alt="Trending Up Icon" className="w-6 h-6 mr-1"/> +15.4%
                  </p>
                </div>
              </div>
              <div className="flex min-h-[180px] flex-1 flex-col gap-4 py-4">
                <svg fill="none" height="140" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear)"></path>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#DDA15E" strokeLinecap="round" strokeWidth="3"></path>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                      <stop stopColor="#DDA15E" stopOpacity="0.2"></stop>
                      <stop offset="1" stopColor="#DDA15E" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between text-olivedarkgreen text-xs font-bold tracking-widest px-1">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                </div>
              </div>
            </div>
            <div className="flex min-w-[320px] flex-1 flex-col gap-4 rounded-xl border border-olivetan bg-white p-8">
              <div>
                <p className="text-olivedarkgreen text-sm font-semibold uppercase">Review Growth</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <p className="text-olivegreen text-4xl font-bold tracking-tight">+128</p>
                  <p className="text-green-600 text-sm font-bold flex items-center">
                    <img src={trendingupIcon} alt="Trending Up Icon" className="w-6 h-6 mr-1"/> +8.2%
                  </p>
                </div>
              </div>
              <div className="grid min-h-[140px] grid-flow-col gap-4 grid-rows-[1fr_auto] items-end justify-items-center px-2 mt-4">
                <div className="bg-olivesepia/20 rounded-t-md w-full hover:bg-olivesepia/40 transition-colors" style={{height: '90%'}}></div>
                <p className="text-olivedarkgreen text-[11px] font-bold">WK 1</p>
                <div className="bg-olivesepia/20 rounded-t-md w-full hover:bg-olivesepia/40 transition-colors" style={{height: '60%'}}></div>
                <p className="text-olivedarkgreen text-[11px] font-bold">WK 2</p>
                <div className="bg-olivesepia/20 rounded-t-md w-full hover:bg-olivesepia/40 transition-colors" style={{height: '75%'}}></div>
                <p className="text-olivedarkgreen text-[11px] font-bold">WK 3</p>
                <div className="bg-olivesepia/60 rounded-t-md w-full hover:bg-olivesepia transition-colors" style={{height: '100%'}}></div>
                <p className="text-olivesepia text-[11px] font-bold">WK 4</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-olivesepia/5 rounded-lg mb-24 overflow-hidden" id="success">
          <div className="px-8 md:px-16 flex flex-col gap-12">
            <div className="flex flex-col gap-2 items-center text-center">
              <h2 className="text-olivegreen text-3xl font-bold">Success Stories</h2>
              <p className="text-olivedarkgreen">Hear from the business owners who grow with us.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-6">
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < 5} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                <p className="italic text-lg text-olivegreen leading-relaxed">
                  "NearMeer increased our foot traffic by 30% in three months. The review management tools are a lifesaver for our bakery."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuACs5WKLGqeiS-g2uCADcn0ikGD0UJtf3hvnbfNGqb76JpJH8OvifgdEiNtWQHacj--9pUnxEDkW9Gph32-euchGhVyT-XIsQy8AnUSkUxuDeAt5eRctvlqzgbDsHhYGud6Ktc5sudKNunnrvjfLVLa0noPm3YWMBUA-rr6TU1T_EBgZRq78cKfRlrIgLIlUdW_LJzFlsVR4AVIBRAPSLHzqr_b-OYC8wJMX0BI-sE1NCyahicjTP4Tbg58Dfaqru4Qdgis_Zq4LOUc")'}}></div>
                  <div>
                    <p className="font-bold text-olivegreen">Marco Rossi</p>
                    <p className="text-sm text-olivedarkgreen">The Daily Crumb</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-6">
                <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < 5} className="text-yellow-400" size={20} />
                    ))}
                  </div>
                <p className="italic text-lg text-olivegreen leading-relaxed">
                  "Seeing which neighborhoods our customers come from through the analytics map helped us decide where to open our second store."
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="size-12 rounded-full bg-cover bg-center" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGhBdZsxFKJh36QVVtrDVxgZ6fafEugJtsgZHGYKVAqQ1BjH-lb--xPAVFA7Z6FW_MoiQsdX9uZPJdG-H4zFVrlKcX1b0jwRrAol_UcJzQEEY97214i5d5K88NbXn-H1JcdEqFUUETpLFC7Cz7ZIJVZ-OvP93zhNjj9bde-GlnIpyhJRpSmfsmL84zrsAJvgeOc47PD8njBE6Vkc1Bajl7Cl_lFvxxJqUhG-vEsW2bXzc27-AzfFVuTtnu4sTVZQui98nAb_Mqg4ZY")'}}></div>
                  <div>
                    <p className="font-bold text-olivegreen">Sarah Jenkins</p>
                    <p className="text-sm text-olivedarkgreen">Wildflower Florals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Chatbot />
      <Footer />
    </div>
  )
}
