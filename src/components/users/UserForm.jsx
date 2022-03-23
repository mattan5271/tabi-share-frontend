import NextImage from "next/image";
import { useRecoilState } from "recoil";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useHandleImage } from "hooks/useHandleImage";
import { userState } from "stores/userState";

import { DownloadIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, VStack, Button, Badge, Input, Select, FormControl, FormLabel, FormErrorMessage, Checkbox, Textarea, Avatar } from "@chakra-ui/react";

export const UserForm = (props) => {
  const [currentUser] = useRecoilState(userState);
  const { handleDeleteRequest } = useHandleRequest();
  const { uploadImage } = useHandleImage();

  const deleteUser = (userId) => {
    if (!confirm("本当に退会しますか？")) return;
    handleDeleteRequest({ apiUrl: `/users/${userId}`, modelJa: "ユーザー", modelEn: "user", mutate: props.mutate });
  };

  return (
    <Box>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <VStack>
          <Input
            id="user_profile_image"
            type="file"
            accept="image/*"
            display="none"
            onChange={(event) => {
              uploadImage({ event, isMultiple: false, setImgState: props.setProfileImage, setPrevieImgState: props.setPreviewImageUrl });
            }}
          />
          <Avatar
            src={props.previewImageUrl || "/no_user_profile_image.png"}
            alt={"プロフィール画像"}
            size="3xl"
            onClick={() => document.getElementById("user_profile_image").click()}
          />
        </VStack>

        <FormControl isInvalid={!!props.errors.email} mb={4}>
          <FormLabel>
            メールアドレス
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("email", { required: "メールアドレスを入力してください", pattern: { value: /\S+@\S+/, message: "メールアドレスの形式が違います" } })} />
          <FormErrorMessage>{props.errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.password} mb={4}>
          <FormLabel>
            パスワード
            <Badge colorScheme="red" ml={1}>
              必須
            </Badge>
          </FormLabel>
          <Input {...props.register("password", { required: "パスワードを入力してください", minLength: { value: 8, message: "8文字以上にしてください" } })} />
          <FormErrorMessage>{props.errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.name} mb={4}>
          <FormLabel>
            氏名
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Input {...props.register("name", { maxLength: { value: 20, message: "20文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.sex} mb={4}>
          <FormLabel>
            性別
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Select {...props.register("sex")}>
            <option></option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
          </Select>
          <FormErrorMessage>{props.errors.sex?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.age} mb={4}>
          <FormLabel>
            年齢
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Input type="number" {...props.register("age", { min: { value: 0, message: "0以上にしてください" }, max: { value: 150, message: "150以下にしてください" } })} />
          <FormErrorMessage>{props.errors.age?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!props.errors.introduction} mb={4}>
          <FormLabel>
            自己紹介文
            <Badge colorScheme="gray" ml={1}>
              任意
            </Badge>
          </FormLabel>
          <Textarea {...props.register("introduction", { maxLength: { value: 300, message: "300文字以内にしてください" } })} />
          <FormErrorMessage>{props.errors.introduction?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb={4}>
          <Checkbox {...props.register("isAdmin")}>管理者権限</Checkbox>
        </FormControl>

        <HStack>
          <Button type="submit" colorScheme="teal" leftIcon={<DownloadIcon />} my={4}>
            保存
          </Button>
          {props.user?.id === currentUser?.id && (
            <Button colorScheme="red" leftIcon={<DeleteIcon />} onClick={() => deleteUser(props.user.id)}>
              退会
            </Button>
          )}
        </HStack>
      </form>
    </Box>
  );
};
