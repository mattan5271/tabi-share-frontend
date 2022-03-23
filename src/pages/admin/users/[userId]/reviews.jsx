import Error from "next/error";
import { useRouter } from "next/router";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { ReviewsTable } from "components/reviews/ReviewsTable";

const AdminUserReviews = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/users";
  const router = useRouter();
  const userId = router.query.userId;
  const { data: user, error, isLoading, isError, mutate } = useGetRequest(`${BASE_URL}/${userId}`);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return <ReviewsTable reviews={user.reviews} mutate={{ mutate, url: `${BASE_URL}/${userId}` }} />;
};

export default AdminUserReviews;
