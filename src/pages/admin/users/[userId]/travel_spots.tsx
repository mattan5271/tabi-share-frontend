import { NextPage } from "next";
import Error from "next/error";
import { NextRouter, useRouter } from "next/router";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotsTable } from "components/travel_spots/TravelSpotsTable";

const AdminUserTravelSpots: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/users";
  const router: NextRouter = useRouter();
  const userId: string | string[] | undefined = router.query.userId;
  const { data: user, error, isLoading, mutate } = useGetRequest(`${BASE_URL}/${userId}`);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <TravelSpotsTable travelSpots={user.travelSpots} mutate={{ mutate, url: `${BASE_URL}/${userId}` }} />;
};

export default AdminUserTravelSpots;
