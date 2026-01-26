import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 37.7749, lng: -122.4194 };

const UserLocationMap = () => {
  const [userLocation, setUserLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("User denied geolocation or unavailable.");
        }
      );
    } else {
      console.warn("Geolocation not supported by browser.");
    }
  }, []);

  if (!isLoaded) return <div className="text-center mt-10">Loading map...</div>;

  return (
    <div className="w-full h-125 rounded-xl overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || defaultCenter}
        zoom={12}
      >
        {userLocation && <Marker position={userLocation} />}
      </GoogleMap>
    </div>
  );
};

export default UserLocationMap;
