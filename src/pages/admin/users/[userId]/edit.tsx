import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { UserForm } from "components/users/UserForm";
import { User } from "types";

const AdminUserEdit: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/users";
  const router: NextRouter = useRouter();
  const userId: string | string[] | undefined = router.query.userId;
  const [profileImage, setProfileImage] = useState<File>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const { data: user, error, isLoading } = useGetRequest(`${BASE_URL}/${userId}`);

  const onSubmit = (inputData: User): void => {
    handlePatchRequest({
      apiUrl: `${BASE_URL}/${userId}`,
      params: { ...inputData, profileImage },
      modelJa: "ユーザー",
      modelEn: "user",
      redirectPath: BASE_URL,
    });
    reset();
  };

  useEffect(() => {
    if (user) {
      reset(user); // フォームに初期値を入れる
      if (!previewImageUrl) setPreviewImageUrl(user.profileImage.url);
    }
  }, [user]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return (
    <UserForm
      setProfileImage={setProfileImage}
      previewImageUrl={previewImageUrl}
      setPreviewImageUrl={setPreviewImageUrl}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
    />
  );
};

export default AdminUserEdit;
