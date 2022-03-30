import { VFC } from "react";

import { VStack, Spinner, Text } from "@chakra-ui/react";

type Props = {
  text?: string;
};

export const LoadingSpinner: VFC<Props> = (props) => {
  return (
    <VStack h={300} justify="center">
      <Text>{props.text}</Text>
      <Spinner />
    </VStack>
  );
};
