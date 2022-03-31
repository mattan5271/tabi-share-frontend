import NextImage from "next/image";
import Script from "next/script";
import { NextRouter, useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, VFC } from "react";
import { FieldError, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { useHandleImage } from "hooks/useHandleImage";
import { Genre, Prefecture, TravelSpot, User } from "types";

import { DownloadIcon, PlusSquareIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Grid, GridItem, VStack, Button, IconButton, Badge, Input, Textarea, Select, FormControl, FormLabel, FormErrorMessage, Center } from "@chakra-ui/react";

type Props = {
  users: User[];
  genres: Genre[];
  prefectures: Prefecture[];
  setImages: Dispatch<SetStateAction<File[]>>;
  previewImageUrls: string[];
  setPreviewImageUrls: Dispatch<SetStateAction<string[]>>;
  handleSubmit: UseFormHandleSubmit<TravelSpot>;
  onSubmit: (inputData: TravelSpot) => void;
  register: UseFormRegister<TravelSpot>;
  errors: {
    userId?: FieldError | undefined;
    genreId?: FieldError | undefined;
    name?: FieldError | undefined;
    postcode?: FieldError | undefined;
    prefectureCode?: FieldError | undefined;
    addressCity?: FieldError | undefined;
    addressStreet?: FieldError | undefined;
    addressBuilding?: FieldError | undefined;
    introduction?: FieldError | undefined;
    access?: FieldError | undefined;
    phoneNumber?: FieldError | undefined;
    businessHour?: FieldError | undefined;
    parking?: FieldError | undefined;
    homePage?: FieldError | undefined;
  };
};

export const TravelSpotForm: VFC<Props> = (props) => {
  const router: NextRouter = useRouter();
  const { uploadImage, deleteImage } = useHandleImage();

  return (
    <Box>
      <Script src="https://ajaxzip3.github.io/ajaxzip3.js" />
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <VStack>
          <Input
            id="travel_spot_images"
            type="file"
            accept="image/*"
            multiple
            display="none"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              uploadImage({ event, isMultiple: true, setImgState: props.setImages, setPrevieImgState: props.setPreviewImageUrls });
            }}
          />
          <Button colorScheme="orange" mb={4} onClick={() => document.getElementById("travel_spot_images")?.click()}>
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

        <FormControl isInvalid={!!props.errors.name} mb={4}>
          <FormLabel>
            名称
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("name", { required: "名称を入力してください", maxLength: { value: 30, message: "30文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.postcode} mb={4}>
          <FormLabel>
            郵便番号
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input
            onKeyUp={() => AjaxZip3.zip2addr("postcode", "", "prefectureCode", "addressCity")}
            {...props.register("postcode", {
              required: "郵便番号を入力してください",
              pattern: {
                value: /^[0-9]{3}-[0-9]{4}$/,
                message: "郵便番号の形式が違います",
              },
            })}
          />
          <FormErrorMessage>{props.errors.postcode?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.prefectureCode} mb={4}>
          <FormLabel>
            都道府県
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Select {...props.register("prefectureCode", { required: "都道府県を選択してください" })}>
            <option></option>
            {props.prefectures.map((prefecture) => (
              <option key={prefecture.code} value={prefecture.code}>
                {prefecture.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{props.errors.prefectureCode?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressCity} mb={4}>
          <FormLabel>
            市区町村
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("addressCity", { required: "市区町村を入力してください", maxLength: { value: 50, message: "50文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.addressCity?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressStreet} mb={4}>
          <FormLabel>
            番地
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("addressStreet", { required: "番地を入力してください", maxLength: { value: 50, message: "50文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.addressStreet?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.addressBuilding} mb={4}>
          <FormLabel>
            建物
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Input {...props.register("addressBuilding", { maxLength: { value: 50, message: "50文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.addressBuilding?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.introduction} mb={4}>
          <FormLabel>
            紹介文
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Textarea {...props.register("introduction", { required: "紹介文を入力してください", maxLength: { value: 400, message: "400文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.introduction?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.access} mb={4}>
          <FormLabel>
            アクセス
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Textarea {...props.register("access", { required: "アクセスを入力してください", maxLength: { value: 200, message: "200文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.access?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.businessHour} mb={4}>
          <FormLabel>
            営業時間
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Textarea {...props.register("businessHour", { required: "営業時間を入力してください", maxLength: { value: 100, message: "100文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.businessHour?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.phoneNumber} mb={4}>
          <FormLabel>
            電話番号
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input
            {...props.register("phoneNumber", {
              required: "電話番号を入力してください",
              pattern: {
                value: /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/,
                message: "電話番号の形式が違います",
              },
            })}
          />
          <FormErrorMessage>{props.errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.parking} mb={4}>
          <FormLabel>
            駐車場
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Textarea {...props.register("parking", { required: "駐車場を入力してください", maxLength: { value: 300, message: "300文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.parking?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.homePage} mb={4}>
          <FormLabel>
            ホームページ
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Textarea {...props.register("homePage", { maxLength: { value: 100, message: "100文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.homePage?.message}</FormErrorMessage>
        </FormControl>

        {router.pathname.match(/admin/) && (
          <FormControl isInvalid={!!props.errors.userId} mb={4}>
            <FormLabel>
              投稿者
              <Badge colorScheme="red" ml={1}>
                必須
              </Badge>
            </FormLabel>
            <Select {...props.register("userId", { required: "投稿者を選択してください" })}>
              <option></option>
              {props.users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{props.errors.userId?.message}</FormErrorMessage>
          </FormControl>
        )}

        <FormControl isInvalid={!!props.errors.genreId} mb={4}>
          <FormLabel>
            ジャンル
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Select {...props.register("genreId", { required: "ジャンルを選択してください" })}>
            <option></option>
            {props.genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{props.errors.genreId?.message}</FormErrorMessage>
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
