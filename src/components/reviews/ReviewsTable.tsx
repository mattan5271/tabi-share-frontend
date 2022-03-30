import NextImage from "next/image";
import { VFC } from "react";
import { ScopedMutator } from "swr/dist/types";

import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLink } from "components/other/NextLink";
import { NextLinkButton } from "components/other/NextLinkButton";
import { Review } from "types";

import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

type Props = {
  reviews: Review[];
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const ReviewsTable: VFC<Props> = (props) => {
  const BASE_URL: string = "/admin/reviews";
  const { handleDeleteRequest } = useHandleRequest();

  const deleteReview = (reviewId: number): void => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${reviewId}`, modelJa: "レビュー", modelEn: "review", mutate: props.mutate });
  };

  return (
    <Box>
      <NextLinkButton href={`${BASE_URL}/new`} colorScheme={"blue"} icon={<AddIcon />}>
        レビュー新規作成
      </NextLinkButton>

      <Table variant="simple" mt={10}>
        <TableCaption>レビュー一覧</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>メイン画像</Th>
            <Th>タイトル</Th>
            <Th>投稿者</Th>
            <Th>旅行先</Th>
            <Th>評価</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.reviews.map((review: Review) => (
            <Tr key={review.id}>
              <Td>{review.id}</Td>
              <Td>
                <NextImage src={!review.images.length ? "/no_image.jpeg" : review.images[0].url} alt={`${review.title}のメイン画像`} width={100} height={100} />
              </Td>
              <Td>{review.title}</Td>
              <Td>
                <NextLink href={`/admin/users/${review.user.id}/edit`}>{review.user.name}</NextLink>
              </Td>
              <Td>
                <NextLink href={`/admin/travel_spots/${review.travelSpot.id}/edit`}>{review.travelSpot.name}</NextLink>
              </Td>
              <Td>{review.rating.toFixed(1)}</Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${review.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
                  編集
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteReview(review.id)}>
                  削除
                </NextLinkButton>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
