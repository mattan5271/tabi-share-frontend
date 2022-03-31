import NextImage from "next/image";
import { VFC } from "react";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import { Rating } from "react-simple-star-rating";

import { userState } from "stores/userState";
import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLink } from "components/other/NextLink";
import { NextLinkButton } from "components/other/NextLinkButton";
import { TravelSpotFavoriteButton } from "components/travel_spots/TravelSpotFavoriteButton";
import { TravelSpot, User } from "types";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, Box, Text, Badge, HStack, Avatar } from "@chakra-ui/react";

type Props = {
  travelSpot: TravelSpot;
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const TravelSpotCard: VFC<Props> = (props) => {
  const BASE_URL: string = "/travel_spots";
  const [currentUser] = useRecoilState<User | null>(userState);
  const { handleDeleteRequest } = useHandleRequest();

  const deleteTravelSpot = (travelSpotId: number): void => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${travelSpotId}`, modelJa: "旅行先", modelEn: "travel_spot", mutate: props.mutate });
  };

  return (
    <Box bg={"white"} maxW="sm" borderWidth="1px" rounded="lg" shadow="lg" position="relative" key={props.travelSpot.id}>
      <NextLink href={`${BASE_URL}/${props.travelSpot.id}`}>
        <NextImage src={props.travelSpot.images[0]?.url || "/no_image.jpeg"} alt={`${props.travelSpot.name}のメイン画像`} width={500} height={500} className="active_image" />
      </NextLink>

      <Box p={4}>
        {props.travelSpot.isNew && (
          <Badge rounded="full" px={2} py={1} ml={1} mb={1} colorScheme="red">
            New
          </Badge>
        )}

        <Flex justifyContent="space-between" alignItems="center">
          <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated alignItems="center">
            <NextLink href={`${BASE_URL}/${props.travelSpot.id}`}>{props.travelSpot.name}</NextLink>
          </Box>

          <Box ml={2}>
            <TravelSpotFavoriteButton travelSpot={props.travelSpot} mutate={props.mutate} />
          </Box>
        </Flex>

        <Flex mt={3} justifyContent="space-between" alignItems="center">
          <NextLink href={`/travel_spots/${props.travelSpot.id}`}>
            <HStack>
              <Rating size={25} initialValue={props.travelSpot.rating} readonly={true} />
              <Text fontSize={"sm"}>{props.travelSpot.reviews.length}レビュー</Text>
            </HStack>
          </NextLink>

          <NextLink href={`/users/${props.travelSpot.user.id}`}>
            <Avatar src={props.travelSpot.user.profileImage.url || "/no_user_profile_image.png"} size="md" />
          </NextLink>
        </Flex>
        {currentUser?.id === props.travelSpot.user.id && (
          <HStack alignItems={"center"} mt={3}>
            <NextLinkButton href={`/travel_spots/${props.travelSpot.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
              編集
            </NextLinkButton>
            <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteTravelSpot(props.travelSpot.id)}>
              削除
            </NextLinkButton>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
