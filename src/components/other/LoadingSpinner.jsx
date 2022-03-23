import { VStack, Spinner, Text } from "@chakra-ui/react";

export const LoadingSpinner = (props) => {
  return (
    <VStack h={300} justify="center">
      <Text>{props.text}</Text>
      <Spinner />
    </VStack>
  );
};
