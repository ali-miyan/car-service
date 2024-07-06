import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
import { useLocation } from "../../context/MapContext";

const MAPBOX_TOKEN = "pk.eyJ1IjoiYWxpbWl5biIsImEiOiJjbHk2d2Y4MGowZGl1MnZyMWoyZzl1MWE2In0.--JAm0FRN6RoZuoIHsldUA";

const MapComponent : React.FC<{mapChanged:(data:boolean)=>void}>=  ({mapChanged}) => {
  const { latitude, longitude, address, setLatitude, setLongitude, setAddress } = useLocation();

  const handleDragEnd = async(event: { lngLat: any }) => {
      const { lngLat } = event;

      console.log(lngLat);
      

    setLatitude(lngLat['lat']);
    setLongitude(lngLat['lng']);

    try {
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat['lng']},${lngLat['lat']}.json?access_token=${MAPBOX_TOKEN}`);
        if (!response.ok) {
          throw new Error("Reverse geocoding request failed.");
        }
        const data = await response.json();
        console.log("Reverse geocoding result:", data);
  
        const formattedAddress = data.features[0].place_name;
        console.log("Formatted Address:", formattedAddress.split(','));
        setAddress(formattedAddress.split(','));
  
        mapChanged(true)
  
      } catch (error) {
        console.error("Error fetching reverse geocoding data:", error);
      }


  };

  const onLocate = async (event: any) => {
    console.log(event, "brooooese");

    const { coords } = event;
    console.log("User located at:", coords.latitude, coords.longitude);

    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${MAPBOX_TOKEN}`);
      if (!response.ok) {
        throw new Error("Reverse geocoding request failed.");
      }
      const data = await response.json();
      console.log("Reverse geocoding result:", data);

      const formattedAddress = data.features[0].place_name;
      console.log("Formatted Address:", formattedAddress.split(','));
      setAddress(formattedAddress.split(','));

      
    } catch (error) {
      console.error("Error fetching reverse geocoding data:", error);
    }
    
    setLatitude(coords.latitude);
    setLongitude(coords.longitude);
    mapChanged(true)
  };

  return (
    <ReactMapGL
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 8,
      }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
      style={{ width: '350px', height: '400px', marginLeft: '20px', marginRight: '20px', border: "3px solid #d8d8d8", borderRadius: '10px' }}
    >
      <Marker
        latitude={latitude}
        longitude={longitude}
        draggable
        onDragEnd={handleDragEnd}
      />
      <NavigationControl position="bottom-left" />
      <GeolocateControl
        position="top-left"
        trackUserLocation
        onGeolocate={onLocate}
      />
      <Geocoder />
      <div style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'white', padding: '5px', borderRadius: '5px' }}>
        <p>Address: {address}</p>
      </div>
    </ReactMapGL>
  );
}


export default MapComponent;
