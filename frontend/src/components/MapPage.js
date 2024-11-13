import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
 // Creating a custom icon for the marker
 const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png', // Path to marker icon
    iconSize: [25, 41], // Size of the marker
    iconAnchor: [12, 41], // Anchor point for the marker
    popupAnchor: [1, -34], // Where the popup appears in relation to the marker
    shadowSize: [41, 41], // Size of the shadow
  });
const MapPage = () => {
  const position = [28.6139, 77.2090]; // Example coordinates

  useEffect(() => {
    // Ensure map is properly initialized after the component is mounted
    console.log("Map rendered");
  }, []);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Incident Location Map</h2>
      <div className="relative w-full flex-1">
        <MapContainer
          center={position}
          zoom={13}
          className="w-full h-full" // Ensure full width and height
          style={{ height: '100vh' }} // Set height to 100vh or a specific value
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>Incident location here</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
