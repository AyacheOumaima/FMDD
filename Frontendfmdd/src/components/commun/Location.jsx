import React, { useState, useEffect } from "react";

export default function Localisation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        () => {
          setLocation(null); // En cas d'erreur, pas de localisation
        }
      );
    }
  }, []);

  return (
    <div className="p-4 bg-white h-100 rounded-md w-full">
      <h2 className="text-lg font-semibold">📍 Localisation</h2>
      {location ? (
        <iframe
          src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
          width="100%"
          height="300"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          className="h-80"
        />
      ) : (
        <p className="text-gray-500">Localisation indisponible</p>
      )}
    </div>
  );
}
