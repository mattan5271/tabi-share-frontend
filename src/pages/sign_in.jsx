import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { NextLink } from "components/other/NextLink";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Flex, Box, FormControl, FormLabel, FormErrorMessage, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text } from "@chakra-ui/react";

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {
    client
      .post("/sign_in", inputData)
      .then((res) => {
        reset();
        router.push("/");
        setCurrentUser(res.data);
        toast.success("サインインに成功しました");
      })
      .catch((err) => {
        console.log(err);
        toast.error("サインインに失敗しました");
      });
  };

  useEffect(() => {
    if (currentUser) {
      alert("既にサインイン済みです");
      router.push("/");
    }
  }, []);

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} isTruncated>ログイン</Heading>
          </Stack>

          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" mb={4} isInvalid={!!errors.email}>
                  <FormLabel>メールアドレス</FormLabel>
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
                  <FormLabel>パスワード</FormLabel>
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

                <Stack mb={4}>
                  <Button type="submit" colorScheme="blue">
                    ログイン
                  </Button>
                </Stack>
              </form>

              <Stack>
                <Text align={"center"}>
                  アカウントをお持ちではないですか？
                  <NextLink href="/sign_up"> 新規会員登録</NextLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignIn;
