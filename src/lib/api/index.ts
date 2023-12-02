import axios from "../axios";
import {FilmRetrieveInfo, Genre, Movie, MovieList} from "@/lib/api/types";

export const filmListQuery = async (currentPage: string, pageSize: string, genre?: Genre | Genre[], search?: string, language?: string, year?: string) => {
  const response = await axios.get<{
    data: MovieList
  }>(`list_movies.json?page=${currentPage}&limit=${pageSize}`, {
    params: {
      genre,
      query_term: search ? search : '' + " " + language === 'russian' ? 'russian ' : ' ' + year ? year : '',
    }
  });
  return response.data;
};

export const filmRetrieveQuery = async (id: string): Promise<FilmRetrieveInfo> => {
  const responseMovie = await axios.get<{ data: { movie: Movie } }>(`movie_details.json?movie_id=${id}&with_cast=true`);

  const responseSuggestion = await axios.get<{ data: MovieList }>(`movie_suggestions.json?movie_id=${id}`);
  return {movie: responseMovie.data.data.movie, suggestions: responseSuggestion.data.data};
};