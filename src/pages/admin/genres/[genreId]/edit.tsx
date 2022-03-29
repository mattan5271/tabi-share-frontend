import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { GenreForm } from "components/genres/GenreForm";
import { Genre, Image } from "types";

const AdminGenreEdit: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/genres";
  const router: NextRouter = useRouter();
  const genreId: string | string[] | undefined = router.query.genreId;
  const [image, setImage] = useState<Image>();
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Genre>();

  const { data: genre, error, isLoading } = useGetRequest(`${BASE_URL}/${genreId}`);

  const onSubmit = (inputData: Genre): void => {
    handlePatchRequest({
      apiUrl: `${BASE_URL}/${genreId}`,
      params: { ...inputData, image },
      modelJa: "ジャンル",
      modelEn: "genre",
      redirectPath: BASE_URL,
    });
    reset();
  };

  useEffect(() => {
    reset(genre);
    if (genre && !previewImageUrl) setPreviewImageUrl(genre.image?.url);
  }, [genre]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

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

export default AdminGenreEdit;
