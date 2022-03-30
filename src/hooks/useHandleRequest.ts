import { NextRouter, useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { useCreateFormData } from "hooks/useCreateFormData";
import { userState } from "stores/userState";

type Props = {
  apiUrl: string;
  params?: any;
  modelJa: string;
  modelEn: string;
  redirectPath?: string;
  mutate?: { mutate: ScopedMutator<any>; url: string };
};

export const useHandleRequest = () => {
  const router: NextRouter = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const handlePostRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath, mutate }: Props): Promise<void> => {
    const formData = useCreateFormData({ model: modelEn, params: params });
    return client
      .post(apiUrl, formData)
      .then((res: AxiosResponse) => {
        redirectPath && router.push(redirectPath);
        mutate && mutate.mutate(mutate.url);
        toast.success(`${modelJa}の作成に成功しました`);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
        toast.error(`${modelJa}の作成に失敗しました`);
      });
  };

  const handlePatchRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath }: Props): Promise<void> => {
    const formData = useCreateFormData({ model: modelEn, params: params });
    return client
      .patch(apiUrl, formData)
      .then((res: AxiosResponse) => {
        redirectPath && router.push(redirectPath);
        if (modelEn == "user" && res.data.id === currentUser.id) setCurrentUser(res.data);
        toast.success(`${modelJa}の更新に成功しました`);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
        toast.error(`${modelJa}の更新に失敗しました`);
      });
  };

  const handleDeleteRequest = ({ apiUrl, modelJa, modelEn, mutate }: Props): Promise<void> => {
    return client
      .delete(apiUrl)
      .then((res: AxiosResponse) => {
        if (modelEn == "user" && res.data.id === currentUser.id) {
          router.push("/");
          setCurrentUser(null);
          toast.success("ログインユーザーが削除されたのでサインアウトしました");
        } else {
          mutate && mutate.mutate(mutate.url);
          toast.success(`${modelJa}の削除に成功しました`);
        }
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
        toast.error(`${modelJa}の削除に失敗しました`);
      });
  };

  return { handlePostRequest, handlePatchRequest, handleDeleteRequest };
};
