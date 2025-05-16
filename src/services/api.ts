import type { UsersResponse } from "../types";

const LIMIT_RESULTS = 10;
const LIMIT_PAGE = 10;

export const fetchUsers = async ({
  pageParam
}: {
  pageParam: number | unknown;
}) => {
  const url = `https://randomuser.me/api/?results=${LIMIT_RESULTS}&page=${pageParam}&seed=alex`;
  return await fetch(url)
    .then(async (res) => {
      if (!res.ok) throw new Error("Error al obtener los usuarios");
      return await res.json();
    })
    .then((res: UsersResponse) => {
      const currentPage = res.info.page;
      const nextCursor =
        currentPage === LIMIT_PAGE ? undefined : currentPage + 1;

      return {
        users: res.results,
        nextCursor
      };
    });
};
