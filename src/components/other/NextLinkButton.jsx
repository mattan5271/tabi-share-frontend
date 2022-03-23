import Link from "next/link";
import { Button } from "@chakra-ui/react";

export const NextLinkButton = (props) => {
  return (
    <Link href={props.href} passHref>
      <Button as={"a"} colorScheme={props.colorScheme} leftIcon={props.icon} onClick={props.onClick}>
        {props.children}
      </Button>
    </Link>
  );
};
