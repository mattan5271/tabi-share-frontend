import Error from "next/error";
import { useRouter } from "next/router";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewsTable } from "components/reviews/ReviewsTable";

const AdminTravelSpotReviews = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/travel_spots";
  const router = useRouter();
  const travelSpotId = router.query.travelSpotId;
  const { data: travelSpot, error, isLoading, isError, mutate } = useGetRequest(`${BASE_URL}/${travelSpotId}`);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return <ReviewsTable reviews={travelSpot.reviews} mutate={{ mutate, url: `${BASE_URL}/${travelSpotId}` }} />;
};

export default AdminTravelSpotReviews;
