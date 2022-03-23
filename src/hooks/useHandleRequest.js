import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import { client } from "libs/client";
import { useCreateFormData } from "hooks/useCreateFormData";
import { userState } from "stores/userState";

export const useHandleRequest = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const handlePostRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath, mutate }) => {
    const formData = useCreateFormData({ model: modelEn, params: params });
    return client
      .post(apiUrl, formData)
      .then(() => {
        redirectPath && router.push(redirectPath);
        mutate && mutate.mutate(mutate.url);
        toast.success(`${modelJa}の作成に成功しました`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${modelJa}の作成に失敗しました`);
      });
  };

  const handlePatchRequest = ({ apiUrl, params, modelJa, modelEn, redirectPath }) => {
    const formData = useCreateFormData({ model: modelEn, params: params });
    return client
      .patch(apiUrl, formData)
      .then((res) => {
        redirectPath && router.push(redirectPath);
        if (modelEn == "user" && res.data.id === currentUser.id) setCurrentUser(res.data);
        toast.success(`${modelJa}の更新に成功しました`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${modelJa}の更新に失敗しました`);
      });
  };

  const handleDeleteRequest = ({ apiUrl, modelJa, modelEn, mutate }) => {
    return client
      .delete(apiUrl)
      .then((res) => {
        if (modelEn == "user" && res.data.id === currentUser.id) {
          router.push("/");
          setCurrentUser(null);
          toast.success("ログインユーザーが削除されたのでサインアウトしました");
        } else {
          mutate.mutate(mutate.url);
          toast.success(`${modelJa}の削除に成功しました`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(`${modelJa}の削除に失敗しました`);
      });
  };

  return { handlePostRequest, handlePatchRequest, handleDeleteRequest };
};
