import {useQuery, useQueryClient} from "@tanstack/react-query";

import {filmListQuery} from "@/lib/api";
import {Genre, MovieList} from "@/lib/api/types";


export const useFilmList = ({
                              currentPage,
                              pageSize,
                              defaultValue,
                              genre,
                              language, search, year,
                              pageRequest
                            }: {
  currentPage: string,
  pageSize: string,
  defaultValue?: MovieList,
  genre?: Genre,
  language?: string,
  search?: string
  year?: string
  pageRequest?:string;
}) => {
  const queryClient = useQueryClient();
  const {
    data: filmList,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getFilmList", currentPage, pageSize, genre, language, search, year, pageRequest],
    queryFn: () => filmListQuery(currentPage, pageSize, genre, search, language, year),
    keepPreviousData: true,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000,
    initialData: defaultValue ? {
      data: defaultValue
    } : undefined,
  });

  const updateFilmList = () => {
    // refetch();
    return queryClient.invalidateQueries({queryKey: ["getFilmList", currentPage, pageSize, genre]});
  };

  return {
    filmList,
    updateFilmList,
    isSuccess,
    isLoading,
    isError,
  };
};
