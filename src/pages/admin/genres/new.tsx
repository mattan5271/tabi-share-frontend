import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { GenreForm } from "components/genres/GenreForm";
import { Genre } from "types";

const AdminGenreNew: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/genres";
  const [image, setImage] = useState<File>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Genre>();

  const onSubmit = (inputData: Genre): void => {
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
