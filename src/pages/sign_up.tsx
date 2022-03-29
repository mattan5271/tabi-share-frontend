import { NextRouter, useRouter } from "next/router";
import { useEffect, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { NextLink } from "components/other/NextLink";
import { User } from "types";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Flex, Box, Badge, FormControl, FormLabel, Input, InputGroup, InputRightElement, FormErrorMessage, Stack, Button, Heading, Text } from "@chakra-ui/react";

const SignUp: VFC = () => {
  const router: NextRouter = useRouter();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<Boolean>(false);
  const [currentUser, setCurrentUser] = useRecoilState<User>(userState);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (inputData: User) => {
    client
      .post("/sign_up", inputData)
      .then((res: AxiosResponse<User>) => {
        reset();
        router.push("/");
        setCurrentUser(res.data);
        toast.success("サインアップに成功しました");
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
        toast.error("サインアップに失敗しました");
      });
  };

  useEffect(() => {
    if (currentUser) {
      alert("既にサインイン済みです");
      router.push("/");
    }
  }, []);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} isTruncated>
            新規会員登録
          </Heading>
        </Stack>

        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" mb={4} isInvalid={!!errors.email}>
                <FormLabel>
                  メールアドレス
                  <Badge colorScheme="red" ml={1}>
                    必須
                  </Badge>
                </FormLabel>
                <Input
                  type="text"
                  {...register("email", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value: /\S+@\S+/,
                      message: "メールアドレスの形式が違います",
                    },
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" mb={4} isInvalid={!!errors.password}>
                <FormLabel>
                  パスワード
                  <Badge colorScheme="red" ml={1}>
                    必須
                  </Badge>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "パスワードを入力してください",
                      minLength: { value: 8, message: "8文字以上にしてください" },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <FormControl id="password_confirm" mb={4} isInvalid={!!errors.passwordConfirmation}>
                <FormLabel>
                  パスワード再入力
                  <Badge colorScheme="red" ml={1}>
                    必須
                  </Badge>
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPasswordConfirmation ? "text" : "password"}
                    {...register("passwordConfirmation", {
                      required: "パスワードを再入力してください",
                      validate: { matchPassword: (value) => value === getValues("password") || "パスワードが一致しません" },
                    })}
                  />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPasswordConfirmation((showPasswordConfirmation) => !showPasswordConfirmation)}>
                      {showPasswordConfirmation ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.passwordConfirmation?.message}</FormErrorMessage>
              </FormControl>

              <Stack mb={4}>
                <Button type="submit" colorScheme="blue">
                  登録する
                </Button>
              </Stack>
            </form>

            <Stack>
              <Text align={"center"}>
                既にアカウントをお持ちですか？
                <NextLink href="/sign_in"> ログイン</NextLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
