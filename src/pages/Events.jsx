// Events.jsx - Local events page component.
// This component displays live events fetched from Ticketmaster API, with geolocation, category filtering, and carousel navigation.
// Shows events in a sliding carousel format with date badges and venue information.

import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import schedule from "../assets/icons/schedule.png";
import locationon from "../assets/icons/locationon.png";
import filterIcon from "../assets/icons/filter.png";
import left from "../assets/icons/left.png";
import right from "../assets/icons/right.png";

// Events functional component.
// Manages state for events data, loading, carousel navigation, geolocation, and category filtering.
// Fetches events from Ticketmaster API based on user location and selected category.
export default function Events() {
  // State for array of events.
  const [events, setEvents] = useState([]);

  // State for loading indicator.
  const [loading, setLoading] = useState(true);

  // State for current carousel slide index.
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for error messages.
  const [error, setError] = useState(null);

  // State for location name display.
  const [locationName, setLocationName] = useState("your area");

  // State for user coordinates.
  const [coords, setCoords] = useState({ lat: null, lon: null });

  // State for selected category filter.
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Ticketmaster API key from environment variables.
  const API_KEY = import.meta.env.VITE_TICKETMASTER_KEY;

  // Available event categories for filtering.
  const categories = ["All", "Music", "Sports", "Arts & Theatre", "Film", "Miscellaneous"];

  // Function to fetch events from Ticketmaster API.
  // Takes optional lat/lon for location-based search and category for filtering.
  const fetchEvents = async (lat = coords.lat, lon = coords.lon, category = selectedCategory) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentIndex(0); // Reset carousel to first slide

      // Build API URL with base parameters.
      let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&size=15&sort=date,asc`;

      // Add location parameters if coordinates available.
      if (lat && lon) {
        url += `&latlong=${lat},${lon}&radius=50&unit=miles`;
      }

      // Add category filter if not "All".
      if (category !== "All") {
        url += `&classificationName=${encodeURIComponent(category)}`;
      }

      // Fetch data from API.
      const response = await fetch(url);
      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      // Process response data.
      if (data._embedded) {
        setEvents(data._embedded.events);
        // Extract city name from first event for display.
        const city = data._embedded.events[0]._embedded?.venues?.[0]?.city?.name;
        if (city) setLocationName(city);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError("Could not load events for this category.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch events on component mount and API key availability.
  // Attempts to get user geolocation, falls back to general search.
  useEffect(() => {
    if (!API_KEY) return;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          fetchEvents(latitude, longitude, selectedCategory);
        },
        () => fetchEvents(null, null, selectedCategory) // Fallback on geolocation error
      );
    } else {
      fetchEvents(null, null, selectedCategory); // Fallback if geolocation not supported
    }
  }, [API_KEY]);

  // Function to handle category filter change.
  // Updates selected category and refetches events.
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    fetchEvents(coords.lat, coords.lon, cat);
  };

  // Function to move to next carousel slide.
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= events.length - 2 ? 0 : prev + 1));
  };

  // Function to move to previous carousel slide.
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, events.length - 3) : prev - 1));
  };

  // Function to format date string into month/day object.
  const formatDate = (dateString) => {
    if (!dateString) return { month: 'TBD', day: '??' };
    const date = new Date(dateString + 'T00:00:00');
    return {
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    };
  };

  return (
    <div className="font-display bg-olivetan text-slate-900 min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      {/* Hero section with title and description */}
      <section className="relative h-48 flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-olivedarkgreen/80 backdrop-blur-[2px]"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">
            {selectedCategory === "All" ? "Live" : selectedCategory} Events in {locationName}
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-base font-medium">
            Hand-picked local vibes for your 2026 calendar.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar with category filters */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-olivedarkgreen rounded-2xl p-6 border border-white/10 sticky top-24 shadow-xl">
              <h3 className="text-lg font-black mb-6 flex items-center text-olivetan">
                <img src={filterIcon} alt="filter" className="w-5 h-5 mr-2 brightness-0 invert" />
                Filter by Category
              </h3>
              <div className="flex flex-col gap-2">
                {/* Category filter buttons */}
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                      ? "bg-olivetan text-olivedarkgreen"
                      : "text-olivetan/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content area with carousel */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-olivedarkgreen uppercase tracking-tight">
                {selectedCategory} Near You
              </h2>
              {/* Carousel navigation buttons */}
              <div className="flex space-x-2">
                <button onClick={prevSlide} className="bg-olivedarkgreen text-white p-2 rounded-full hover:bg-olivegreen">
                  <img src={left} alt="Previous" className="w-4 h-4" />
                </button>
                <button onClick={nextSlide} className="bg-olivedarkgreen text-white p-2 rounded-full hover:bg-olivegreen">
                  <img src={right} alt="Next" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Loading, error, or events display */}
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-olivedarkgreen"></div>
                <span className="text-olivedarkgreen font-bold italic">Refining your results...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-olivedarkgreen italic p-12 border-2 border-dashed border-olivedarkgreen/20 rounded-xl text-center">
                No {selectedCategory.toLowerCase()} events found nearby. Try another category!
              </div>
            ) : (
              /* Events carousel */
              <div
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {/* Individual event cards */}
                {events.map((event) => {
                  const dateInfo = formatDate(event.dates?.start?.localDate);
                  const eventImg = event.images?.find(img => img.ratio === "16_9")?.url ?? event.images?.[0]?.url;

                  return (
                    <article key={event.id} className="min-w-[calc(33.333%-1rem)] bg-olivesepia rounded-2xl shadow-lg border border-white/10 overflow-hidden flex flex-col transition-all">
                      {/* Event image with date badge */}
                      <div className="relative h-44">
                        <img alt={event.name} className="w-full h-full object-cover" src={eventImg} />
                        <div className="absolute top-3 left-3 bg-olivedarkgreen text-white rounded-xl p-1.5 px-2.5 text-center">
                          <span className="block text-[10px] font-black uppercase">{dateInfo.month}</span>
                          <span className="block text-lg font-black">{dateInfo.day}</span>
                        </div>
                      </div>

                      {/* Event details */}
                      <div className="p-5 flex-1 flex flex-col text-white">
                        <h3 className="text-lg font-black mb-3 line-clamp-2 h-12 leading-tight">{event.name}</h3>
                        <div className="text-xs text-olivetan/80 space-y-1 mb-4 font-medium">
                          <p className="flex items-center">
                            <img src={locationon} className="w-3 h-3 mr-2 brightness-0 invert" alt="loc" />
                            {event._embedded?.venues?.[0]?.name}
                          </p>
                        </div>
                        {/* Ticket link */}
                        <a href={event.url} target="_blank" rel="noreferrer" className="mt-auto w-full bg-olivedarkgreen text-white py-2.5 rounded-xl font-black text-center text-xs hover:bg-olivegreen">GET TICKETS</a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}