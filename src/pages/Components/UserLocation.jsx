import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const userLocationIcon = L.divIcon({
  html: `<div class="relative flex items-center justify-center">
           <div class="absolute h-8 w-8 bg-blue-500 rounded-full animate-ping opacity-30"></div>
           <div class="relative h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>
         </div>`,
  className: '',
  iconSize: [32, 32],
});

const getOverpassBusinesses = async (lat, lng) => {
  const radius = 4000;
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"]["amenity"!="bench"](around:${radius},${lat},${lng});
      node["shop"](around:${radius},${lat},${lng});
    );
    out body;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  const maxAttempts = 3;
  let attempt = 0;

  while (attempt < maxAttempts) {
    try {
      const response = await fetch(url);

      // If server returned non-OK, try to handle 429 specially (rate limit)
      if (!response.ok) {
        const text = await response.text();
        if (response.status === 429) {
          console.warn(`Overpass 429 (attempt ${attempt + 1}):`, text && text.slice?.(0, 200));
          attempt += 1;
          // exponential backoff before retrying
          if (attempt < maxAttempts) {
            await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
            continue;
          }
          // Exceeded retries
          return [];
        }

        // Non-JSON response or other error page (e.g., HTML) - log and return empty
        console.error(`Overpass non-OK response (${response.status}):`, text && text.slice?.(0, 400));
        return [];
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        // Sometimes Overpass returns HTML/XML error pages; capture and log
        const text = await response.text();
        console.error('Overpass returned non-JSON payload:', text && text.slice?.(0, 400));
        return [];
      }

      const data = await response.json();
      return data?.elements || [];
    } catch (err) {
      console.error('Overpass fetch error (network or parse):', err);
      attempt += 1;
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }
      return [];
    }
  }

  return [];
};


function OverpassMarkers({ userCoords }) {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    if (!userCoords.lat || !userCoords.lng) return;

    const loadData = async () => {
      const elements = await getOverpassBusinesses(userCoords.lat, userCoords.lng);
      setBusinesses(elements);
    };
    loadData();
  }, [userCoords]);

  return (
    <>
      {businesses.map((biz, idx) => (
        <Marker key={idx} position={[biz.lat, biz.lon]}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold">{biz.tags.name || "Local Business"}</h3>
              <p className="text-gray-600 text-sm capitalize">
                {(biz.tags.shop || biz.tags.amenity || 'Store').replace('_', ' ')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function LocationMarker({ onLocationFound }) {
  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 15);
      if (onLocationFound) {
        onLocationFound({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null; 
}

function LocateButton() {
  const map = useMap();
  return (
    <button 
      onClick={() => map.locate()}
      className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-xl shadow-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all"
    >
      <Navigation className="w-6 h-6 text-blue-600" />
    </button>
  );
}

export default function UserLocation({ onLocationFound, coords }) {
  const defaultCenter = [43.011589, -78.710838]; 

  return (
    <div className="flex flex-col h-[600px] w-full">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-olivegreen">Explore Your Neighborhood</h2>
        <p className="text-gray-600">See who's nearby and invite them to the community.</p>
      </div>
      <div className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <MapContainer center={defaultCenter} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {coords && <Marker position={[coords.lat, coords.lng]} icon={userLocationIcon} />}
          
          <LocationMarker onLocationFound={onLocationFound} />
          <OverpassMarkers userCoords={coords} />
          <LocateButton />
        </MapContainer>
      </div>
    </div>
  );
}