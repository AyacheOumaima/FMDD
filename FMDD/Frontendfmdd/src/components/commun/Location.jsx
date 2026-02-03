import React from "react";

export default function Localisation() {
  // Coordonnées de Casablanca, Maroc
  const latitude = 33.5731;
  const longitude = -7.5898;

  return (
    <div className="p-4 bg-white h-100 rounded-md w-full">
      <h2 className="text-lg font-semibold mb-4 text-blue-950 flex items-center gap-2">
        <span>📍</span> Notre Siège à Casablanca
      </h2>
      <div className="relative overflow-hidden rounded-xl border border-gray-100 shadow-sm">
        <iframe
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
          width="100%"
          height="350"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="FMDD Casablanca Location"
          className="w-full"
        />
      </div>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-blue-900 font-medium">
          Casablanca, Maroc
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Centre ville - Près de toutes commodités
        </p>
      </div>
    </div>
  );
}
