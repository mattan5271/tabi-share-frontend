import NextLink from "next/link";
import NextImage from "next/image";

import { useHandleRequest } from "hooks/useHandleRequest";
import { NextLinkButton } from "components/other/NextLinkButton";

import { AddIcon, EditIcon, DeleteIcon, ChatIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react";

export const UsersTable = (props) => {
  const BASE_URL = "/admin/users";
  const { handleDeleteRequest } = useHandleRequest();

  const deleteUser = (userId) => {
    if (!confirm("本当に削除しますか？")) return;
    handleDeleteRequest({ apiUrl: `${BASE_URL}/${userId}`, modelJa: "ユーザー", modelEn: "user", mutate: props.mutate });
  };

  return (
    <Box>
      <NextLinkButton href={`${BASE_URL}/new`} colorScheme={"blue"} icon={<AddIcon />}>
        ユーザー新規作成
      </NextLinkButton>

      <Table variant="simple" mt={10}>
        <TableCaption>ユーザー一覧</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>プロフィール画像</Th>
            <Th>氏名</Th>
            <Th>メールアドレス</Th>
            <Th>年齢</Th>
            <Th>性別</Th>
            <Th>管理者権限</Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>
                <NextImage src={user.profileImage.url || "/no_image.jpeg"} alt={`${user.name}のプロフィール画像`} width={100} height={100} />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.age}</Td>
              <Td>{user.sex}</Td>
              <Td>{user.isAdmin && "✔"}</Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${user.id}/edit`} colorScheme={"green"} icon={<EditIcon />}>
                  編集
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={""} colorScheme={"red"} icon={<DeleteIcon />} onClick={() => deleteUser(user.id)}>
                  削除
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${user.id}/travel_spots`} colorScheme={"teal"} icon={<LinkIcon />}>
                  旅行先一覧
                </NextLinkButton>
              </Td>
              <Td>
                <NextLinkButton href={`${BASE_URL}/${user.id}/reviews`} colorScheme={"teal"} icon={<ChatIcon />}>
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
