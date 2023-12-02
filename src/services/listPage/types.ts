import {Genre, MovieList} from "@/lib/api/types";

export type TListPageProps = {
  filmList: MovieList;
  page?: number;
  size?: number;
  genre?: Genre;
  language?: string, year?: string, search?: string
};
