import { NextPage } from "next";
import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewsTable } from "components/reviews/ReviewsTable";

const AdminReviews: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/reviews";
  const { data: reviews, error, isLoading, mutate } = useGetRequest(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <ReviewsTable reviews={reviews} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminReviews;
