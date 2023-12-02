import {useQuery, useQueryClient} from "@tanstack/react-query";

import {filmRetrieveQuery} from "@/lib/api";
import {FilmRetrieveInfo} from "@/lib/api/types";

export const useFilmRetrieve = (id: string, initialData?: FilmRetrieveInfo) => {
  const queryClient = useQueryClient();

  const {
    data: filmRetrieve,
    isSuccess,
    isLoading,
    isError,
  } = useQuery<FilmRetrieveInfo>({
    queryKey: ["getFilmRetrieve", id],
    queryFn: () => filmRetrieveQuery(id),
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    enabled: id !== "",
    initialData

  });

  const updateFilmRetrieve = () => {
    return queryClient.invalidateQueries({
      queryKey: ["getFilmRetrieve"],
    });
  };

  return {
    filmRetrieve,
    updateFilmRetrieve,
    isSuccess,
    isLoading,
    isError,
  };
};

