import NextLink from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { NextLink as NextLinkComponent } from "components/other/NextLink";
import { NextLinkButton } from "components/other/NextLinkButton";

import { User } from "types";

import { EditIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, Flex, Center, Stack, Link, Menu, MenuList, MenuItem, MenuButton, MenuDivider, Avatar } from "@chakra-ui/react";

type AdminNavList = {
  title: string;
  href: string;
};

const ADMIN_NAV_LIST: AdminNavList[] = [
  {
    title: "ユーザー一覧",
    href: "/admin/users",
  },
  {
    title: "旅行先一覧",
    href: "/admin/travel_spots",
  },
  {
    title: "ジャンル一覧",
    href: "/admin/genres",
  },
  {
    title: "レビュー一覧",
    href: "/admin/reviews",
  },
];

export const NavBar: VFC = () => {
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const router: NextRouter = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState<User | null>(userState);

  const signOut = (): void => {
    if (!confirm("ログアウトしますか？")) return;
    client
      .delete("/sign_out")
      .then(() => {
        router.push("/sign_in");
        setCurrentUser(null);
        toast.success("サインアウトに成功しました");
      })
      .catch((err) => {
        console.log(err);
        toast.error("サインアウトに失敗しました");
      });
  };

  const AuthButtons = (): JSX.Element => {
    return (
      <>
        <NextLinkButton href={"/sign_up"} colorScheme={"green"} icon={<EditIcon />}>
          新規会員登録
        </NextLinkButton>
        <NextLinkButton href={"/sign_in"} colorScheme={"pink"} icon={<UnlockIcon />}>
          ログイン
        </NextLinkButton>
      </>
    );
  };

  const AdminLinks = (): JSX.Element => {
    return (
      <>
        {ADMIN_NAV_LIST.map((navItem: AdminNavList) => (
          <NextLink href={navItem.href} passHref key={navItem.href}>
            <Link px={2} py={4} rounded={"md"} _hover={{ textDecoration: "none", bg: "blue.400" }}>
              {navItem.title}
            </Link>
          </NextLink>
        ))}
      </>
    );
  };

  useEffect(() => setLoginUser(currentUser), [currentUser]);

  return (
    <Box>
      <Flex bg={"blue.500"} color={"white"} minH={"60px"} py={{ base: 2 }} px={{ base: 4 }} align={"center"} fontWeight={"bold"}>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <NextLink href="/" passHref>
            <Link
              px={2}
              py={1}
              fontSize={30}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: "blue.400",
              }}
            >
              TaBi Share
            </Link>
          </NextLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction={"row"} spacing={4}>
              {loginUser?.isAdmin && <AdminLinks />}
            </Stack>
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          {!loginUser && <AuthButtons />}

          {loginUser && (
            <Menu>
              <MenuButton>
                <Avatar size={"sm"} src={loginUser?.profileImage?.url} />
              </MenuButton>
              <MenuList alignItems={"center"} color={"black"}>
                <br />
                <NextLinkComponent href={`/users/${loginUser.id}`}>
                  <Center>
                    <Avatar size={"2xl"} src={loginUser?.profileImage?.url} />
                  </Center>
                  <br />
                  <Center>
                    <span>{loginUser?.name}</span>
                  </Center>
                </NextLinkComponent>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => router.push(`/users/${loginUser.id}/edit`)}>プロフィール編集</MenuItem>
                <MenuItem onClick={signOut}>ログアウト</MenuItem>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
