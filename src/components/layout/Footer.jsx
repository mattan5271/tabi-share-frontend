import NextImage from "next/image";

import { NextLink } from "components/other/NextLink";

import { FaTwitter, FaGithub } from "react-icons/fa";
import { Box, chakra, Container, Stack, VStack, Text, VisuallyHidden } from "@chakra-ui/react";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg="blackAlpha.100"
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "blackAlpha.200",
      }}
      target="_blank"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer = () => {
  return (
    <Box bg="gray.300" color="white.700">
      <Container as={Stack} maxW={"6xl"} py={4} spacing={4} justify={"center"} align={"center"}>
        <NextImage src="/logo.png" alt="ロゴ" width={180} height={70} />
        <VStack>
          <NextLink href={"/"}>ホーム</NextLink>
          <NextLink href={"/travel_spots/new"}>旅行先作成</NextLink>
        </VStack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor="gray.200">
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© Tabi Share Inc. All rights reserved</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href="https://twitter.com/mattan5271">
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"Github"} href="https://github.com/mattan5271">
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
