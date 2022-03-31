import { useEffect, useState, VFC } from "react";
import { GoogleMap as Map, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import { NextLink } from "components/other/NextLink";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpot } from "types";

import { Box, Text } from "@chakra-ui/react";

type Props = {
  travelSpots: TravelSpot[];
  zoom: number;
};

export const GoogleMap: VFC<Props> = (props) => {
  const [mapSize, setMapSize] = useState<google.maps.Size | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

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
    <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`} onLoad={() => setMapSize(new window.google.maps.Size(0, -45))}>
      <Map mapContainerStyle={{ width: "100%", height: "50vh" }} center={currentLocation} zoom={props.zoom}>
        {props.travelSpots.map((travelSpot: TravelSpot) => (
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
