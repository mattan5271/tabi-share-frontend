import { NextPage } from "next";
import Error from "next/error";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewForm } from "components/reviews/ReviewForm";
import { Review } from "types";

const AdminReviewNew: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/reviews";
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const { handlePostRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>();

  const { data: users, error: userError, isLoading: userIsLoading } = useGetRequest("/admin/users");
  const { data: travelSpots, error: travelSpotError, isLoading: travelSpotIsLoading } = useGetRequest("/admin/travel_spots");

  const onSubmit = (inputData: Review): void => {
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
  if (userError || travelSpotError) return <Error statusCode={userError?.response?.status || travelSpotError?.response?.status || 500} />;

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
