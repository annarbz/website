import axios from "../axios";
import {FilmRetrieveInfo, Genre, Movie, MovieList} from "@/lib/api/types";

export const filmListQuery = async (currentPage: string, pageSize: string, genre?: Genre, search: string = '', language?: string, year: string = '') => {
  const querySearch = search === '' ? '' : search;
  const queryLanguage = language === 'russian' ? 'russian' : '';
  const queryYear = year === '' ? '' : year;
  console.log(genre);

  const queryTerm = `${querySearch} ${queryLanguage} ${queryYear}`.trim();
  const response = await axios.get<{
    data: MovieList
  }>(`list_movies.json?page=${currentPage}&limit=${pageSize}${genre && (genre as string).length > 0 ? `&genre=${genre}` : ''}`, {
    params: {
      query_term: queryTerm,
    }
  });
  return response.data;
};

export const filmRetrieveQuery = async (id: string): Promise<FilmRetrieveInfo> => {
  const responseMovie = await axios.get<{ data: { movie: Movie } }>(`movie_details.json?movie_id=${id}&with_cast=true`);

  const responseSuggestion = await axios.get<{ data: MovieList }>(`movie_suggestions.json?movie_id=${id}`);
  return {movie: responseMovie.data.data.movie, suggestions: responseSuggestion.data.data};
};