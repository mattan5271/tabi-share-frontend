import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { UserForm } from "components/users/UserForm";

const AdminUserNew = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/users";
  const [profileImage, setProfileImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData) => {
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
