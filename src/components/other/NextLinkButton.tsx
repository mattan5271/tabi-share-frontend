import Link from "next/link";
import { ReactElement, ReactNode, VFC } from "react";

import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  href: string;
  colorScheme: string;
  icon: ReactElement;
  onClick?: () => void;
};

export const NextLinkButton: VFC<Props> = (props) => {
  return (
    <Link href={props.href} passHref>
      <Button as={"a"} colorScheme={props.colorScheme} leftIcon={props.icon} onClick={props.onClick}>
        {props.children}
      </Button>
    </Link>
  );
};
