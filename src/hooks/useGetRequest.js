import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { client } from "libs/client";

export const useGetRequest = (url) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const fetcher = (url) => client.get(url);

  // router.isReadyがtrueになっていないとidが取れないので動的ルーティングでSWRがundefinedを返してしまう
  const { data, error } = useSWR(router.isReady ? url : null, fetcher);

  return {
    data: data?.data,
    error: error,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
