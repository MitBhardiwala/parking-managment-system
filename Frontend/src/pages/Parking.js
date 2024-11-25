import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteParking, fetchParkings } from '../api/api';
import { DeleteModal, ParkingCard } from '../components';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import './../css/parking.scss';

// Custom red marker icon
const redMarkerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const Parking = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [parkings, setParkings] = useState();
    const [activeParking, setActiveParking] = useState(null);
    const [mapView, setMapView] = useState(false);
    
    // Default center (you can adjust these coordinates)
    const defaultCenter = [43.6532, -79.3832]; // Toronto coordinates

    // Delete management states
    const [selectedParking, setSelectedParking] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings });
        } else {
            fetchParkings({ setParkings });
        }
    }, []);

    const parkingCards = () => {
        return parkings && parkings.map((item, index) => (
            <div className='col-md-4' key={index}>
                <ParkingCard
                    parking={item}
                    onClick={() => navigate('/space', { state: { parking: item } })}
                    setSelectedParking={setSelectedParking}
                    setShowDeleteModal={setShowDeleteModal}
                />
            </div>
        ));
    };

    const handleDeleteParking = () => {
        deleteParking({ id: selectedParking?._id, handleDeleteParkingSuccess, handleDeleteParkingFailure });
    };

    const handleDeleteParkingSuccess = () => {
        if (user?.type === 'owner') {
            fetchParkings({ user_id: user?._id, setParkings });
        } else {
            fetchParkings({ setParkings });
        }
        setShowDeleteModal(false);
    };

    const handleDeleteParkingFailure = () => {
        setShowDeleteModal(false);
    };

    const MapSection = () => {
        if (!parkings?.length) return null;

        // Calculate center based on first parking location or use default
        const mapCenter = parkings[0]?.lat && parkings[0]?.long 
            ? [parseFloat(parkings[0].lat), parseFloat(parkings[0].long)]
            : defaultCenter;

        return (
            <div style={{ height: "500px", width: "100%", marginBottom: "2rem" }}>
                <MapContainer 
                    center={mapCenter} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {parkings.map((parking, index) => (
                        parking.lat && parking.long ? (
                            <Marker 
                                key={index}
                                position={[parseFloat(parking.lat), parseFloat(parking.long)]}
                                icon={redMarkerIcon}
                                eventHandlers={{
                                    click: () => navigate('/space', { state: { parking } })
                                }}
                            >
                                <Tooltip 
                                    permanent 
                                    direction="top" 
                                    offset={[0, -40]}
                                    className="custom-tooltip"
                                >
                                    {parking.name}
                                </Tooltip>
                                <Popup>
                                    <div>
                                        <h3 style={{ margin: "0 0 5px 0" }}>{parking.name}</h3>
                                        <p style={{ margin: "0 0 5px 0" }}>{parking.address}</p>
                                        <p style={{ margin: "0" }}>{parking.city}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null
                    ))}
                </MapContainer>
            </div>
        );
    };

    return (
        <div className='container'>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginTop: '2rem',
                marginBottom: '1rem'
            }}>
                <h1>Parkings</h1>
                <button
                    onClick={() => setMapView(!mapView)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {mapView ? 'Show List' : 'Show Map'}
                </button>
            </div>

            {mapView ? (
                <MapSection />
            ) : (
                <div className='row mt-2 g-5'>
                    {parkingCards()}
                </div>
            )}
            
            <DeleteModal 
                value={selectedParking?.name} 
                showModal={showDeleteModal} 
                setShowModal={setShowDeleteModal} 
                onDeleteConfirm={handleDeleteParking}
            />

            {/* Add custom styles for the tooltip */}
            <style>
                {`
                    .custom-tooltip {
                        background: white;
                        border: 1px solid #ccc;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-weight: bold;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .leaflet-tooltip-top.custom-tooltip:before {
                        border-top-color: white;
                    }
                `}
            </style>
        </div>
    );
};

export default Parking;