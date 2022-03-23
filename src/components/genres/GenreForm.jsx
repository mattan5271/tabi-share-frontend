import { useHandleImage } from "hooks/useHandleImage";

import { DownloadIcon } from "@chakra-ui/icons";
import { Box, VStack, Button, Input, FormControl, FormLabel, FormErrorMessage, Center, Badge, Avatar } from "@chakra-ui/react";

export const GenreForm = (props) => {
  const { uploadImage } = useHandleImage();

  return (
    <Box>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <VStack>
          <Input
            id="genre_image"
            type="file"
            accept="image/*"
            display="none"
            onChange={(event) => {
              uploadImage({ event, isMultiple: false, setImgState: props.setImage, setPrevieImgState: props.setPreviewImageUrl });
            }}
          />
          <Avatar src={props.previewImageUrl || "/no_image.jpeg"} alt="画像" size="2xl" onClick={() => document.getElementById("genre_image").click()} />
        </VStack>

        <FormControl isInvalid={!!props.errors.name} mb={4}>
          <FormLabel>
            ジャンル名
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("name", { required: "ジャンル名を入力してください", maxLength: { value: 20, message: "20文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.name?.message}</FormErrorMessage>
        </FormControl>

        <Center>
          <Button type="submit" colorScheme="teal" leftIcon={<DownloadIcon />} my={4}>
            保存
          </Button>
        </Center>
      </form>
    </Box>
  );
};
