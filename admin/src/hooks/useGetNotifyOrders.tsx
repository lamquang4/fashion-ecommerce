import axios from "axios";
import useSWR from "swr";
import { Order } from "@/types/types";

interface ResponseType {
  orders: Order[];
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useGetNotifyOrders() {
  const url = `/api/get-notify-orders`;
  const { data, error, isLoading, mutate } = useSWR<ResponseType>(
    url,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );
  return {
    orders: data?.orders ?? [],
    isLoading,
    error,
    mutate,
  };
}
