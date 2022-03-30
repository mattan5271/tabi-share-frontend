import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewForm } from "components/reviews/ReviewForm";
import { Image, Review } from "types";

const AdminReviewEdit: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/reviews";
  const router: NextRouter = useRouter();
  const reviewId: string | string[] | undefined = router.query.reviewId;
  const [rating, setRating] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>();

  const { data: review, error: reviewError, isLoading: reviewIsLoading } = useGetRequest(`${BASE_URL}/${reviewId}`);
  const { data: users, error: userError, isLoading: userIsLoading } = useGetRequest("/admin/users");
  const { data: travelSpots, error: travelSpotError, isLoading: travelSpotIsLoading } = useGetRequest("/admin/travel_spots");

  const onSubmit = (inputData: Review): void => {
    handlePatchRequest({
      apiUrl: `${BASE_URL}/${reviewId}`,
      params: { ...inputData, images, rating },
      modelJa: "レビュー",
      modelEn: "review",
    });
    reset();
  };

  useEffect(() => {
    if (review) {
      reset(review);
      setRating(review.rating);
      if (previewImageUrls.length === 0) setPreviewImageUrls(review.images.map((image: Image) => image.url));
    }
  }, [review]);

  if (reviewIsLoading || userIsLoading || travelSpotIsLoading) return <LoadingSpinner />;
  if (reviewError || userError || travelSpotError)
    return <Error statusCode={reviewError?.response?.status || userError?.response?.status || travelSpotError?.response?.status || 500} />;

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

export default AdminReviewEdit;
