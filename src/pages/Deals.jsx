// Deals.jsx - Local deals page component.
// This component displays local business deals fetched from Overpass API, with search and filtering capabilities.
// Generates deal templates based on business types and displays them in a responsive grid.

import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import locationon from '../assets/icons/locationon.png';
import payments from '../assets/icons/paryments.png';

// Deals functional component.
// Manages state for deals data, loading, search, and filtering.
// Fetches real-world business data and generates deals.
export default function Deals() {
  // State for array of deals.
  const [deals, setDeals] = useState([]);

  // State for loading indicator.
  const [loading, setLoading] = useState(true);

  // State for search term input.
  const [searchTerm, setSearchTerm] = useState('');

  // State for filter (currently unused but available for future filtering).
  const [filter, setFilter] = useState('All');

  // Function to generate a deal object based on business tags and ID.
  // Creates different deal templates for various business types (restaurant, cafe, etc.).
  const generateDeal = (tags, id) => {
    // Determine business type from tags.
    const type = tags.amenity || tags.shop || tags.leisure || 'service';

    // Deal templates for different business types.
    const dealTemplates = {
      restaurant: { title: '20% OFF', desc: 'Valid on entire bill for dine-in.', icon: 'restaurant' },
      cafe: { title: 'BOGO COFFEE', desc: 'Buy one get one free on all lattes.', icon: 'local_cafe' },
      pub: { title: 'HAPPY HOUR', desc: '$2 off all craft drafts until 7pm.', icon: 'sports_bar' },
      supermarket: { title: '$5 OFF', desc: 'When you spend $40 or more.', icon: 'shopping_cart' },
      hairdresser: { title: '15% SAVINGS', desc: 'On all color and cut services.', icon: 'content_cut' },
      gym: { title: 'FREE SESSION', desc: 'First personal training session free.', icon: 'fitness_center' },
      default: { title: 'LOCAL SPECIAL', desc: 'Mention this app for a surprise discount!', icon: 'local_offer' }
    };

    // Select appropriate template or default.
    const template = dealTemplates[type] || dealTemplates.default;

    // Return deal object with generated data.
    return {
      id: id,
      business: tags.name || 'Local Business',
      title: template.title,
      description: template.desc,
      category: type,
      distance: (Math.random() * 3).toFixed(1), // Random distance for demo
      image: `https://loremflickr.com/400/300/${type}?lock=${id}`, // Placeholder image
      icon: template.icon
    };
  };

  // Function to fetch real-world business data from Overpass API.
  // Queries for restaurants, cafes, pubs, supermarkets, etc. within 3km radius.
  const fetchRealWorldData = async () => {
    setLoading(true);
    try {
      // Austin, TX coordinates for demo.
      const lat = 30.2672;
      const lon = -97.7431;

      // Overpass API query for various business types.
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"~"restaurant|cafe|pub"](around:3000,${lat},${lon});
          node["shop"~"supermarket|hairdresser|clothes"](around:3000,${lat},${lon});
        );
        out body 12;
      `;

      // Fetch data from Overpass API.
      const response = await fetch(`https://lz4.overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();

      // Map API results to deal objects.
      const mappedDeals = data.elements.map((el, index) => generateDeal(el.tags, el.id));
      setDeals(mappedDeals);
    } catch (error) {
      console.error("Error fetching local data", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch deals on component mount.
  useEffect(() => {
    fetchRealWorldData();
  }, []);

  // Filter deals based on search term.
  const filteredDeals = deals.filter(deal =>
    deal.business.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex flex-1 justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">

          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-olivegreen text-4xl font-black mb-2">Local Deals</h1>
            <p className="text-olivedarkgreen text-lg">The best deals for restaurants in your area.</p>
          </div>

          {/* Search bar */}
          <div className="bg-olivetan p-6 rounded-xl shadow-sm mb-8">
            <div className="flex w-full h-12 rounded-lg bg-white overflow-hidden border-2 border-transparent focus-within:border-olivegreen transition-all">
              <input
                className="flex-1 px-4 outline-none text-olivegreen"
                placeholder="Search live businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="bg-olivesepia text-white px-6 font-bold">Search</button>
            </div>
          </div>

          {/* Loading spinner or deals grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-olivegreen"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Individual deal cards */}
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="bg-white border-2 border-dashed border-olivetan rounded-xl overflow-hidden flex flex-col hover:shadow-xl transition-all group">
                  {/* Deal image with category badge */}
                  <div className="w-full aspect-video bg-cover bg-center" style={{backgroundImage: `url(${deal.image})`}}>
                    <div className="bg-olivesepia/90 text-white text-xs font-bold px-3 py-1 rounded-full m-3 inline-block">
                      {deal.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Deal content */}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black text-olivesepia">{deal.title}</h3>
                      <span className="text-olivedarkgreen text-sm flex items-center">
                        <img src={locationon} alt="Location Icon" className="w-4 h-4 mr-1" />{deal.distance} mi
                      </span>
                    </div>
                    <p className="text-olivegreen text-lg font-bold mb-1">{deal.business}</p>
                    <p className="text-olivedarkgreen text-sm mb-4">{deal.description}</p>

                    {/* Claim deal button */}
                    <a href="https://groupon.com" className="mt-auto w-full bg-olivesepia text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-olivegreen transition-colors">
                      Claim Deal  <img src={payments} alt="Payments Icon" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}