import React from "react";
import MapboxMap from "./LiveMap";
import { useGetLiveLocationQuery } from "../../../store/slices/orderApiSlice";
import { useLocation, useParams } from "react-router-dom";

const LiveTrack = () => {
  const { id } = useParams();
  const location = useLocation();
  const company = location.state?.company;

  console.log(id, "paramma", company);

  const { data, isLoading } = useGetLiveLocationQuery(id as string);

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>No live location data available</div>;

  console.log(data, "dadaddaadad");

  return (
    <div className="w-full h-screen font-bai-regular">
      <h1 className="text-2xl font-bold mb-4">Live Car Location</h1>
      <MapboxMap
        liveLongitude={data?.liveLocation.longitude}
        liveLatittude={data?.liveLocation.latitude}
        userLatitude={data?.userLocation.latitude}
        userLongitude={data?.userLocation.longitude}
        companyDetails = {company}
      />
    </div>
  );
};

export default LiveTrack;
