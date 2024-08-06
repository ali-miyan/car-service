import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import polyline from 'polyline';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpbWl5biIsImEiOiJjbHk2d2Y4MGowZGl1MnZyMWoyZzl1MWE2In0.--JAm0FRN6RoZuoIHsldUA';

const MapboxMap = ({
  liveLongitude,
  liveLatittude,
  userLongitude,
  userLatitude,
  companyDetails
}) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [userLongitude, userLatitude],
      zoom: 12,
    });

    mapInstance.on('load', () => {
      // Add user marker
      new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([userLongitude, userLatitude])
        .setPopup(new mapboxgl.Popup().setText('User Location'))
        .addTo(mapInstance);

      // Add company marker
      new mapboxgl.Marker({ color: 'green' })
        .setLngLat([companyDetails.longitude, companyDetails.latitude])
        .setPopup(new mapboxgl.Popup().setText('Company Location'))
        .addTo(mapInstance);

      // Add live location marker
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([liveLongitude, liveLatittude])
        .setPopup(new mapboxgl.Popup().setText('Driver Location'))
        .addTo(mapInstance);

      const fetchRoute = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLongitude},${userLatitude};${companyDetails.longitude},${companyDetails.latitude}?access_token=${mapboxgl.accessToken}`
          );

          console.log('API Response:', response.data); // Log the entire response

          const encodedPolyline = response.data.routes[0]?.geometry;
          if (!encodedPolyline) {
            throw new Error('Invalid route data');
          }

          // Decode polyline
          const route = polyline.decode(encodedPolyline);

          // Convert to Mapbox format
          const routeCoordinates = route.map(([lat, lng]) => [lng, lat]);

          // Add route source and layer
          if (!mapInstance.getSource('route')) {
            mapInstance.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: routeCoordinates,
                },
              },
            });

            mapInstance.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#0400ff',
                'line-width': 5,
              },
            });
          } else {
            mapInstance.getSource('route').setData({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: routeCoordinates,
              },
            });
          }
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      };

      fetchRoute();
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [liveLongitude, liveLatittude, userLongitude, userLatitude, companyDetails]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
    />
  );
};

export default MapboxMap;
