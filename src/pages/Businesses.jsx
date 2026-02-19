import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

function Businesses() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Relevant');
  const [selectedCategories, setSelectedCategories] = useState(['Restaurants']);
  const [selectedRating, setSelectedRating] = useState('4');
  const [selectedPrice, setSelectedPrice] = useState('$$');
  const [distance, setDistance] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    categories: ['Restaurants'],
    rating: '4',
    price: '$$',
    distance: 10,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Add search filtering logic here if needed
      setQuery('');
    }
  };

  const businesses = [
    {
      id: 1,
      name: 'Buffalo Brickhouse Grill',
      rating: 4.5,
      categories: ['Restaurants', 'Burgers'],
      price: '$$',
      distance: 2.4,
      status: 'OPEN NOW',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMu6C6iL8WQLzmY1z-1rFP2bk2Jwfr_Dk4DT5UdztX5BuCPjooZXKREcdrza3xISOgpwTJQ5xF0Kyw84t2ClaSPC8G6y5Q32eMLYj_0Txi4mtqn0RLsGuKEUGCqF9w_w54o2JrWH0rm3-L6DDYU8wtFr124ikRxqwbItf4iZsjs_DQJ6YDmwnZQ3Jm6d0hgIc7cf2t2zGj3aNBQ2ljAaSW_jR5rbXrwqcpigNsw3iWwr7Y5x21VKixuWq0ZhkrC4rL15wSASw4TzIo',
      description: 'Fantastic meals with generous serving sizes. The staff was welcoming and made sure we were taken care of quickly.',
      tags: ['BURGERS', 'PUB'],
    },
    {
      id: 2,
      name: 'Queen City Kitchen',
      rating: 5.0,
      categories: ['Restaurants'],
      price: '$$$',
      distance: 0.8,
      status: 'OPEN NOW',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtJY42YX6IxrLKW_ckwOF78XivWkLcmbP-JkDenncRm_mJAnPYWN5VeJGrudKyomNIdecMQSuC6CpG13d3BPCeIu4Bw5jApPF8r9Ud2jokDsXhitxLPE7HLOsuOy28LvC-WX1CsFph0r3B9T1dlUJGmVEljox1RtQRlYtrESLCsFaRqzqplFPKwYHlJ5Zoh7iJuVfBxTQl5zX-RvsQ43SQtdjjiOiqsOqu7_mgQ721XfActp3G3Oe7-ujN3IqaBR_vYs2eefZVpqIg',
      description: 'Upscale dining experience with locally sourced ingredients. Perfect for date nights and special occasions.',
      tags: ['UPSCALE', 'ITALIAN'],
    },
    {
      id: 3,
      name: 'Niagara Street Smokehouse',
      rating: 4.0,
      categories: ['Restaurants'],
      price: '$$',
      distance: 1.5,
      status: 'CLOSED',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtRHO_Ae-d55aCPokPX4014jPEfPss-FYbbr0-j16XOffHtJCTwidoFYwF0NpWiZzeCCNMricR_S8lOIvKuHK5twhJCZXGYkNtH-H4IqV0TStRnoYX88N_qScGhJYuvqqgZzLnEYu-JCAuKFFg4on_FbFtr-h8ydKr19ClMGibwZIS80RqyR7gFy4dCZ42hsOHMzoLjiMK2C8ylCkuxbDVdG9GH4rG3qu4coSE8uEQY4q0H5orOhnZ0GcU2wCwqWbOlb18bW0GpTeP',
      description: 'The best BBQ in town! Their brisket is smoked for 14 hours and falls right off the bone. A must-try!',
      tags: ['BBQ', 'SMOKEHOUSE'],
    },
    {
      id: 4,
      name: 'The Coffee Corner',
      rating: 4.8,
      categories: ['Restaurants'],
      price: '$',
      distance: 3.1,
      status: 'OPEN NOW',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8cSDr94lKs78AFhBnVvpLRBZ3bljolvi1zXLda6fKCy84DG2B9kcLtpowGlNqsaMOGNL_8pZzis_gMR9zCaDWZ39wWBqsEqokT9kZRvijCVQIBFO7yZ36_bvvz6mmLugwGI4f2tH4rP9CfuqEOz4Q5KpWRLHrq319rXVOit7TVWwqA9EImOjMLW-PEyJJAYdL1YIo7Ijhnjgavx9btNMW2o142yOBLrHsSmWJr9vQd87BbYtGYbMATgVWPuhuR3P5u5OqLaYHUhS',
      description: 'Quiet little spot perfect for working or catching up with friends. Amazing house-roasted beans.',
      tags: ['COFFEE', 'BAKERY'],
    },
  ];

  const getPriceValue = (price) => {
    return price.length;
  };

  const sortBusinesses = (businesses) => {
    const sorted = [...businesses];
    switch (sortBy) {
      case 'Highest Rated':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'Most Reviewed':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'Newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'Most Relevant':
      default:
        return sorted;
    }
  };

  const filterBusinesses = () => {
    return businesses.filter(business => {
      const categoryMatch = business.categories.some(cat =>
        appliedFilters.categories.includes(cat)
      );

      const ratingMatch = business.rating >= parseInt(appliedFilters.rating);

      const priceMatch = getPriceValue(business.price) <= getPriceValue(appliedFilters.price);

      const distanceMatch = business.distance <= appliedFilters.distance;

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

  return (
    <div className="bg-olivetan dark:bg-olivedarkgreen text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
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
                      checked={selectedCategories.includes('Restaurants')}
                      onChange={() => handleCategoryChange('Restaurants')}
                      className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                      type="checkbox"
                    />
                    <span className="group-hover:text-olivegreen transition">Restaurants</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes('Shopping')}
                      onChange={() => handleCategoryChange('Shopping')}
                      className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                      type="checkbox"
                    />
                    <span className="group-hover:text-olivegreen transition">Shopping</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes('Nightlife')}
                      onChange={() => handleCategoryChange('Nightlife')}
                      className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                      type="checkbox"
                    />
                    <span className="group-hover:text-olivegreen transition">Nightlife</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes('Active Life')}
                      onChange={() => handleCategoryChange('Active Life')}
                      className="rounded text-olivegreen focus:ring-olivegreen border-gray-300"
                      type="checkbox"
                    />
                    <span className="group-hover:text-olivegreen transition">Active Life</span>
                  </label>
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
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-48 relative shadow-sm">
            <img alt="Map Preview" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNTFLFp5VOd59t2AGcWI0CP4oivvV_NLC8x7bGhLrA9yUgIkSIomos1pzxItpTS8zCoag8OwamJHg4L_dygoOVDQQOj8z0oU8MM7fVw5nqXjr7MXKdzQL1KW_vlQLw2w5d4y0ASTdn_yaMD5kWaXbI8fjmhM-c27R-p_MDa3PNmdFFEfyYZXJKJYeQD3FCU3ah9_eeHRlBfEj2qx10Q9_QCl9mvVyehuypzQlew0Wvj140_taHzAgaWPmwD7RVUhM2AXRKZoiQNMCW"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-icons text-olivegreen text-4xl drop-shadow-lg">place</span>
            </div>
            <div className="absolute bottom-2 left-2">
              <button className="bg-white/90 dark:bg-black/80 px-3 py-1 text-xs font-bold rounded-full shadow-sm hover:bg-white transition">Expand Map</button>
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
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Most Reviewed</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedBusinesses.length > 0 ? (
              paginatedBusinesses.map(business => (
                <div key={business.id} className="business-card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img alt={business.name} className="business-image w-full h-full object-cover transition-transform duration-500" src={business.image}/>
                    <div className={`absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold ${
                      business.status === 'OPEN NOW' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {business.status}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{business.name}</h3>
                      <div className="flex items-center text-yellow-500">
                        {renderStars(business.rating)}
                        <span className="text-xs text-gray-500 ml-1 font-semibold">({business.rating})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{business.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex gap-2">
                        {business.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-[10px] font-bold rounded">{tag}</span>
                        ))}
                      </div>
                      <span className="text-olivesepia font-bold text-sm">{business.distance} miles away</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
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
              {[1, 2, 3].map(page => (
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