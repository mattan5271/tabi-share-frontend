import { NextRouter, useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { ScopedMutator } from "swr/dist/types";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { userState } from "stores/userState";
import { User } from "types";

type RequestProps = {
  apiUrl: string;
  params?: any;
  modelJa: string;
  modelEn: string;
  redirectPath?: string;
  mutate?: { mutate: ScopedMutator<any>; url: string };
};

type CreateFormDataProps = {
  model: string;
  params: {
    key: string;
    value: any;
  };
};

export const createFormData = ({ model, params }: CreateFormDataProps) => {
  const formData: FormData = new FormData();
  Object.entries(params).map(([key, value]) => {
    if (value == null || (Array.isArray(value) && !value.length)) return; // null、undefine、空配列の場合はパラメーターに乗せない
    if (key.match(/images/)) {
      value.map((image: File) => formData.append(`${model}[images][]`, image));
    } else {
      formData.append(`${model}[${key}]`, value);
    }
  });
  return formData;
};

export const useHandleRequest = () => {
  const router: NextRouter = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState<User | null>(userState);

  const handlePostRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath, mutate }: RequestProps): Promise<void> => {
    const formData = createFormData({ model: modelEn, params: params });
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

  const handlePatchRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath }: RequestProps): Promise<void> => {
    const formData = createFormData({ model: modelEn, params: params });
    return client
      .patch(apiUrl, formData)
      .then((res: AxiosResponse) => {
        redirectPath && router.push(redirectPath);
        if (modelEn == "user" && res.data.id === currentUser?.id) setCurrentUser(res.data);
        toast.success(`${modelJa}の更新に成功しました`);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
        toast.error(`${modelJa}の更新に失敗しました`);
      });
  };

  const handleDeleteRequest = ({ apiUrl, modelJa, modelEn, mutate }: RequestProps): Promise<void> => {
    return client
      .delete(apiUrl)
      .then((res: AxiosResponse) => {
        if (modelEn == "user" && res.data.id === currentUser?.id) {
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
