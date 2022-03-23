import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewsTable } from "components/reviews/ReviewsTable";

const AdminReviews = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/reviews";
  const { data: reviews, error, isLoading, isError, mutate } = useGetRequest(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return <ReviewsTable reviews={reviews} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminReviews;
