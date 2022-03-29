import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewsTable } from "components/reviews/ReviewsTable";

const AdminTravelSpotReviews: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/travel_spots";
  const router: NextRouter = useRouter();
  const travelSpotId: string | string[] | undefined = router.query.travelSpotId;
  const { data: travelSpot, error, isLoading, mutate } = useGetRequest(`${BASE_URL}/${travelSpotId}`);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <ReviewsTable reviews={travelSpot.reviews} mutate={{ mutate, url: `${BASE_URL}/${travelSpotId}` }} />;
};

export default AdminTravelSpotReviews;
