import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { GenreForm } from "components/genres/GenreForm";
import { Image, User } from "types";

const AdminGenreNew: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/genres";
  const [image, setImage] = useState<Image>();
  const [previewImageUrl, setPreviewImageUrl] = useState<String>("");
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (inputData: User): void => {
    handlePostRequest({
      apiUrl: BASE_URL,
      params: { ...inputData, image },
      modelJa: "ジャンル",
      modelEn: "genre",
      redirectPath: BASE_URL,
    });
    reset();
  };

  return (
    <GenreForm
      setImage={setImage}
      previewImageUrl={previewImageUrl}
      setPreviewImageUrl={setPreviewImageUrl}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
    />
  );
};

export default AdminGenreNew;
