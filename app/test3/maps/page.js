"use client"
import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import { CircleMarker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const locations = [
//   { lat: 40.7128, lng: -74.0060, radius: 10, color: 'red' }, // New York
//   { lat: 34.0522, lng: -118.2437, radius: 10, color: 'blue' }, // Los Angeles
//   { lat: 41.8781, lng: -87.6298, radius: 10, color: 'green' }, // Chicago
// ];

// function CirclesOverlay() {
//   const map = useMap();

//   useEffect(() => {
//     map.invalidateSize();
//   }, [map]);

//   return (
//     <>
//       {locations.map((loc, i) => (
//         <CircleMarker
//           key={i}
//           center={[loc.lat, loc.lng]}
//           radius={loc.radius}
//           fillColor={loc.color}
//           color={loc.color}
//           fillOpacity={0.5}
//         />
//       ))}
//     </>
//   );
// }

export default function MapWithCircles() {
  return (
    <div className='h-full w-[500px]'>
        {/* <MapContainer
        center={[39.8283, -98.5795]}
        zoom={4}
        style={{ height: '500px', width: '100%' }}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <CirclesOverlay />
        </MapContainer> */}
    </div>
  );
}
