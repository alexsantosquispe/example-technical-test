import { useInfiniteQuery } from "@tanstack/react-query";
import type { User } from "../types";
import { fetchUsers } from "../services/api";

type UsersPaginationResponse = {
  nextCursor?: number;
  users: User[];
};

export const useUsers = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery<UsersPaginationResponse>({
      queryKey: ["users"],
      queryFn: ({ pageParam }) => fetchUsers({ pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false
    });

  return {
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch
  };
};
