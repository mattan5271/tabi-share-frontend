import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useState } from "react";

import { useGetRequest } from "hooks/useGetRequest";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotCard } from "components/travel_spots/TravelSpotCard";
import { TravelSpot } from "types";

import { ViewIcon } from "@chakra-ui/icons";
import { Box, SimpleGrid, Select, Center, Button } from "@chakra-ui/react";

const TravelSpots: NextPage = () => {
  const BASE_URL: string = "/travel_spots";
  const router: NextRouter = useRouter();
  const query: string = new URLSearchParams(router.query).toString();
  const [sortValue, setSortValue] = useState<string>("recommend");
  const [loadIndex, setLoadIndex] = useState<number>(20);
  const apiUrl: string = `${BASE_URL}/?${query}&sort=${sortValue}`;

  const { data: travelSpots, error, isLoading, mutate } = useGetRequest(apiUrl);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;
  if (!travelSpots.length) return <Center>検索条件に一致する旅行先が存在しません</Center>;

  return (
    <Box>
      <Center mb={10}>
        <Select width="40%" defaultValue={sortValue} onChange={(event) => setSortValue(event.target.value)}>
          <option value="recommend">おすすめ順</option>
          <option value="new">新着順</option>
          <option value="review">レビュー数順</option>
          <option value="favorite">行きたい！数順</option>
        </Select>
      </Center>

      <SimpleGrid columns={4} spacing={5} mb={10}>
        {travelSpots.slice(0, loadIndex).map((travelSpot: TravelSpot) => (
          <TravelSpotCard travelSpot={travelSpot} mutate={{ mutate, url: apiUrl }} key={travelSpot.id} />
        ))}
      </SimpleGrid>

      <Center>
        <Button leftIcon={<ViewIcon />} colorScheme="teal" variant="outline" onClick={() => setLoadIndex(loadIndex + 20)} isDisabled={loadIndex >= travelSpots.length}>
          もっと見る
        </Button>
      </Center>
    </Box>
  );
};

export default TravelSpots;
