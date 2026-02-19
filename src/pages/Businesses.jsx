import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'

export default function Businesses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [localSearch, setLocalSearch] = React.useState(searchQuery)
  
  // Business data
  const businesses = [
    {
      id: 1,
      name: 'Olive Garden Bistro',
      category: 'Italian Restaurant',
      description: 'Authentic Italian cuisine with fresh ingredients and a cozy atmosphere. Family-owned since 1995.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4hPyKOPVmdl1ooMm3Emg4FGC-usKqWGGdqkVV6styJIf6nOerGxTzTotAUp2DPTriUsBB8nAwhjfxixP1D1UKzN2vynQIBQqQtwEuzgaUOqqJIehfrUY9W7qyUbgifDXHVTSOjuMdGDSS3fSVLitjBG4Lb-u7nG5fQ122-2dPe_UCK3a_ORFvuuYy7QkPX5XvH1ZJkcyKABwUOaYMd74aKwBf2lQrjtQss8qfA1_o8Xa8nko5skzAJ4O95pk-VhID0Ho-YX4LZSQP',
      distance: '0.5 mi',
      rating: 4.8,
      reviews: 120,
      badge: 'Verified'
    },
    {
      id: 2,
      name: 'The Burger Shack',
      category: 'American Diner',
      description: 'Juicy burgers, crispy fries, and milkshakes made with local dairy. Open late for your cravings.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBga8kBRph3c7-Xl4wGdR1HtuZpfYCdv23AMRDn7-_EKrz9RY-KX1L5oiY4nobYASRUMroRz8ImAB0bQE9E_ICMTUumbUPh3sgY9DD9ixGNgleLzft-h8wisVJGdV9lIEr_8jKComnB3LdNE1w_mWPGofWtw-34WeI8IKv6dClE-idMgyXLi9iGIUSvI-flwgHXHmVi7jlfVddMYDDUAuPR9dfUoxGlTgmteEnAjXTn0VjNfeTme9P97XnBgsLZ9LB0p6cee2FkRyKx',
      distance: '1.2 mi',
      rating: 4.6,
      reviews: 85,
      badge: 'Featured'
    },
    {
      id: 3,
      name: 'Main St. Coffee',
      category: 'Coffee Shop',
      description: 'Artisan coffee, fresh pastries, and a community hub for locals. Free Wi-Fi and cozy seating.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCK5DkFLWHoLrblHxwkSg83CH7_mmkz-g4Z3hJ4jIvVtEuAaZ27wYE0O9CVW6ltcPl5jqj48JOdtYDnNfnhL7ypwE09P_kkpOAoELGvGIqowN8CD_mHrESnvmfCmNa40Vq-gicFKWaBGDkfgj3sbrKgIhEYuNI66p0TxOyfhYzVTg1Js0QdzMI0IihktZip6rR1ydwx7HRvx3u9FzdSG5FfB2TZGFyvC43D3wtAgLn1AZrhvnAlm1BFd9-njvXmtwqFd2j_bMLfMMG6',
      distance: '0.2 mi',
      rating: 4.9,
      reviews: 200,
      badge: null
    },
    {
      id: 4,
      name: 'Green Leaf Salon',
      category: 'Beauty Salon',
      description: 'Professional hair styling, manicures, and spa treatments using eco-friendly products.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPrTo5QjIDnNtl7OVY70_t5az7vIpXysSiEU2AtgLBsAsQ0xICJ4a2ahbmAEy54iqqm_bpCMHgS9a6gg2lQ4R4CiIjjhjJYGHuRuJMiYFTGC-v9RK3DOG_KEpT_Hpnc1Rfuk0yQCBv8xblxa8TXMKP6GFmaPi-PlzYU3LTcJq_yJ_G0plPEcSZ3hnBfBA9P5_mX0BaFW7_Sn46N-xPHvwHtJfZy-m6qdTliO5eEfaRlaLJNTnW5pUGzoXaG-KV8Mn4At1XsJxvA2ef',
      distance: '2.5 mi',
      rating: 4.7,
      reviews: 95,
      badge: null
    },
    {
      id: 5,
      name: 'Community Co-op',
      category: 'Grocery Store',
      description: 'Locally sourced organic produce, bulk goods, and community-focused shopping experience.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtZagjenlbvMbO9hrEwdsdl8nl6N5Oq4pAIoG_9mCvsIoXn4CXTh98--9H00Rm_pfDUwLvAAo9YRQ9fzP7BaQiP1Kds2QWXOLnTGvnJISrkwE2aPNbUBFUoY65E6Q0YFR5_uzmowkxhzc9P-DA6-kehGrePNKhSayh8wGxt-tbGFBsyrDW1B-m9-GgBA0e6dQwIdZ68bHnCCpm41j48F_HFQxfJYuJLbnVWX3GhXZeY4ys96uT9lZxKZQEw9pYpQ-vUDRFc1uEVUSr',
      distance: '1.8 mi',
      rating: 4.5,
      reviews: 150,
      badge: null
    },
    {
      id: 6,
      name: 'Local Legal Services',
      category: 'Law Firm',
      description: 'Specializing in small business law, contracts, and community legal aid. Serving the area for 20 years.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk41SCmvLJfIZJQuCtpanu2gOBpkpid2WpnHAQ291Dmawdcg3dKtTbzywIfqKSnTJPTt2_X_bgg1ccoaByLK4VuqJiG5vZfTe-cs_v8MxmUBmk235YCijlGnzU-lLmGRZbDc4lxEg-tD5p7ww5qlOym63X2ZD7s2OKHBkMJY1L7U9wi6VL_sPMmEujUeEccM_oxL7etgny7p3omNIHQAUxBSrL3ygIjWoVNZTuQkQwbGcDU_KtTcPJBeHDBs6y-3_7Btraw_zBDM2E',
      distance: '3.1 mi',
      rating: 4.8,
      reviews: 60,
      badge: null
    }
  ]

  // Filter businesses based on search query
  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(localSearch.toLowerCase()) ||
    business.category.toLowerCase().includes(localSearch.toLowerCase()) ||
    business.description.toLowerCase().includes(localSearch.toLowerCase())
  )

  const handlePageSearch = (e) => {
    e.preventDefault()
    setSearchParams({ search: localSearch })
  }

  const clearSearch = () => {
    setLocalSearch('')
    setSearchParams({})
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      
      <main className="flex flex-1 justify-center py-8 bg-white">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-olivegreen text-4xl font-black leading-tight tracking-[-0.033em]">Local Businesses Directory</h1>
              {localSearch && (
                <p className="text-olivedarkgreen text-lg font-normal">Search results for: <span className="font-bold">"{localSearch}"</span></p>
              )}
              {!localSearch && (
                <p className="text-olivedarkgreen text-lg font-normal leading-normal max-w-2xl">Discover and support your neighborhood businesses. Browse our curated list of trusted local establishments.</p>
              )}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-olivetan p-6 rounded-xl shadow-sm mb-8 border border-olivetan">
            <div className="mb-6">
              <label className="flex flex-col w-full h-12">
                <form onSubmit={handlePageSearch} className="flex w-full flex-1 items-stretch rounded-lg h-full border-2 border-transparent focus-within:border-olivegreen transition-all">
                  <div className="text-olivegreen flex border-none bg-olivetan items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input 
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 border-none bg-olivetan text-olivegreen focus:ring-0 h-full placeholder:text-olivedarkgreen px-4 text-base font-normal leading-normal" 
                    placeholder="Search for businesses (e.g. Restaurant, Salon, Plumber)"
                  />
                  <button type="submit" className="bg-olivesepia text-white px-6 rounded-r-lg font-semibold hover:bg-olivesepia/90 transition-colors">Search</button>
                </form>
              </label>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-olivesepia text-white px-4 transition-transform active:scale-95">
                <span className="material-symbols-outlined text-lg">store</span>
                <span className="text-sm font-semibold">All Businesses</span>
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

          {/* Businesses Grid */}
          {filteredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBusinesses.map((business) => (
                <div key={business.id} className="bg-white border-2 border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative group cursor-pointer">
                  <div className="w-full bg-center bg-no-repeat aspect-video bg-cover" style={{backgroundImage: `url("${business.image}")`}}>
                    {business.badge && (
                      <div className="bg-olivesepia/90 text-white text-xs font-bold px-3 py-1 rounded-full absolute top-3 left-3 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span> {business.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-olivesepia leading-tight">{business.name}</h3>
                      <div className="text-olivedarkgreen flex items-center gap-1 text-sm font-medium">
                        <span className="material-symbols-outlined text-sm">location_on</span> {business.distance}
                      </div>
                    </div>
                    <p className="text-olivegreen text-lg font-bold mb-1">{business.category}</p>
                    <p className="text-olivedarkgreen text-sm font-normal mb-4">{business.description}</p>
                    <div className="mt-auto flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-olivesepia">
                        <span className="material-symbols-outlined text-xs">star</span> {business.rating} ({business.reviews} reviews)
                      </div>
                      <button className="w-full bg-olivesepia hover:bg-olivesepia/90 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                        View Business 
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <span className="material-symbols-outlined text-6xl text-olivetan mb-4">store</span>
              <h2 className="text-2xl font-bold text-olivegreen mb-2">No businesses found</h2>
              <p className="text-olivedarkgreen text-center max-w-md mb-6">We couldn't find any businesses matching "{localSearch}". Try searching for different keywords or categories.</p>
              <button 
                onClick={clearSearch}
                className="bg-olivesepia text-white px-6 py-2 rounded-lg font-semibold hover:bg-olivesepia/90 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Load More / Bottom Action */}
          {filteredBusinesses.length > 0 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <button className="bg-olivetan text-olivegreen px-10 py-4 rounded-xl font-bold hover:bg-olivetan/80 transition-all">
                Load More Businesses
              </button>
              <p className="text-olivedarkgreen text-sm italic">Showing {filteredBusinesses.length} of 128 local businesses</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}