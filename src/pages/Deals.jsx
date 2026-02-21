import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'

export default function Deals() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      
      <main className="flex flex-1 justify-center py-8 bg-white">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-olivegreen text-4xl font-black leading-tight tracking-[-0.033em]">Local Deals & Exclusive Offers</h1>
              <p className="text-olivedarkgreen text-lg font-normal leading-normal max-w-2xl">Support your community while saving on the things you love. Discover curated discounts from trusted neighborhood businesses.</p>
            </div>
          </div>

          <div className="bg-olivetan p-6 rounded-xl shadow-sm mb-8 border border-olivetan">
            <div className="mb-6">
              <label className="flex flex-col w-full h-12">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full border-2 border-transparent focus-within:border-olivegreen transition-all">
                  <div className="text-olivegreen flex border-none bg-olivetan items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input className="form-input flex w-full min-w-0 flex-1 border-none bg-olivetan text-olivegreen focus:ring-0 h-full placeholder:text-olivedarkgreen px-4 text-base font-normal leading-normal" placeholder="Search for businesses or keywords (e.g. Pizza, Plumber, Salon)"/>
                  <button className="bg-olivesepia text-white px-6 rounded-r-lg font-semibold hover:bg-olivesepia/90 transition-colors">Search</button>
                </div>
              </label>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-olivesepia text-white px-4 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-lg">local_offer</span>
                <span className="text-sm font-semibold">All Deals</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">restaurant</span>
                <span className="text-sm font-medium">Food & Drink</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">shopping_bag</span>
                <span className="text-sm font-medium">Retail</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">spa</span>
                <span className="text-sm font-medium">Beauty & Spa</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">construction</span>
                <span className="text-sm font-medium">Services</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">health_and_safety</span>
                <span className="text-sm font-medium">Health</span>
              </button>
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white text-olivegreen px-4 hover:bg-olivetan transition-colors border-2 border-olivetan">
                <span className="material-symbols-outlined text-lg text-olivesepia">fitness_center</span>
                <span className="text-sm font-medium">Fitness</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative group">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4hPyKOPVmdl1ooMm3Emg4FGC-usKqWGGdqkVV6styJIf6nOerGxTzTotAUp2DPTriUsBB8nAwhjfxixP1D1UKzN2vynQIBQqQtwEuzgaUOqqJIehfrUY9W7qyUbgifDXHVTSOjuMdGDSS3fSVLitjBG4Lb-u7nG5fQ122-2dPe_UCK3a_ORFvuuYy7QkPX5XvH1ZJkcyKABwUOaYMd74aKwBf2lQrjtQss8qfA1_o8Xa8nko5skzAJ4O95pk-VhID0Ho-YX4LZSQP")'}}>
                <div className="bg-olivesepia/90 text-white text-xs font-bold px-3 py-1 rounded-full absolute top-3 left-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">verified</span> Verified
                </div>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">20% OFF</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 0.5 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">Olive Garden Bistro</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">Valid on your entire bill when dining in. Not combinable with other offers.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-red-600">
                    <span className="material-symbols-outlined text-xs">schedule</span> Expiring in 4 days
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBga8kBRph3c7-Xl4wGdR1HtuZpfYCdv23AMRDn7-_EKrz9RY-KX1L5oiY4nobYASRUMroRz8ImAB0bQE9E_ICMTUumbUPh3sgY9DD9ixGNgleLzft-h8wisVJGdV9lIEr_8jKComnB3LdNE1w_mWPGofWtw-34WeI8IKv6dClE-idMgyXLi9iGIUSvI-flwgHXHmVi7jlfVddMYDDUAuPR9dfUoxGlTgmteEnAjXTn0VjNfeTme9P97XnBgsLZ9LB0p6cee2FkRyKx")'}}>
                <div className="bg-olivesepia/90 text-white text-xs font-bold px-3 py-1 rounded-full absolute top-3 left-3">Hot Deal</div>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">FREE APPETIZER</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 1.2 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">The Burger Shack</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">Enjoy a free starter with any main course order. Limited to one per table.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-olivesepia">
                    <span className="material-symbols-outlined text-xs">event_available</span> Valid until Dec 15
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCK5DkFLWHoLrblHxwkSg83CH7_mmkz-g4Z3hJ4jIvVtEuAaZ27wYE0O9CVW6ltcPl5jqj48JOdtYDnNfnhL7ypwE09P_kkpOAoELGvGIqowN8CD_mHrESnvmfCmNa40Vq-gicFKWaBGDkfgj3sbrKgIhEYuNI66p0TxOyfhYzVTg1Js0QdzMI0IihktZip6rR1ydwx7HRvx3u9FzdSG5FfB2TZGFyvC43D3wtAgLn1AZrhvnAlm1BFd9-njvXmtwqFd2j_bMLfMMG6")'}}>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">BOGO COFFEE</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 0.2 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">Main St. Coffee</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">Buy one get one free on all signature lattes. Monday to Friday only.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-olivesepia">
                    <span className="material-symbols-outlined text-xs">check_circle</span> 150+ claimed this week
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPrTo5QjIDnNtl7OVY70_t5az7vIpXysSiEU2AtgLBsAsQ0xICJ4a2ahbmAEy54iqqm_bpCMHgS9a6gg2lQ4R4CiIjjhjJYGHuRuJMiYFTGC-v9RK3DOG_KEpT_Hpnc1Rfuk0yQCBv8xblxa8TXMKP6GFmaPi-PlzYU3LTcJq_yJ_G0plPEcSZ3hnBfBA9P5_mX0BaFW7_Sn46N-xPHvwHtJfZy-m6qdTliO5eEfaRlaLJNTnW5pUGzoXaG-KV8Mn4At1XsJxvA2ef")'}}>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">$10 OFF</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 2.5 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">Green Leaf Salon</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">New customer discount on any hair or nail service over $40.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-olivesepia">
                    <span className="material-symbols-outlined text-xs">group</span> Exclusive for members
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDtZagjenlbvMbO9hrEwdsdl8nl6N5Oq4pAIoG_9mCvsIoXn4CXTh98--9H00Rm_pfDUwLvAAo9YRQ9fzP7BaQiP1Kds2QWXOLnTGvnJISrkwE2aPNbUBFUoY65E6Q0YFR5_uzmowkxhzc9P-DA6-kehGrePNKhSayh8wGxt-tbGFBsyrDW1B-m9-GgBA0e6dQwIdZ68bHnCCpm41j48F_HFQxfJYuJLbnVWX3GhXZeY4ys96uT9lZxKZQEw9pYpQ-vUDRFc1uEVUSr")'}}>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">15% SAVINGS</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 1.8 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">Community Co-op</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">On all locally grown organic produce. Minimum spend $30.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-olivesepia">
                    <span className="material-symbols-outlined text-xs">calendar_today</span> Recurring: Every Sunday
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative">
              <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCk41SCmvLJfIZJQuCtpanu2gOBpkpid2WpnHAQ291Dmawdcg3dKtTbzywIfqKSnTJPTt2_X_bgg1ccoaByLK4VuqJiG5vZfTe-cs_v8MxmUBmk235YCijlGnzU-lLmGRZbDc4lxEg-tD5p7ww5qlOym63X2ZD7s2OKHBkMJY1L7U9wi6VL_sPMmEujUeEccM_oxL7etgny7p3omNIHQAUxBSrL3ygIjWoVNZTuQkQwbGcDU_KtTcPJBeHDBs6y-3_7Btraw_zBDM2E")'}}>
              </div>
              <div className="p-6 flex flex-col grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-olivesepia leading-tight">FREE SESSION</h3>
                  <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 3.1 mi
                  </div>
                </div>
                <p className="text-olivegreen text-lg font-bold mb-1">Local Legal Services</p>
                <p className="text-olivedarkgreen text-sm font-normal mb-4">30-minute introductory consultation for small business owners.</p>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-red-600">
                    <span className="material-symbols-outlined text-xs">emergency</span> Only 3 spots left!
                  </div>
                  <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                    Claim Deal <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Load More / Bottom Action */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <button className="bg-olivetan text-olivegreen px-10 py-4 rounded-xl font-bold hover:bg-olivetan/80 transition-all">
              Load More Deals
            </button>
            <p className="text-olivedarkgreen text-sm italic">Showing 6 of 42 local offers</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
