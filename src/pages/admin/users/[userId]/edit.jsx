import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { UserForm } from "components/users/UserForm";

const AdminUserEdit = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/users";
  const router = useRouter();
  const userId = router.query.userId;
  const [profileImage, setProfileImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: user, error, isLoading, isError, mutate } = useGetRequest(`${BASE_URL}/${userId}`);

  const onSubmit = (inputData) => {
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
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

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
