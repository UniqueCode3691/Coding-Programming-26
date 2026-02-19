import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { UserAuth } from '../context/AuthContext'
import trendingup from "../assets/icons/trendingup.png"
import checkcircle from "../assets/icons/checkcircle.png"
import person from "../assets/icons/person.png"
import priorityhigh from "../assets/icons/priorityhigh.png"
import left from "../assets/icons/left.png"
import right from "../assets/icons/right.png"
import locationon from "../assets/icons/locationon.png"

export default function BusinessesDashboard() {
  const {session, signOut} = UserAuth()
  return (
    <>
      <Header />
      <div className="bg-olivetan min-h-screen">
        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-olivedarkgreen">Welcome back, {session?.user?.user_metadata?.name?.split(' ')[0]}</h1>
            <p className="text-olivedarkgreen/60">Here's what's happening with your portfolio today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">$24,850</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <img src={trendingup} alt="Trending Up" className="w-4 h-4" />
                <span>12.5% this month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Occupancy Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">94%</h3>
              <div className="mt-2 flex items-center gap-1 text-olivegreen text-sm">
                <img src={checkcircle} alt="Check Circle" className="w-4 h-4" />
                <span>Optimal level</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Active Tenants</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">42</h3>
              <div className="mt-2 flex items-center gap-1 text-olivedarkgreen/40 text-sm">
                <img src={person} alt="Person" className="w-4 h-4" />
                <span>Across 8 properties</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Pending Tasks</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">7</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <img src={priorityhigh} alt="Priority High" className="w-4 h-4" />
                <span>3 Urgent repairs</span>
              </div>
            </div>
          </div>
          <section className="mb-10 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-olivedarkgreen">Your Properties</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-olivesepia rounded-lg hover:bg-olivetan text-olivedarkgreen/40 hover:text-olivedarkgreen transition-colors">
                  <img src={left} alt="Left Arrow" className="w-6 h-6" />
                </button>
                <button className="p-2 border border-olivesepia rounded-lg hover:bg-olivetan text-olivedarkgreen/40 hover:text-olivedarkgreen transition-colors">
                  <img src={right} alt="Right Arrow" className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex gap-6 overflow-x-auto hide-scrollbar carousel-container pb-8 pr-32">
                <div className="carousel-item">
                  <div className="bg-white rounded-2xl overflow-hidden border border-olivesepia/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img alt="Modern Villa" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLE2NmKhJ963_UPQjR_Wbu9zuvRCHLQbWOP_7lI6a69nFXfaYBf13GPKUAaZT-FYlhB7lqHR17aEadzM04qt7FE_8XUIKqlX3Yx1SjckDlZl6ONAqHC7crwQLM_xcrXE6h2prkTck8enHJqrs_XhZDMe8SXXjgYn2JbNXAwdz9nGIjT4-ZAL8-jZIT5QBB8ZN1QGP1mKuB4RIRKpTGjpOcUVbwzdxGsIk1MoIBH9_Rbbph7cWRuf-Yy6enHDAH3f9KN8MwhqbEwMPD"/>
                      <span className="absolute top-4 left-4 bg-olivegreen text-white text-xs font-bold px-2.5 py-1 rounded-full">OCCUPIED</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-olivedarkgreen">Oakwood Heights Modern Villa</h3>
                      <p className="text-olivedarkgreen/60 text-sm mt-1 flex items-center gap-1">
                        <img src={locationon} alt="Location Icon" className="w-4 h-4" />
                        245 Oak Lane, Austin TX
                      </p>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">DATE POSTED: 09/15/2024</span>
                        <button className="text-olivesepia text-sm font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="bg-white rounded-2xl overflow-hidden border border-olivesepia/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img alt="Penthouse" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZwjIypO9TwfluVT0TFrE25LjY_j3JGj33TUDjUIWB12Vp453ViBdXH4cf0zdsKB4T7_x4q3ZLoW8joS5zaF_Z4qcrIiHH0ojLS3MouqGAr9LnDS6NVMLi24fmd1Sqc7BDrJE5l0HDg9ZXhR0DVuldRJvIwxmWiBJ7HITjv9vPzkAaf6vflm8WRHrCrCwIOkQE_u8a4kx8QCPG1mVZfOMZIJacALVhiEo7B2Bl4L79wnZ5hwxJ747QTcpC_CGNrjYJPK42bdg02DpK"/>
                      <span className="absolute top-4 left-4 bg-olivesepia text-white text-xs font-bold px-2.5 py-1 rounded-full">VACANT (1)</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-olivedarkgreen">Skyline Penthouse Suites</h3>
                      <p className="text-olivedarkgreen/60 text-sm mt-1 flex items-center gap-1">
                        <img src={locationon} alt="Location Icon" className="w-4 h-4" />
                        808 Market St, San Francisco
                      </p>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">DATE POSTED: 09/15/2024</span>
                        <button className="text-olivesepia text-sm font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="bg-white rounded-2xl overflow-hidden border border-olivesepia/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img alt="Cottage" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyTMf_0i1cq2EQjFodo5DyPFeVfleRjchxc5dP-o1t3JPLTvTQEvMhQf4_VAnOHOq7sd1zy3poR9-x_1Pz_53fYQidJKmIB6ni5L7PSIgTn8rL3e8_wsD-D4FA7mATVIV3kGLDX2BpFF7ROq0DjeRKuatmIHEYyy-LmAVpbiGvrs_2G2TDYrPooCWa9A5durNsLS2LTCljBOVtIHtz2b_MFa7mcBrx1ASjk00gaizvULJJaXtb1N7SP-dVGEmosCQH8xoBOfu_RuND"/>
                      <span className="absolute top-4 left-4 bg-olivegreen text-white text-xs font-bold px-2.5 py-1 rounded-full">OCCUPIED</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-olivedarkgreen">Riverway Garden Cottages</h3>
                      <p className="text-olivedarkgreen/60 text-sm mt-1 flex items-center gap-1">
                        <img src={locationon} alt="Location Icon" className="w-4 h-4" />
                        45 Riverbend Dr, Portland
                      </p>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">DATE POSTED: 09/15/2024</span>
                        <button className="text-olivesepia text-sm font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  )
}