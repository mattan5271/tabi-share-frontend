import { useEffect, useState } from "react";
import { GoogleMap as Map, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import { NextLink } from "components/other/NextLink";
import { LoadingSpinner } from "components/other/LoadingSpinner";

import { Box, Text } from "@chakra-ui/react";

export const GoogleMap = (props) => {
  const [mapSize, setMapSize] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (err) => console.log(err)
    );
  }, []);

  if (!currentLocation.lat || !currentLocation.lng) return <LoadingSpinner text={"現在地取得中..."} />;

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} onLoad={() => setMapSize(new window.google.maps.Size(0, -45))}>
      <Map mapContainerStyle={{ width: "100%", height: "50vh", marginBottom: "30px" }} center={currentLocation} zoom={props.zoom}>
        {props.travelSpots.map((travelSpot) => (
          <Box key={travelSpot.id}>
            <Marker position={{ lat: travelSpot.latitude, lng: travelSpot.longitude }} />
            <InfoWindow position={{ lat: travelSpot.latitude, lng: travelSpot.longitude }} options={{ pixelOffset: mapSize }}>
              <NextLink href={`/travel_spots/${travelSpot.id}`}>{travelSpot.name}</NextLink>
            </InfoWindow>
          </Box>
        ))}
        <InfoWindow position={currentLocation} options={{ pixelOffset: mapSize }}>
          <Text>現在地</Text>
        </InfoWindow>
        <Marker position={currentLocation}></Marker>
      </Map>
    </LoadScript>
  );
};
