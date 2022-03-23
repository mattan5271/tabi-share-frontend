import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { GenresTable } from "components/genres/GenresTable";

const AdminGenres = () => {
  useAdminAuthControl();
  const BASE_URL = "/admin/genres";
  const { data: genres, error, isLoading, isError, mutate } = useGetRequest(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error statusCode={error?.response?.status || 500} />;

  return <GenresTable genres={genres} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminGenres;
