import Error from "next/error";
import { useRouter } from "next/router";
import Zoom from "react-medium-image-zoom";
import ShowMoreText from "react-show-more-text";

import { useGetRequest } from "hooks/useGetRequest";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotCard } from "components/travel_spots/TravelSpotCard";
import { Reviews } from "components/reviews/Reviews";
import { UserCard } from "components/users/UserCard";
import { UserFollowButton } from "components/users/UserFollowButton";

import { Box, Container, Grid, GridItem, Text, Tabs, TabList, Tab, TabPanels, TabPanel, VStack, Button, Avatar } from "@chakra-ui/react";

const TABS = ["投稿", "行きたい！", "レビュー", "フォロー中", "フォロワー"];

const TravelSpots = () => {
  const BASE_URL = "/users";
  const router = useRouter();
  const userId = router.query.userId;
  const apiUrl = `${BASE_URL}/${userId}`;

  const { data: user, error, isLoading, isError, mutate } = useGetRequest(apiUrl);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return (
    <Box>
      <VStack mb={10}>
        <Zoom zoomMargin={30}>
          <Avatar src={user.profileImage.url || "/no_user_profile_image.png"} alt={"プロフィール画像"} size="2xl" />
        </Zoom>

        <Text fontWeight={"bold"}>
          {user.name}（{user.age}歳/{user.sex}）
        </Text>

        <ShowMoreText more="全文表示" less="閉じる" width={1000} anchorClass="show-more-text-anchor">
          {user.introduction}
        </ShowMoreText>

        <UserFollowButton user={user} mutate={{ mutate, url: apiUrl }} />
      </VStack>

      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {TABS.map((tab) => (
            <Tab key={tab}>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
              {user.travelSpots.map((travelSpot) => (
                <GridItem key={travelSpot.id}>
                  <TravelSpotCard travelSpot={travelSpot} mutate={{ mutate, url: apiUrl }} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
              {user.favoritedTravelSpots.map((travelSpot) => (
                <GridItem key={travelSpot.id}>
                  <TravelSpotCard travelSpot={travelSpot} mutate={{ mutate, url: apiUrl }} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Container maxW="container.md">
              <Reviews reviews={user.reviews} />
            </Container>
          </TabPanel>
          <TabPanel>
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
              {user.followings.map((user) => (
                <GridItem key={user.id}>
                  <UserCard user={user} mutate={{ mutate, url: apiUrl }} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(4, 1fr)" gap={4}>
              {user.followers.map((user) => (
                <GridItem key={user.id}>
                  <UserCard user={user} mutate={{ mutate, url: apiUrl }} />
                </GridItem>
              ))}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default TravelSpots;
