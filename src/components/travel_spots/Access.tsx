import { VFC } from "react";

import { GoogleMap } from "components/travel_spots/GoogleMap";
import { TravelSpot } from "types";

import { Box, HStack, Heading, Text } from "@chakra-ui/react";

type Props = {
  travelSpot: TravelSpot;
};

export const Access: VFC<Props> = (props) => {
  return (
    <Box>
      <HStack mb={4}>
        <Heading size="sm">住所：</Heading>
        <Text>{props.travelSpot.fullAddress}</Text>
      </HStack>
      <HStack mb={4}>
        <Heading size="sm">アクセス：</Heading>
        <Text>{props.travelSpot.access}</Text>
      </HStack>
      <HStack mb={4}>
        <Heading size="sm">駐車場：</Heading>
        <Text>{props.travelSpot.parking}</Text>
      </HStack>
      <GoogleMap travelSpots={[props.travelSpot]} zoom={5} />
    </Box>
  );
};
