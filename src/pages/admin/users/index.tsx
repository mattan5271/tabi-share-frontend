import { NextPage } from "next";
import Error from "next/error";

import { useGetRequest } from "hooks/useGetRequest";
import { useAdminAuthControl } from "hooks/useAdminAuthControl";
import { LoadingSpinner } from "components/other/LoadingSpinner";
import { UsersTable } from "components/users/UsersTable";

const AdminUsers: NextPage = () => {
  useAdminAuthControl();
  const BASE_URL: string = "/admin/users";
  const { data: users, error, isLoading, mutate } = useGetRequest(BASE_URL);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error statusCode={error?.response?.status || 500} />;

  return <UsersTable users={users} mutate={{ mutate, url: BASE_URL }} />;
};

export default AdminUsers;
