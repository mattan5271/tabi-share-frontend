import { VFC } from "react";
import { ScopedMutator } from "swr/dist/types";
import ShowMoreText from "react-show-more-text";

import { UserFollowButton } from "components/users/UserFollowButton";
import { User } from "types";

import { Heading, Avatar, Box, Center, Image, Flex, Text, Stack } from "@chakra-ui/react";

type Props = {
  user: User;
  mutate: { mutate: ScopedMutator<any>; url: string };
};

export const UserCard: VFC<Props> = (props) => {
  return (
    <Center py={6}>
      <Box maxW={"270px"} w={"full"} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
        <Image
          h={"120px"}
          w={"full"}
          alt={`${props.user.name}のプロフィール画像`}
          src={"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={props.user.profileImage.url || "/no_user_profile_image.png"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"} isTruncated>
              {props.user.name}
            </Heading>
            <ShowMoreText more="全文表示" less="閉じる" width={500} anchorClass="show-more-text-anchor">
              {props.user.introduction}
            </ShowMoreText>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{props.user.followings.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                フォロー中
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{props.user.followers.length}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                フォロワー
              </Text>
            </Stack>
          </Stack>

          <Center mt={2}>
            <UserFollowButton user={props.user} mutate={props.mutate} />
          </Center>
        </Box>
      </Box>
    </Center>
  );
};
