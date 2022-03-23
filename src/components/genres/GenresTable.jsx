import NextImage from "next/image";

import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLinkButton } from "components/other/NextLinkButton";

import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

export const GenresTable = (props) => {
  const BASE_URL = "/admin/genres";
  const { handleDeleteRequest } = useHandleRequest();

  const deleteGenre = (genreId) => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${genreId}`, modelJa: "ジャンル", modelEn: "genre", mutate: props.mutate });
  };

  return (
    <Box>
      <NextLinkButton href={`${BASE_URL}/new`} colorScheme={"blue"} icon={<AddIcon />}>
        ジャンル新規作成
      </NextLinkButton>

      <Table variant="simple" mt={10}>
        <TableCaption>ジャンル一覧</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>画像</Th>
            <Th>ジャンル名</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.genres.map((genre) => (
            <Tr key={genre.id}>
              <Td>{genre.id}</Td>
              <Td>
                <NextImage src={genre.image.url || "/no_image.jpeg"} alt={`${genre.name}の画像`} width={100} height={100} />
              </Td>
              <Td>{genre.name}</Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${genre.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
                  編集
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteGenre(genre.id)}>
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
