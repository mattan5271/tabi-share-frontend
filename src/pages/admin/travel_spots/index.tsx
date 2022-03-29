import { NextPage } from "next";
import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { TravelSpotsTable } from "components/travel_spots/TravelSpotsTable";

const AdminTravelSpots: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/travel_spots";
  const { data: travelSpots, error, isLoading, mutate } = useGetRequest(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <TravelSpotsTable travelSpots={travelSpots} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminTravelSpots;
