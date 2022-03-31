import NextImage from "next/image";
import { VFC } from "react";
import { ScopedMutator } from "swr/dist/types";

import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLink } from "components/other/NextLink";
import { NextLinkButton } from "components/other/NextLinkButton";
import { TravelSpot } from "types";

import { AddIcon, EditIcon, DeleteIcon, ChatIcon } from "@chakra-ui/icons";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

type Props = {
  travelSpots: TravelSpot[];
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const TravelSpotsTable: VFC<Props> = (props) => {
  const BASE_URL: string = "/admin/travel_spots";
  const { handleDeleteRequest } = useHandleRequest();

  const deleteTravelSpot = (travelSpotId: number): void => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${travelSpotId}`, modelJa: "旅行先", modelEn: "travel_spot", mutate: props.mutate });
  };

  return (
    <Box>
      <NextLinkButton href={`${BASE_URL}/new`} colorScheme={"blue"} icon={<AddIcon />}>
        旅行先新規作成
      </NextLinkButton>

      <Table variant="simple" mt={10}>
        <TableCaption>旅行先一覧</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>メイン画像</Th>
            <Th>名称</Th>
            <Th>投稿者</Th>
            <Th>ジャンル</Th>
            <Th>評価</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.travelSpots.map((travelSpot: TravelSpot) => (
            <Tr key={travelSpot.id}>
              <Td>{travelSpot.id}</Td>
              <Td>
                <NextImage src={travelSpot.images.length ? travelSpot.images[0].url : "/no_image.jpeg"} alt={`${travelSpot.name}のメイン画像`} width={100} height={100} />
              </Td>
              <Td>{travelSpot.name}</Td>
              <Td>
                <NextLink href={`/admin/users/${travelSpot.user.id}/edit`}>{travelSpot.user.name}</NextLink>
              </Td>
              <Td>
                <NextLink href={`/admin/genres/${travelSpot.genre.id}/edit`}>{travelSpot.genre.name}</NextLink>
              </Td>
              <Td>{travelSpot.rating.toFixed(1)}</Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${travelSpot.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
                  編集
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteTravelSpot(travelSpot.id)}>
                  削除
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${travelSpot.id}/reviews`} colorScheme={"teal"} icon={<ChatIcon />}>
                  レビュー一覧
                </NextLinkButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
