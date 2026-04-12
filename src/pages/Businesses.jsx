// Businesses.jsx - Main business listing page component.
// This component displays a list of local businesses with filtering, sorting, pagination, and geolocation features.
// It fetches data from Overpass API for OSM data and Supabase for custom locations, applies filters, and renders business cards.

import React, { useState, useEffect, useRef } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { UserAuth } from '../context/AuthContext';

function Businesses() {
  const { toggleFavorite, favoriteIds = [] } = UserAuth(); // Hook called at top level
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('Closest');
  const [apiBusinesses, setApiBusinesses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [selectedRating, setSelectedRating] = useState('4');
  const [selectedPrice, setSelectedPrice] = useState('$$');
  const [distance, setDistance] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchLock = useRef(false);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: ['Restaurants'],
    rating: '4',
    price: '$$',
    distance: 10,
  });

  const FALLBACK_BUSINESSES = [
    {
      id: "fallback-1",
      name: "Blitz Detailing",
      rating: "4.8",
      categories: ["Shopping"],
      price: "$$",
      distance: 0.5,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=400",
      description: "A cozy neighborhood staple known for artisan coffee and local pastries.",
      tags: ["CARS", "LOCAL"],
    },
    {
      id: "fallback-2",
      name: "Bar Bantam",
      rating: "4.5",
      categories: ["Nightlife"],
      price: "$$$",
      distance: 1.2,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=400",
      description: "A local pub in your area. Great for a night out with friends and a wide selection of craft beers.",
      tags: ["PUB", "LOCAL"],
    },
    {
      id: "fallback-3",
      name: "The Acorn Exchange",
      rating: "4.4",
      categories: ["Restaurants"],
      price: "$",
      distance: 4.1,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=400",
      description: "A local restaurant in your area. Known for its farm-to-table menu and cozy atmosphere.",
      tags: ["CAFE", "LOCAL"],
    },
    {
      id: "fallback-4",
      name: "Midtown Commons",
      rating: "5.0",
      categories: ["Active Life"],
      price: "$",
      distance: 4.1,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&h=400",
      description: "A local park in your area. A great place to relax, have a picnic, or take a stroll with friends and family.",
      tags: ["PARK", "LOCAL"],
    },
  ];

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 3958.8;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  };

  const categoryMap = {
    restaurant: 'Restaurants',
    cafe: 'Restaurants',
    bar: 'Nightlife',
    pub: 'Nightlife',
    bakery: 'Shopping',
    clothes: 'Shopping',
    supermarket: 'Shopping',
    gym: 'Active Life',
    park: 'Active Life'
  };

  // Function to fetch business data from Overpass API (OpenStreetMap).
  // Queries for amenities within a radius, with retry logic for rate limits.
  // Falls back to Supabase if no OSM data.
  const fetchOverpassData = async (lat, lng, dist) => {
    if (fetchLock.current) return;
    fetchLock.current = true;
    setLoading(true);

    if (lat == null || lng == null) {
      console.warn('No coordinates provided; skipping fetch.');
      setLoading(false);
      fetchLock.current = false;
      return;
    }

    const radius = dist * 1609;
    const overpassQuery = `[out:json][timeout:25];(node["amenity"~"restaurant|cafe|bar|pub|gym"](around:${radius},${lat},${lng});node["shop"~"bakery|clothes|supermarket"](around:${radius},${lat},${lng});node["leisure"~"park"](around:${radius},${lat},${lng}););out tags center;`;
    const url = `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    
    let elements = [];
    let attempt = 0;
    const maxAttempts = 3;

    // Retry loop for API calls.
    while (attempt < maxAttempts) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          elements = data?.elements || [];
          break;
        }
        if (response.status === 429 || response.status === 504) {
          attempt++;
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }
        break;
      } catch (err) {
        attempt++;
        if (attempt >= maxAttempts) break;
      }
    }

    // Fallback to Supabase if no OSM data.
    if (!elements || elements.length === 0) {
      try {
        const { data: rows, error } = await supabase.from('locations').select('*').limit(100);
        if (error) throw error;
        elements = (rows || []).map(r => ({
          id: r.id,
          lat: r.latitude || r.lat,
          lon: r.longitude || r.lon,
          tags: { name: r.name, amenity: r.category, description: r.description || r.address }
        }));
      } catch (err) {
        console.error('Database fallback failed:', err);
      }
    }

    try {
      if (!elements || elements.length === 0) throw new Error("No data found");
      
      // Transform OSM/Supabase data into UI-friendly business objects.
      const transformed = elements.map((item, index) => {
        const tags = item.tags || {};
        const rawCat = tags.amenity || tags.shop || tags.leisure || "business";
        const uiCategory = categoryMap[rawCat] || "business";
        const specificType = tags.cuisine || tags.shop || rawCat;
        const imageKeyword = specificType.toLowerCase().replace(/[^a-z]/g, ',');

        return {
          id: item.id || `osm-${index}`,
          name: tags.name || "Local Business",
          rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
          categories: [uiCategory],
          price: tags.price_level === "1" ? "$" : "$$",
          distance: calculateDistance(lat, lng, item.lat || item.center?.lat, item.lon || item.center?.lon),
          image: `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&h=400&q=80&keywords=${imageKeyword},food&sig=${item.id || index}`,
          description: tags.description || `A local ${specificType.replace('_', ' ')} offering great service in the area.`,
          tags: [tags.cuisine || rawCat || "LOCAL"].map(t => String(t).toUpperCase()),
        };
      });
      setApiBusinesses(transformed);
    } catch (err) {
      // Final fallback to hardcoded list
      setApiBusinesses(FALLBACK_BUSINESSES);
    } finally {
      setLoading(false);
      fetchLock.current = false;
    }
  };

  // Function to handle search form submission.
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/businesses?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  const getPriceValue = (price) => price.length;

  // Function to sort businesses based on sortBy state.
  const sortBusinesses = (businesses) => {
    const sorted = [...businesses];
    switch (sortBy) {
      case 'Highest Rated':
        return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case 'Closest':
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('search');
    setQuery(q || '');

    if (q && q.trim()) {
      const runSearch = async () => {
        setLoading(true);
        try {
          const clean = q.trim();
          const { data, error } = await supabase
            .from('locations')
            .select('*')
            .or(`name.ilike.%${clean}%,address.ilike.%${clean}%`)
            .limit(100);

          if (error) throw error;

          const transformed = (data || []).map(item => ({
            id: item.id,
            name: item.name || 'Local Business',
            rating: item.rating || (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
            categories: item.category ? [item.category] : ['Local Business'],
            price: '$$',
            distance: 0,
            image: item.image || `https://loremflickr.com/400/300/${encodeURIComponent(item.name || 'store')}?lock=${item.id}`,
            description: item.description || item.address || '',
            tags: item.tags ? item.tags.split(',').map(t => t.trim().toUpperCase()) : ["LOCAL"],
          }));
          setApiBusinesses(transformed);
        } catch (err) {
          console.error('Search error', err);
          setApiBusinesses([]);
        } finally {
          setLoading(false);
        }
      };
      runSearch();
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });
          fetchOverpassData(latitude, longitude, appliedFilters.distance);
        },
        () => setLocationError('Location access denied. Please allow location or adjust filters.')
      );
    }
  }, [location.search]);

  const getCategoryIcon = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes('restaurant') || cat.includes('food')) return 'restaurant';
    if (cat.includes('cafe') || cat.includes('coffee')) return 'local_cafe';
    if (cat.includes('bar') || cat.includes('pub')) return 'sports_bar';
    if (cat.includes('shop') || cat.includes('market')) return 'shopping_bag';
    return 'storefront';
  };

  const filterBusinesses = () => {
    return apiBusinesses.filter(business => {
      const categoryMatch = appliedFilters.categories.includes('All') ||
                           business.categories.some(cat => appliedFilters.categories.includes(cat));
      const ratingMatch = parseFloat(business.rating) >= parseFloat(appliedFilters.rating);
      const priceMatch = getPriceValue(business.price) <= getPriceValue(appliedFilters.price);
      const distanceMatch = business.distance === 0 || parseFloat(business.distance) <= appliedFilters.distance;

      return categoryMatch && ratingMatch && priceMatch && distanceMatch;
    });
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      categories: selectedCategories.length > 0 ? selectedCategories : ['Restaurants'],
      rating: selectedRating,
      price: selectedPrice,
      distance: distance,
    });
    if (userCoords) {
      fetchOverpassData(userCoords.lat, userCoords.lng, distance);
    }
    setCurrentPage(1);
  };

  const filteredBusinesses = filterBusinesses();
  const sortedBusinesses = sortBusinesses(filteredBusinesses);
  const businessesPerPage = 4;
  const paginatedBusinesses = sortedBusinesses.slice((currentPage - 1) * businessesPerPage, currentPage * businessesPerPage);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push(<span key={i} className="material-icons text-sm">star</span>);
      else if (i - rating < 1) stars.push(<span key={i} className="material-icons text-sm">star_half</span>);
      else stars.push(<span key={i} className="material-icons text-sm">star_outline</span>);
    }
    return stars;
  };

  const totalPages = Math.ceil(sortedBusinesses.length / businessesPerPage);
  const visiblePages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1);

  return (
    <div className="bg-olivedarkgreen text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-8 shrink-0">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-olivetan">
              <span className="material-icons">tune</span> Filters
            </h3>
            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Category</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input checked={selectedCategories.includes('All')} onChange={() => setSelectedCategories(['All'])} type="checkbox" className="rounded text-olivegreen" />
                    <span className="font-bold">All Categories</span>
                  </label>
                  {['Restaurants', 'Shopping', 'Nightlife', 'Active Life'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        checked={selectedCategories.includes(cat) && !selectedCategories.includes('All')} 
                        onChange={() => setSelectedCategories(prev => {
                          const clean = prev.filter(c => c !== 'All');
                          return clean.includes(cat) ? clean.filter(c => c !== cat) : [...clean, cat];
                        })} 
                        type="checkbox" 
                        className="rounded text-olivegreen" 
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Rating</label>
                <div className="flex gap-1">
                  {['1', '2', '3', '4'].map(r => (
                    <button key={r} onClick={() => setSelectedRating(r)} className={`w-10 h-10 rounded border flex items-center justify-center transition ${selectedRating === r ? 'bg-olivegreen text-white' : 'border-gray-200 hover:bg-olivegreen hover:text-white'}`}>{r}+</button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Price</label>
                <div className="flex gap-1">
                  {['$', '$$', '$$$', '$$$$'].map(p => (
                    <button key={p} onClick={() => setSelectedPrice(p)} className={`px-3 h-10 rounded border flex items-center justify-center transition ${selectedPrice === p ? 'bg-olivegreen text-white' : 'border-gray-200 hover:bg-olivegreen hover:text-white'}`}>{p}</button>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Distance</label>
                <input className="w-full accent-olivegreen" max="50" min="1" type="range" value={distance} onChange={(e) => setDistance(parseInt(e.target.value))} />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 mile</span>
                  <span className="font-semibold">{distance} miles</span>
                  <span>50 miles</span>
                </div>
              </div>

              <button onClick={handleApplyFilters} className="w-full py-3 bg-olivegreen text-white font-bold rounded hover:opacity-90 transition">Apply Filters</button>
            </div>
          </div>
        </aside>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-olivetan">Recommended Results</h2>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border-gray-200 rounded-md focus:ring-olivegreen dark:bg-olivedarkgreen">
              <option>Closest</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olivegreen"></div>
                <p className="mt-4 text-olivetan font-medium">Scanning the neighborhood...</p>
              </div>
            ) : paginatedBusinesses.length > 0 ? (
              paginatedBusinesses.map(business => {
                const isFavorited = favoriteIds.includes(business.id);
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name)}`;
                
                return (
                  <div key={business.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <img alt={business.name} className="w-full h-full object-cover" src={business.image}/>
                      <button 
                        onClick={(e) => { e.preventDefault(); toggleFavorite(business); }}
                        className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:scale-110 transition shadow-md"
                      >
                        <span className={`material-icons text-xl ${isFavorited ? 'text-red-500' : 'text-olivegreen'}`}>
                          {isFavorited ? 'favorite' : 'favorite_border'}
                        </span>
                      </button>
                    </div>
                    <div className="p-5">
                      <Link to={`/business/${business.id}`} state={{ businessData: business }} className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl">{business.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          {renderStars(business.rating)}
                          <span className="text-xs text-gray-500 ml-1">({business.rating})</span>
                        </div>
                      </Link>
                      <div className="flex items-center gap-1 text-olivegreen mb-2">
                        <span className="material-icons text-lg">{getCategoryIcon(business.categories[0])}</span>
                        <span className="text-xs font-bold uppercase tracking-tighter">{business.categories[0]}</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{business.description}</p>
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mb-4 flex items-center justify-center gap-2 w-full py-2 bg-gray-50 dark:bg-slate-700 hover:bg-olivegreen hover:text-white transition-colors rounded-lg text-xs font-bold text-olivegreen border border-olivegreen/20">
                        <span className="material-icons text-sm">explore</span> VIEW ON GOOGLE MAPS
                      </a>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          {business.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-[10px] font-bold rounded">{tag}</span>
                          ))}
                        </div>
                        <span className="text-olivesepia font-bold text-sm">{business.distance} mi away</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No businesses match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-50">
                  <span className="material-icons text-sm">chevron_left</span>
                </button>
                {visiblePages.map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-full font-bold transition ${currentPage === page ? 'bg-olivegreen text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>{page}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-10 h-10 rounded-full border border-gray-200 disabled:opacity-50">
                  <span className="material-icons text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Businesses;