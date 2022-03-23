import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewForm } from "components/reviews/ReviewForm";

const AdminReviewEdit = () => {
  useAdminAuthControl();
  const BASE_URL = "/reviews";
  const router = useRouter();
  const reviewId = router.query.reviewId;
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [previewImageUrls, setPreviewImageUrls] = useState([]);
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: review, error: reviewError, isLoading: reviewIsLoading, isError: reviewIsError } = useGetRequest(`${BASE_URL}/${reviewId}`);
  const { data: users, error: userError, isLoading: userIsLoading, isError: userIsError } = useGetRequest("/admin/users");
  const { data: travelSpots, error: travelSpotError, isLoading: travelSpotIsLoading, isError: travelSpotIsError } = useGetRequest("/admin/travel_spots");

  const onSubmit = (inputData) => {
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
      if (previewImageUrls.length === 0) setPreviewImageUrls(review.images.map((image) => image.url));
    }
  }, [review]);

  console.log(previewImageUrls);

  if (reviewIsLoading || userIsLoading || travelSpotIsLoading) return <LoadingSpinner />;
  if (reviewIsError || userIsError || travelSpotIsError)
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
