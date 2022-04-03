import NextImage from "next/image";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, VFC } from "react";
import { Rating } from "react-simple-star-rating";
import { FieldError, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { useHandleImage } from "hooks/useHandleImage";
import { Review, TravelSpot, User } from "types";

import { DownloadIcon, PlusSquareIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, VStack, Button, IconButton, Badge, Input, Textarea, Select, FormControl, FormLabel, FormErrorMessage, Text } from "@chakra-ui/react";

type Props = {
  users?: User[];
  travelSpots?: TravelSpot[];
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  setImages: Dispatch<SetStateAction<File[]>>;
  previewImageUrls: string[];
  setPreviewImageUrls: Dispatch<SetStateAction<string[]>>;
  handleSubmit: UseFormHandleSubmit<Review>;
  onSubmit: (inputData: Review) => void;
  register: UseFormRegister<Review>;
  errors: {
    userId?: FieldError | undefined;
    travelSpotId?: FieldError | undefined;
    title?: FieldError | undefined;
    body?: FieldError | undefined;
  };
};

export const ReviewForm: VFC<Props> = (props) => {
  const router: NextRouter = useRouter();
  const { uploadImage, deleteImage } = useHandleImage();

  const ratingChanged = (rating: number): void => props.setRating(rating / 20); // 0~100で返ってくるので、5段階評価にするために20で割る

  return (
    <Box>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <VStack>
          <Input
            id="review_images"
            type="file"
            accept="image/*"
            multiple
            display="none"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              uploadImage({ event, isMultiple: true, setImgState: props.setImages, setPrevieImgState: props.setPreviewImageUrls });
            }}
          />
          <Button colorScheme="orange" mb={4} onClick={() => document.getElementById("review_images")?.click()}>
            <PlusSquareIcon mr={1} />
            画像アップロード
          </Button>
        </VStack>
        <Grid my={4} templateColumns="repeat(4, 1fr)" gap={3}>
          {props.previewImageUrls.map((url: string, index: number) => (
            <GridItem key={index}>
              <NextImage src={url} alt={`プレビュー画像${index}`} width={300} height={300} />
              <IconButton
                aria-label="delete_image"
                icon={<CloseIcon />}
                onClick={() => {
                  deleteImage({ deleteImageUrl: url, setPrevieImgState: props.setPreviewImageUrls });
                }}
              />
            </GridItem>
          ))}
        </Grid>

        <FormControl isInvalid={!!props.errors.title} mb={4}>
          <FormLabel>
            タイトル
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("title", { required: "タイトルを入力してください", maxLength: { value: 30, message: "30文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.body} mb={4}>
          <FormLabel>
            本文
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Textarea {...props.register("body", { required: "本文を入力してください", maxLength: { value: 200, message: "200文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.body?.message}</FormErrorMessage>
        </FormControl>

        {router.pathname.match(/admin/) && (
          <Box>
            <FormControl isInvalid={!!props.errors.userId} mb={4}>
              <FormLabel>
                投稿者
                <Badge colorScheme="red" ml={1}>
                  必須
                </Badge>
              </FormLabel>
              <Select {...props.register("userId", { required: "投稿者を選択してください" })}>
                <option></option>
                {props.users?.map((user: User) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{props.errors.userId?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!props.errors.travelSpotId} mb={4}>
              <FormLabel>
                旅行先
                <Badge colorScheme="red" ml={1}>
                  必須
                </Badge>
              </FormLabel>
              <Select {...props.register("travelSpotId", { required: "旅行先を選択してください" })}>
                <option></option>
                {props.travelSpots?.map((travelSpot: TravelSpot) => (
                  <option key={travelSpot.id} value={travelSpot.id}>
                    {travelSpot.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{props.errors.travelSpotId?.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}

        <VStack>
          <Text fontSize="xl" fontWeight={"bold"}>
            評価
          </Text>
          <Rating size={50} initialValue={props.rating} allowHalfIcon={true} onClick={ratingChanged} />
        </VStack>

        <VStack>
          <Button type="submit" colorScheme="teal" leftIcon={<DownloadIcon />} my={4}>
            保存
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
