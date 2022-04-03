import NextImage from "next/image";
import { NextRouter, useRouter } from "next/router";
import { VFC } from "react";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import Zoom from "react-medium-image-zoom";
import { Rating } from "react-simple-star-rating";

import { userState } from "stores/userState";
import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLink } from "components/other/NextLink";
import { NextLinkButton } from "components/other/NextLinkButton";
import { Image, Review, User } from "types";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, Text, Grid, GridItem, Avatar } from "@chakra-ui/react";

type Props = {
  reviews: Review[];
  mutate?: { mutate: ScopedMutator<any>; url: string };
};

export const Reviews: VFC<Props> = (props) => {
  const BASE_URL: string = "/reviews";
  const router: NextRouter = useRouter();
  const [currentUser] = useRecoilState<User | null>(userState);
  const { handleDeleteRequest } = useHandleRequest();

  const deleteReview = (reviewId: number): void => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${reviewId}`, modelJa: "レビュー", modelEn: "review", mutate: props.mutate });
  };

  return (
    <Box>
      {props.reviews.map((review: Review) => (
        <Box maxW={"100%"} p={6} mb={3} rounded={"md"} border="1px" borderColor={"gray"} key={review.id}>
          {router.pathname.match(/users/) && (
            <NextLink href={`/travel_spots/${review.travelSpot.id}`}>
              <HStack>
                <NextImage
                  src={review.travelSpot.images[0]?.url || "/no_image.jpeg"}
                  alt={`${review.travelSpot.name}のメイン画像`}
                  width={50}
                  height={50}
                  className="active_image"
                />
                <Text fontWeight={"bold"}>{review.travelSpot.name}</Text>
              </HStack>
            </NextLink>
          )}

          {router.pathname.match(/travel_spots/) && (
            <NextLink href={`/users/${review.user.id}`}>
              <HStack>
                <Avatar src={review.user.profileImage.url || "/no_user_profile_image.png"} size="md" />
                <Text fontWeight={"bold"}>{review.user.name} さん</Text>
              </HStack>
            </NextLink>
          )}

          <HStack alignItems={"center"} mt={3}>
            <Rating size={25} initialValue={review.rating} readonly={true} />
            <Text pb={1} fontWeight={"bold"}>
              {review.rating.toFixed(1)}
            </Text>
          </HStack>

          <Text fontSize={"xl"} fontWeight={"bold"} mt={3}>
            {review.title}
          </Text>

          <Box p={4} rounded={"md"} bg={"gray.100"} mt={3}>
            <Text>{review.body}</Text>
          </Box>

          <Grid templateColumns="repeat(4, 1fr)" gap={2} mt={3}>
            {review.images.map((image: Image, index: number) => (
              <GridItem key={index}>
                <Zoom zoomMargin={30}>
                  <NextImage src={image.url} alt={`${review.title}の画像${index}`} width={100} height={100} />
                </Zoom>
              </GridItem>
            ))}
          </Grid>

          {currentUser?.id === review.user.id && (
            <HStack alignItems={"center"} mt={3}>
              <NextLinkButton href={`${BASE_URL}/${review.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
                編集
              </NextLinkButton>
              <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteReview(review.id)}>
                削除
              </NextLinkButton>
            </HStack>
          )}
        </Box>
      ))}
    </Box>
  );
};
