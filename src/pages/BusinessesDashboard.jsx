import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'

export default function BusinessesDashboard() {
  return (
    <>
      <Header />
      <div className="bg-olivetan min-h-screen">
        <main className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-olivedarkgreen">Welcome back, Alex</h1>
            <p className="text-olivedarkgreen/60">Here's what's happening with your portfolio today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">$24,850</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>12.5% this month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Occupancy Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">94%</h3>
              <div className="mt-2 flex items-center gap-1 text-olivegreen text-sm">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Optimal level</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Active Tenants</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">42</h3>
              <div className="mt-2 flex items-center gap-1 text-olivedarkgreen/40 text-sm">
                <span className="material-symbols-outlined text-[16px]">person</span>
                <span>Across 8 properties</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-olivesepia/30 shadow-sm">
              <p className="text-olivedarkgreen/60 text-sm font-medium">Pending Tasks</p>
              <h3 className="text-2xl font-bold mt-1 text-olivedarkgreen">7</h3>
              <div className="mt-2 flex items-center gap-1 text-olivesepia text-sm">
                <span className="material-symbols-outlined text-[16px]">priority_high</span>
                <span>3 Urgent repairs</span>
              </div>
            </div>
          </div>
          <section className="mb-10 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-olivedarkgreen">Your Properties</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-olivesepia/30 rounded-lg hover:bg-olivetan text-olivedarkgreen/40 hover:text-olivedarkgreen transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 border border-olivesepia/30 rounded-lg hover:bg-olivetan text-olivedarkgreen/40 hover:text-olivedarkgreen transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
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
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        245 Oak Lane, Austin TX
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">group</span>
                          <span className="text-sm font-medium">4 Tenants</span>
                        </div>
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">trending_up</span>
                          <span className="text-sm font-medium">$4,200/mo</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">NEXT RENT: SEP 01</span>
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
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        808 Market St, San Francisco
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">group</span>
                          <span className="text-sm font-medium">12 Tenants</span>
                        </div>
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">trending_up</span>
                          <span className="text-sm font-medium">$12,500/mo</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">MAINTENANCE DUE</span>
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
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        45 Riverbend Dr, Portland
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">group</span>
                          <span className="text-sm font-medium">2 Tenants</span>
                        </div>
                        <div className="flex items-center gap-2 text-olivedarkgreen">
                          <span className="material-symbols-outlined text-olivedarkgreen/40">trending_up</span>
                          <span className="text-sm font-medium">$2,800/mo</span>
                        </div>
                      </div>
                      <div className="mt-6 pt-5 border-t border-olivetan flex justify-between items-center">
                        <span className="text-xs text-olivedarkgreen/40 font-medium">RENEWAL: NOV 15</span>
                        <button className="text-olivesepia text-sm font-bold hover:underline">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="bg-white rounded-2xl overflow-hidden border border-olivesepia/30 opacity-60">
                    <div className="relative h-48">
                      <img alt="Urban Loft" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuEDY4GZwf-Rfc6dE66DQCewM21LLKRCHeVhZjA7iL5eOlyeA96BKrSe9ts9BbOV-zY2jqg5dSVEz3FGq3KeKWz_Q10g-lf-TZql_7HvqlXv_0DTbZ9M20vbyzuWrdP2pKe4Y3rCWDcuGsRfAXtO86hVWZew-1DN9VoOJ3GdiaBvutTm5eYMg3g9kMRgc6rZmqUZs9A326h0-dnRXyqe-foayWfEST2lhN9WCZv1VkTj6m9m9yQbySmwqfiEfq8aC0YxLff9hHW9tB"/>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-olivedarkgreen">Urban District Lofts</h3>
                      <p className="text-olivedarkgreen/60 text-sm mt-1">12 Main St, Chicago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-olivesepia"></span>
                <span className="w-2 h-2 rounded-full bg-olivetan"></span>
                <span className="w-2 h-2 rounded-full bg-olivetan"></span>
                <span className="w-2 h-2 rounded-full bg-olivetan"></span>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-olivesepia/30 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-olivedarkgreen">Recent Activity</h2>
                <button className="text-sm text-olivesepia font-medium">View All History</button>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-olivesepia/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-olivesepia">payments</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-olivedarkgreen">Rent Payment Received</p>
                      <span className="text-xs text-olivedarkgreen/40">2h ago</span>
                    </div>
                    <p className="text-olivedarkgreen/60 text-sm mt-0.5">Sarah Miller paid $2,400 for Apt 4B at Skyline Penthouse.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-olivesepia/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-olivesepia">handyman</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-olivedarkgreen">New Maintenance Request</p>
                      <span className="text-xs text-olivedarkgreen/40">5h ago</span>
                    </div>
                    <p className="text-olivedarkgreen/60 text-sm mt-0.5">James Wilson reported a leaking faucet at Oakwood Heights.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-olivegreen/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-olivegreen">contract</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-olivedarkgreen">Lease Agreement Signed</p>
                      <span className="text-xs text-olivedarkgreen/40">Yesterday</span>
                    </div>
                    <p className="text-olivedarkgreen/60 text-sm mt-0.5">New tenant Emily Chen signed lease for Riverway Cottages.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-olivesepia/30 shadow-sm p-6">
              <h2 className="text-xl font-bold text-olivedarkgreen mb-6">Upcoming Inspections</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-olivesepia/30 bg-olivetan/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-olivedarkgreen text-sm">Oakwood Heights #2</p>
                      <p className="text-olivedarkgreen/60 text-xs mt-1">Annual Safety Inspection</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-olivesepia/30 text-olivedarkgreen">AUG 24</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-olivesepia/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-olivedarkgreen text-sm">Skyline Suite 1004</p>
                      <p className="text-olivedarkgreen/60 text-xs mt-1">Pre-renewal Walkthrough</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-olivesepia/30 text-olivedarkgreen">AUG 28</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-olivesepia/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-olivedarkgreen text-sm">Riverway Cottage B</p>
                      <p className="text-olivedarkgreen/60 text-xs mt-1">Roof Inspection</p>
                    </div>
                    <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-olivesepia/30 text-olivedarkgreen">SEP 02</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 text-sm font-semibold text-olivedarkgreen bg-olivetan hover:bg-olivetan/80 rounded-lg transition-colors">
                Schedule New
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}