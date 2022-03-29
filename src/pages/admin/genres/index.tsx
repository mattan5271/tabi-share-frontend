import { NextPage } from "next";
import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { GenresTable } from "components/genres/GenresTable";
import { Genre } from "types";

const AdminGenres: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/genres";
  const { data: genres, error, isLoading, mutate } = useGetRequest<Genre[]>(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <GenresTable genres={genres} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminGenres;
