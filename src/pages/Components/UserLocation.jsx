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

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 15);
    },
    locationerror() {
      alert("Location access denied.");
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

function LocateButton() {
  const map = useMap();
  return (
    <button 
      onClick={() => map.locate()}
      className="absolute bottom-6 right-6 z-[1000] bg-white p-3 rounded-xl shadow-2xl border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all group"
    >
      <Navigation className="w-6 h-6 text-indigo-600 group-hover:rotate-12 transition-transform" />
    </button>
  );
}

export default function MapApp() {
  const defaultCenter = [43.011589, -78.710838]; // Will East HS

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-olivegreen">Local Explorer</h1>
        <p className="text-olivedarkgreen font-semibold text-lg">Find your location and explore nearby restaurants.</p>
      </div>

      <div className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        <MapContainer 
          center={defaultCenter} 
          zoom={13} 
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker />
          <LocateButton />

        </MapContainer>
      </div>
    </div>
  );
}