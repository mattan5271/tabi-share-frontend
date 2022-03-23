import { NextLink } from "components/other/NextLink";

import { DrawerBody, DrawerHeader, DrawerContent, DrawerCloseButton, Table, Tr, Th, Td } from "@chakra-ui/react";

export const TravelSpotDetail = (props) => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>旅行先詳細</DrawerHeader>

      <DrawerBody>
        <Table variant={"unstyled"}>
          <Tr>
            <Th>名称</Th>
            <Td>{props.travelSpot.name}</Td>
          </Tr>
          <Tr>
            <Th>住所</Th>
            <Td>{props.travelSpot.fullAddress}</Td>
          </Tr>
          <Tr>
            <Th>電話番号</Th>
            <Td>{props.travelSpot.phoneNumber}</Td>
          </Tr>
          <Tr>
            <Th>営業時間</Th>
            <Td>{props.travelSpot.businessHour}</Td>
          </Tr>
          <Tr>
            <Th>駐車場</Th>
            <Td>{props.travelSpot.parking}</Td>
          </Tr>
          <Tr>
            <Th>ホームページ</Th>
            <Td>{props.travelSpot.homePage}</Td>
          </Tr>
          <Tr>
            <Th>ジャンル</Th>
            <Td>{props.travelSpot.genre.name}</Td>
          </Tr>
          <Tr>
            <Th>投稿者</Th>
            <Td>
              <NextLink href={`/users/${props.travelSpot.user.id}`}>{props.travelSpot.user.name}</NextLink>
            </Td>
          </Tr>
        </Table>
      </DrawerBody>
    </DrawerContent>
  );
};
