import { useRecoilState } from "recoil";

import { client } from "libs/client";
import { userState } from "stores/userState";

import { BsStar, BsStarFill } from "react-icons/bs";
import { Text, Button } from "@chakra-ui/react";

export const TravelSpotFavoriteButton = (props) => {
  const [currentUser] = useRecoilState(userState);

  const isFavorite = (travelSpot) => {
    return travelSpot.favorites.map((fav) => fav.userId).includes(currentUser.id);
  };

  const clickFavoriteButton = (travelSpot) => {
    const apiUrl = isFavorite(travelSpot) ? `/travel_spots/${travelSpot.id}/unfavorite` : `/travel_spots/${travelSpot.id}/favorite`;
    client
      .post(apiUrl)
      .then(() => {
        props.mutate.mutate(props.mutate.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button variant="outline" onClick={() => clickFavoriteButton(props.travelSpot)}>
      {isFavorite(props.travelSpot) ? <BsStarFill color="#FFCC33" /> : <BsStar />}
      <Text ml={1}>{props.travelSpot.favorites.length}</Text>
    </Button>
  );
};
