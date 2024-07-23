import React from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "../../../context/MapContext";
import Geocoder from "../../company/Geocoder";
import { useGetCompaniesQuery } from "../../../store/slices/companyApiSlice";
import { Link } from "react-router-dom";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWxpbWl5biIsImEiOiJjbHk2d2Y4MGowZGl1MnZyMWoyZzl1MWE2In0.--JAm0FRN6RoZuoIHsldUA";

const ServiceMap: React.FC = () => {
  const { latitude, longitude, address, setLatitude, setLongitude } =
    useLocation();
  const { data: posts } = useGetCompaniesQuery({});

  console.log(posts);

  const onLocate = async (event: any) => {
    const { coords } = event;
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${MAPBOX_TOKEN}`
      );
      if (!response.ok) {
        throw new Error("Reverse geocoding request failed.");
      }
      const data = await response.json();
      console.log("Reverse geocoding result:", data);

      const formattedAddress = data.features[0].place_name;
      console.log("Formatted Address:", formattedAddress.split(","));

      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
  };

  return (
    <>
      <ReactMapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
          width: "100%",
          height: "100%",
          margin: "0 auto",
          border: "3px solid #d8d8d8",
        }}
      >
        <NavigationControl position="bottom-left" />
        <GeolocateControl
          position="bottom-right"
          trackUserLocation
          onGeolocate={onLocate}
        />
        <Geocoder />
        {posts &&
          posts.map((center: any) => (
            <Marker
              key={center._id}
              latitude={center.address.latitude}
              longitude={center.address.longitude}
              anchor="bottom"
            >
              <div className="flex flex-col items-center bg-white rounded">
                <img
                  src={center.logo}
                  alt="Car Service Center"
                  className="w-8 h-8"
                />
                <div className="text-black text-sm font-bold mt-1 text-center">
                  {center.companyName}
                </div>
              </div>
            </Marker>
          ))}
        <div
          style={{
            position: "absolute",
            bottom: 1,
            left: 10,
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <p>Address: {address}</p>
        </div>
      </ReactMapGL>
      <div
        className="absolute font-bai-regular top-11  sm:top-16 sm:left-24 w-72 h-56 bg-white border border-gray-300 rounded shadow-lg overflow-y-auto p-2"
        style={{
          maxHeight: "200px",
        }}
      >
        <h3 className="font-bold text-center underline underline-offset-4 uppercase mb-4">Service Centers</h3>
        {posts ? (
          posts.map((center: any) => (
            <div key={center._id} className="mb-2 p-2 cursor-pointer hover:bg-red-50">
              <Link to={'/services'}><div className="flex items-center">
                <img
                  src={center.logo}
                  alt="Car Service Center"
                  className="w-9 h-9 mr-2"
                />
                <div className="text-sm">
                  <div className="font-bold">{center.companyName}</div>
                  <div className="text-gray-600">{center.address.address}</div>
                </div>
              </div>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default ServiceMap;
