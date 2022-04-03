import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useGetRequest } from "hooks/useGetRequest";
import { useHandleRequest } from "hooks/useHandleRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotForm } from "components/travel_spots/TravelSpotForm";
import { Image, TravelSpot } from "types";

const AdminTravelSpotEdit: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/travel_spots";
  const router: NextRouter = useRouter();
  const travelSpotId: string | string[] | undefined = router.query.travelSpotId;
  const [images, setImages] = useState<File[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const { handlePatchRequest } = useHandleRequest();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TravelSpot>();

  const { data: travelSpot, error: travelSpotError, isLoading: travelSpotIsLoading } = useGetRequest(`${BASE_URL}/${travelSpotId}`);
  const { data: users, error: userError, isLoading: userIsLoading } = useGetRequest("/admin/users");
  const { data: genres, error: genreError, isLoading: genreIsLoading } = useGetRequest("/admin/genres");
  const { data: prefectures, error: prefectureError, isLoading: prefectureIsLoading } = useGetRequest("/admin/prefectures");

  const onSubmit = (inputData: TravelSpot): void => {
    handlePatchRequest({
      apiUrl: `${BASE_URL}/${travelSpotId}`,
      params: { ...inputData, images },
      modelJa: "旅行先",
      modelEn: "travel_spot",
      redirectPath: BASE_URL,
    });
    reset();
  };

  useEffect(() => {
    if (travelSpot) {
      reset(travelSpot);
      if (previewImageUrls.length === 0) setPreviewImageUrls(travelSpot.images.map((image: Image) => image.url));
    }
  }, [reset, travelSpot, previewImageUrls]);

  if (travelSpotIsLoading || userIsLoading || genreIsLoading || prefectureIsLoading) return <LoadingSpinner />;
  if (travelSpotError || userError || genreError || prefectureError) {
    return <Error statusCode={travelSpotError?.response?.status || userError?.response?.status || genreError?.response?.status || prefectureError?.response?.status || 500} />;
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

export default AdminTravelSpotEdit;
