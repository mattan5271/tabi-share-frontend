import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { GenreForm } from "components/genres/GenreForm";

const AdminGenreEdit = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/genres";
  const router = useRouter();
  const genreId = router.query.genreId;
  const [image, setImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: genre, error, isLoading, isError } = useGetRequest(`${BASE_URL}/${genreId}`);

  const onSubmit = (inputData) => {
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
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

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
