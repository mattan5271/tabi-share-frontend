import { useState } from "react";
import { useForm } from "react-hook-form";

import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { GenreForm } from "components/genres/GenreForm";

const AdminGenreNew = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/genres";
  const [image, setImage] = useState(null);
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
