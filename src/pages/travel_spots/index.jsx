import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";

import { useGetRequest } from "hooks/useGetRequest";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotCard } from "components/travel_spots/TravelSpotCard";

import { ViewIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, Select, Center, Button } from "@chakra-ui/react";

const TravelSpots = () => {
  const BASE_URL = "/travel_spots";
  const router = useRouter();
  const query = new URLSearchParams(router.query).toString();
  const [sortValue, setSortValue] = useState("recommend");
  const [loadIndex, setLoadIndex] = useState(20);
  const apiUrl = `${BASE_URL}/?${query}&sort=${sortValue}`;

  const { data: travelSpots, error, isLoading, isError, mutate } = useGetRequest(apiUrl);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;
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

      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4} mb={10}>
        {travelSpots.slice(0, loadIndex).map((travelSpot) => (
          <GridItem key={travelSpot.id}>
            <TravelSpotCard travelSpot={travelSpot} mutate={{ mutate, url: apiUrl }} />
          </GridItem>
        ))}
      </Grid>

      <Center>
        <Button leftIcon={<ViewIcon />} colorScheme="teal" variant="outline" onClick={() => setLoadIndex(loadIndex + 20)} isDisabled={loadIndex >= travelSpots.length}>
          もっと見る
        </Button>
      </Center>
    </Box>
  );
};

export default TravelSpots;
