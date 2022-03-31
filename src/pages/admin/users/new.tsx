import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { UserForm } from "components/users/UserForm";
import { User } from "types";

const AdminUserNew: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/users";
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (inputData: User): void => {
    handlePostRequest({
      apiUrl: BASE_URL,
      params: { ...inputData, profileImage },
      modelJa: "ユーザー",
      modelEn: "user",
      redirectPath: BASE_URL,
    });
    reset();
  };

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

export default AdminUserNew;
