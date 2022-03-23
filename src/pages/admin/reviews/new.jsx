import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewForm } from "components/reviews/ReviewForm";

const AdminReviewNew = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/reviews";
  const [rating, setRating] = useState(0);
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
  const { data: travelSpots, error: travelSpotError, isLoading: travelSpotIsLoading, isError: travelSpotIsError } = useGetRequest("/admin/travel_spots");

  const onSubmit = (inputData) => {
    handlePostRequest({
      apiUrl: BASE_URL,
      params: { ...inputData, images, rating },
      modelJa: "レビュー",
      modelEn: "review",
      redirectPath: BASE_URL,
    });
    reset();
  };

  if (userIsLoading || travelSpotIsLoading) return <LoadingSpinner />;
  if (userIsError || travelSpotIsError) return <Error statusCode={userError?.response?.status || travelSpotError?.response?.status || 500} />;

  return (
    <ReviewForm
      users={users}
      travelSpots={travelSpots}
      rating={rating}
      setRating={setRating}
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

export default AdminReviewNew;
