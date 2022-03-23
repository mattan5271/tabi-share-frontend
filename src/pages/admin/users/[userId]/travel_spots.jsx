import Error from "next/error";
import { useRouter } from "next/router";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotsTable } from "components/travel_spots/TravelSpotsTable";

const AdminUserTravelSpots = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/users";
  const router = useRouter();
  const userId = router.query.userId;
  const { data: user, error, isLoading, isError, mutate } = useGetRequest(`${BASE_URL}/${userId}`);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return <TravelSpotsTable travelSpots={user.travelSpots} mutate={{ mutate, url: `${BASE_URL}/${userId}` }} />;
};

export default AdminUserTravelSpots;
