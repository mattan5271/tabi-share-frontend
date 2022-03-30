import Link from "next/link";
import { ReactNode, VFC } from "react";

import { Link as ChakraLink } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  href: string;
};

export const NextLink: VFC<Props> = (props) => {
  return (
    <Link href={props.href} passHref>
      <ChakraLink color={"blue.600"}>{props.children}</ChakraLink>
    </Link>
  );
};
