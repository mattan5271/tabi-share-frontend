import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export const NextLink = (props) => {
  return (
    <Link href={props.href} passHref>
      <ChakraLink color={"blue.600"}>{props.children}</ChakraLink>
    </Link>
  );
};
