import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotForm } from "components/travel_spots/TravelSpotForm";

const AdminTravelSpotNew = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/travel_spots";
  const [images, setImages] = useState([]);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: users, error: userError, isLoading: userIsLoading, isError: userIsError } = useGetRequest("/admin/users");
  const { data: genres, error: genreError, isLoading: genreIsLoading, isError: genreIsError } = useGetRequest("/admin/genres");
  const { data: prefectures, error: prefectureError, isLoading: prefectureIsLoading, isError: prefectureIsError } = useGetRequest("/admin/prefectures");

  const onSubmit = (inputData) => {
    handlePostRequest({
      apiUrl: BASE_URL,
      params: { ...inputData, images },
      modelJa: "旅行先",
      modelEn: "travel_spot",
      redirectPath: "/",
    });
    reset();
  };

  if (userIsLoading || genreIsLoading || prefectureIsLoading) return <LoadingSpinner />;
  if (userIsError || genreIsError || prefectureIsError) {
    return <Error statusCode={userError?.response?.status || genreError?.response?.status || prefectureError?.response?.status || 500} />;
  }

  return (
    <TravelSpotForm
      users={users}
      genres={genres}
      prefectures={prefectures}
      setImages={setImages}
      previewImageUrls={previewImageUrls}
      setPreviewImageUrls={setPreviewImageUrls}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
    />
  );
};

export default AdminTravelSpotNew;
