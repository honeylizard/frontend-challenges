import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import markerIcon from "../../assets/ip-address-tracker/icon-location.svg";
import * as Leaflet from "leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { Marker } from "react-leaflet/Marker";
import { TileLayer } from "react-leaflet/TileLayer";

import mapStyles from "../../styles/ip-address-tracker/map.module.scss";

const LeafletMap = ({ results = {} }) => {
    const initialZoom = 5;

    const [map, setMap] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        if (results.coordinates) {
            const newLat = results.coordinates[0];
            const newLng = results.coordinates[1];

            if (latitude !== newLat || longitude !== newLng) {
                setLatitude(newLat);
                setLongitude(newLng);
                map.panTo([newLat, newLng]);
                map.setZoom(initialZoom);
            }
        }
    }, [results, latitude, longitude, map]);

    const coordinates = [latitude, longitude];

    const marker = Leaflet.icon({
        iconUrl: markerIcon,
        iconSize: [46, 56], // size of the icon
        iconAnchor: [23, 56], // point of the icon which will correspond to marker's location
    });

    return (
        <React.Fragment>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
                    integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
                    crossOrigin=""
                />
            </Helmet>
            <div className={mapStyles.mapContainer}>
                <MapContainer
                    center={coordinates}
                    zoom={initialZoom}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    boxZoom={false}
                    doubleClickZoom={false}
                    dragging={false}
                    keyboard={false}
                    className={mapStyles.map}
                    ref={setMap}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                        position={coordinates}
                        icon={marker}
                        keyboard={false}
                        alt="Location of IP Address on map"
                    ></Marker>
                </MapContainer>
            </div>
        </React.Fragment>
    );
};

LeafletMap.propTypes = {
    results: PropTypes.shape({
        coordinates: PropTypes.array,
    }),
};

export default LeafletMap;
