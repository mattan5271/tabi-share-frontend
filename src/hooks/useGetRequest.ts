import { useRouter, NextRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { client } from "libs/client";
import { ScopedMutator } from "swr/dist/types";
import { AxiosResponse, AxiosError } from "axios";

type SWR = {
  data: any;
  error: any;
  isLoading: boolean;
  mutate: ScopedMutator<any>;
};

export const useGetRequest = <T>(url: string): SWR => {
  const router: NextRouter = useRouter();
  const { mutate } = useSWRConfig();
  const fetcher = (url: string): Promise<AxiosResponse<T, AxiosError>> => client.get(url);

  // router.isReadyがtrueになっていないとidが取れないので動的ルーティングでSWRがundefinedを返してしまう
  const { data, error } = useSWR(router.isReady ? url : null, fetcher);

  return {
    data: data?.data,
    error: error,
    isLoading: !error && !data,
    mutate,
  };
};
