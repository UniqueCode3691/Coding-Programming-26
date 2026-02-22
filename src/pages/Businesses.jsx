import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { supabase } from '../SupabaseClient'

function Businesses() {
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
  const location = useLocation()
  const fetchLock = React.useRef(false);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: ['Restaurants'],
    rating: '4',
    price: '$$',
    distance: 10,
  });

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return parseFloat(d.toFixed(2)); 
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
  const fetchOverpassData = async (lat, lng, dist) => {
  if (fetchLock.current) return;
  fetchLock.current = true;
  setLoading(true);
  
  if (lat == null || lng == null) {
    console.warn('No coordinates provided to fetchOverpassData; skipping fetch.');
    setLoading(false);
    fetchLock.current = false;
    return;
  }

  const radius = dist * 1609;
  const overpassQuery = `
    [out:json][timeout:25];
    (
      node["amenity"~"restaurant|cafe|bar|pub|gym"](around:${radius},${lat},${lng});
      node["shop"~"bakery|clothes|supermarket"](around:${radius},${lat},${lng});
      node["leisure"~"park"](around:${radius},${lat},${lng});
    );
    out tags center;
  `;

  const url = `https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
  const maxAttempts = 3;
  let attempt = 0;
  let elements = [];

  while (attempt < maxAttempts) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          attempt += 1;
          await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }
        break;
      }
      const data = await response.json();
      elements = data?.elements || [];
      break;
    } catch (err) {
      attempt += 1;
      if (attempt < maxAttempts) continue;
      break;
    }
  }

  if (!elements || elements.length === 0) {
    try {
      const { data: rows, error } = await supabase
        .from('locations')
        .select('*')
        .order('name', { ascending: true })
        .limit(200);

      if (error) throw error;

      elements = (rows || []).map(r => ({
        id: r.id,
        lat: r.latitude || r.lat, 
        lon: r.longitude || r.lon,
        tags: {
          name: r.name,
          amenity: r.category,
          description: r.description || r.address
        }
      }));
    } catch (err) {
      console.error('Fallback failed:', err);
      setApiBusinesses([]);
      setLoading(false);
      fetchLock.current = false;
      return;
    }
  }

  try {
    const transformed = elements.map((item, index) => {
      const tags = item.tags || {};
      const rawCat = tags.amenity || tags.shop || tags.leisure || "business";
      const uiCategory = categoryMap[rawCat] || "Other";
      const searchKeyword = (tags.name || rawCat).replace(/\s+/g, '').toLowerCase();

      return {
        id: item.id || `osm-${index}`,
        name: tags.name || "Local Business",
        lon: item.lon || (item.center ? item.center.lon : null),
        lat: item.lat || (item.center ? item.center.lat : null),
        rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
        categories: [uiCategory],
        price: tags.price_level === "1" ? "$" : "$$",
        distance: calculateDistance(lat, lng, 
          item.lat || item.center?.lat, 
          item.lon || item.center?.lon
        ),
        image: `https://loremflickr.com/400/300/${searchKeyword}?lock=${item.id || index}`,
        description: tags.description || `A great ${uiCategory} located in the area.`,
        tags: [tags.cuisine || rawCat || "LOCAL"].map(t => String(t).toUpperCase()),
      };
    });

    setApiBusinesses(transformed);
  } catch (err) {
    console.error('Error transforming elements:', err);
  } finally {
    setLoading(false);
    fetchLock.current = false;
  }
};
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setQuery('');
    }
  };

  const getPriceValue = (price) => {
    return price.length;
  };

  const sortBusinesses = (businesses) => {
    const sorted = [...businesses];
    switch (sortBy) {
      case 'Highest Rated':
        return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case 'Most Reviewed':
        return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      case 'Closest':
        return sorted.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      default:
        return sorted;
    }
  };

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('search')
    if (q && q.trim()) {
      const runSearch = async () => {
        setLoading(true)
        try {
          const clean = q.trim()
          const { data, error } = await supabase
            .from('locations')
            .select('*')
            .or(`name.ilike.%${clean}%,address.ilike.%${clean}%`)
            .limit(200)

          if (error) {
            console.error('Search query failed', error)
            setApiBusinesses([])
            return
          }

          const transformed = (data || []).map(item => ({
            id: item.id,
            name: item.name || item.business_name || 'Local Business',
            lon: item.lon || item.longitude || null,
            lat: item.lat || item.latitude || null,
            rating: item.rating || (Math.random() * (5 - 3.8) + 3.8).toFixed(1),
            categories: item.category ? [item.category] : ['Local Business'],
            price: item.price_level ? '$$$' : '$$',
            distance: item.distance || 0,
            status: item.status || 'LISTED',
            image: item.image || `https://loremflickr.com/400/300/${encodeURIComponent(item.name || 'store')}?lock=${item.id}`,
            description: item.description || item.address || '',
            tags: item.tags ? item.tags.split(',').map(t => t.toUpperCase()) : [],
          }))

          setApiBusinesses(transformed)
        } catch (err) {
          console.error('Search error', err)
          setApiBusinesses([])
        } finally {
          setLoading(false)
        }
      }

      runSearch()
      return
      
    }
    let isMounted = true;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationError(null)
          setUserCoords({ lat: latitude, lng: longitude });
          fetchOverpassData(latitude, longitude, appliedFilters.distance);
        },
        (error) => {
          console.error("Location access denied or unavailable.", error);
          setLocationError('Location access denied. Please allow location or adjust filters.')
        }
      );
    }
    return () => { isMounted = false; };
  }, [location.search]);

  const getCategoryIcon = (category) => {
    const cat = category.toLowerCase();
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
    const distanceMatch = parseFloat(business.distance) <= appliedFilters.distance;

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
    if (userCoords && userCoords.lat != null && userCoords.lng != null) {
      fetchOverpassData(userCoords.lat, userCoords.lng, distance);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationError(null)
          setUserCoords({ lat: latitude, lng: longitude });
          fetchOverpassData(latitude, longitude, distance);
        },
        (err) => {
          console.error('Geolocation request failed during Apply Filters:', err);
          setLocationError('Location unavailable. Please allow location access or enter a city.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
    setCurrentPage(1);
  };

  const filteredBusinesses = filterBusinesses();
  const businessesPerPage = 4;
  const sortedBusinesses = sortBusinesses(filteredBusinesses);
  const paginatedBusinesses = sortedBusinesses.slice(
    (currentPage - 1) * businessesPerPage,
    currentPage * businessesPerPage
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="material-icons text-sm">star</span>);
      } else if (i - rating < 1) {
        stars.push(<span key={i} className="material-icons text-sm">star_half</span>);
      } else {
        stars.push(<span key={i} className="material-icons text-sm">star_outline</span>);
      }
    }
    return stars;
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handlePriceClick = (price) => {
    setSelectedPrice(price);
  };

  const handleDistanceChange = (e) => {
    setDistance(parseInt(e.target.value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const totalPages = Math.ceil(sortedBusinesses.length / businessesPerPage);

  const maxVisibleButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  const visiblePages = Array.from(
    { length: (endPage - startPage) + 1 }, 
    (_, i) => startPage + i
  );

  return (
    <div className="bg-olivedarkgreen text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full mb-6 sm:hidden">
          <form onSubmit={handleSearch} className="bg-white rounded-full p-1.5 flex flex-row focus-within:border-2 hover:border-2 border-olivegreen">
            <input
              type="text"
              placeholder="What's on your mind today?..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 pl-5 focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <button type="submit" className="mr-5 cursor-pointer text-olivegreen hover:opacity-70">
              <span className="material-icons">search</span>
            </button>
          </form>
        </div>
        <aside className="w-full lg:w-64 space-y-8 shrink-0">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-olivetan">
              <span className="material-icons text-olivetan">tune</span> Filters
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Category</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes('All')}
                      onChange={() => setSelectedCategories(['All'])}
                      className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                      type="checkbox"
                    />
                    <span className="group-hover:text-olivegreen transition font-bold">All Categories</span>
                  </label>

                  {['Restaurants', 'Shopping', 'Nightlife', 'Active Life'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        checked={selectedCategories.includes(cat) && !selectedCategories.includes('All')}
                        onChange={() => {
                          setSelectedCategories(prev => {
                            const clean = prev.filter(c => c !== 'All');
                            return clean.includes(cat) ? clean.filter(c => c !== cat) : [...clean, cat];
                          });
                        }}
                        className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                        type="checkbox"
                      />
                      <span className="group-hover:text-olivegreen transition">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Rating</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleRatingClick('1')}
                    className={`w-10 h-10 rounded border flex items-center justify-center transition ${
                      selectedRating === '1'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    1+
                  </button>
                  <button
                    onClick={() => handleRatingClick('2')}
                    className={`w-10 h-10 rounded border flex items-center justify-center transition ${
                      selectedRating === '2'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    2+
                  </button>
                  <button
                    onClick={() => handleRatingClick('3')}
                    className={`w-10 h-10 rounded border flex items-center justify-center transition ${
                      selectedRating === '3'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    3+
                  </button>
                  <button
                    onClick={() => handleRatingClick('4')}
                    className={`w-10 h-10 rounded border flex items-center justify-center transition ${
                      selectedRating === '4'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    4+
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Price</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePriceClick('$')}
                    className={`px-3 h-10 rounded border flex items-center justify-center transition ${
                      selectedPrice === '$'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    $
                  </button>
                  <button
                    onClick={() => handlePriceClick('$$')}
                    className={`px-3 h-10 rounded border flex items-center justify-center transition ${
                      selectedPrice === '$$'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    $$
                  </button>
                  <button
                    onClick={() => handlePriceClick('$$$')}
                    className={`px-3 h-10 rounded border flex items-center justify-center transition ${
                      selectedPrice === '$$$'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    $$$
                  </button>
                  <button
                    onClick={() => handlePriceClick('$$$$')}
                    className={`px-3 h-10 rounded border flex items-center justify-center transition ${
                      selectedPrice === '$$$$'
                        ? 'border-olivegreen bg-olivegreen text-white'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-olivegreen hover:text-white'
                    }`}
                  >
                    $$$$
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-olivetan">Distance</label>
                <input
                  className="w-full accent-olivegreen"
                  max="50"
                  min="1"
                  type="range"
                  value={distance}
                  onChange={handleDistanceChange}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 mile</span>
                  <span className="font-semibold">{distance} miles</span>
                  <span>50 miles</span>
                </div>
              </div>
              <button
                onClick={handleApplyFilters}
                className="w-full py-3 bg-olivegreen text-white font-bold rounded hover:opacity-90 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </aside>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-olivetan">Recommended Results for you</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="text-sm border-gray-200 dark:border-gray-700 dark:bg-olivedarkgreen rounded-md focus:ring-olivegreen"
              >
                <option>Closest</option>
                <option>Highest Rated</option>
                <option>Most Reviewed</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            { loading ? (<div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olivegreen"></div>
                <p className="mt-4 text-olivetan font-medium">Scanning the neighborhood...</p>
              </div>) : 
            paginatedBusinesses.length > 0 ? 
              paginatedBusinesses.map(business => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name)}&query_place_id=${business.lat},${business.lon}`;
                return (
                <div key={business.id} className="business-card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img alt={business.name} className="business-image w-full h-full object-cover transition-transform duration-500" src={business.image}/>
                  </div>
                  <div className="p-5">
                    <Link to={`/business/${business.id}`} state={{ businessData: business }} className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{business.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        {renderStars(business.rating)}
                        <span className="text-xs text-gray-500 ml-1 font-semibold">({business.rating})</span>
                      </div>
                    </Link>
                    <Link state={{ businessData: business }} to={`/business/${business.id}`} className="flex items-center gap-1 text-olivegreen mb-2">
                      <span className="material-icons text-lg">{getCategoryIcon(business.categories[0])}</span>
                      <span className="text-xs font-bold uppercase tracking-tighter">{business.categories[0]}</span>
                    </Link>
                    <Link state={{ businessData: business }} to={`/business/${business.id}`} className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{business.description}</Link>
                    <a 
                      href={googleMapsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mb-4 z-50 flex items-center justify-center gap-2 w-full py-2 bg-gray-50 dark:bg-slate-700 hover:bg-olivegreen hover:text-white transition-colors rounded-lg text-xs font-bold text-olivegreen dark:text-olivegreen/80 border border-olivegreen/20"
                    >
                      <span className="material-icons text-sm">explore</span>
                      VIEW ON GOOGLE MAPS
                    </a>
                    <Link state={{ businessData: business }} to={`/business/${business.id}`} className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex gap-2">
                        {business.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-[10px] font-bold rounded">{tag}</span>
                        ))}
                      </div>
                      <span className="text-olivesepia font-bold text-sm">{business.distance} miles away</span>
                    </Link>
                  </div>
                </div>
              )}) 
             : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No businesses match your filters. Try adjusting your criteria.</p>
              </div>
            )}
          </div>
          <div className="mt-12 flex justify-center">
            <nav className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons text-sm">chevron_left</span>
              </button>
              {visiblePages.map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={page > Math.ceil(sortedBusinesses.length / businessesPerPage)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    currentPage === page
                      ? 'bg-olivegreen text-white'
                      : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(sortedBusinesses.length / businessesPerPage)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-icons text-sm">chevron_right</span>
              </button>
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Businesses;