import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ParkingMap = ({ parkings }) => {
  // Find center of all parking locations or default to a central location
  const getMapCenter = () => {
    if (!parkings || parkings.length === 0) {
      return [0, 0]; // Default center if no parkings
    }
    
    const validParkings = parkings.filter(p => p.lat && p.long);
    if (validParkings.length === 0) return [0, 0];
    
    const avgLat = validParkings.reduce((sum, p) => sum + parseFloat(p.lat), 0) / validParkings.length;
    const avgLong = validParkings.reduce((sum, p) => sum + parseFloat(p.long), 0) / validParkings.length;
    
    return [avgLat, avgLong];
  };

  return (
    <div className="w-full h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
      <MapContainer 
        center={getMapCenter()} 
        zoom={13} 
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {parkings?.map((parking, index) => (
          parking.lat && parking.long ? (
            <Marker 
              key={index} 
              position={[parseFloat(parking.lat), parseFloat(parking.long)]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">{parking.name}</h3>
                  <p>{parking.address}</p>
                  <p>{parking.city}</p>
                  {parking.owner_rating && (
                    <p>Rating: {parking.owner_rating} ⭐</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;