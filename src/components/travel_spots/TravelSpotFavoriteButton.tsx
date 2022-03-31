import { VFC } from "react";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import { AxiosError, AxiosResponse } from "axios";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { Favorite, TravelSpot, User } from "types";

import { BsStar, BsStarFill } from "react-icons/bs";
import { Text, Button } from "@chakra-ui/react";

type Props = {
  travelSpot: TravelSpot;
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const TravelSpotFavoriteButton: VFC<Props> = (props) => {
  const [currentUser] = useRecoilState<User | null>(userState);

  const isFavorite = (travelSpot: TravelSpot) => {
    if (!currentUser) return false;
    return travelSpot.favorites.map((fav: Favorite) => fav.userId).includes(currentUser.id);
  };

  const clickFavoriteButton = (travelSpot: TravelSpot) => {
    const apiUrl: string = isFavorite(travelSpot) ? `/travel_spots/${travelSpot.id}/unfavorite` : `/travel_spots/${travelSpot.id}/favorite`;
    client
      .post(apiUrl)
      .then((res: AxiosResponse) => {
        props.mutate.mutate(props.mutate.url);
      })
      .catch((err: AxiosError<{ error: string }>) => {
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
