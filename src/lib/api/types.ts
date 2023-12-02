export type Movie = {
  id: number;
  url: string;
  imdb_code: string;
  slug: string
  title: string;
  synopsis: string;
  yt_trailer_code: string;
  mpa_rating: string;
  state?: string;
  title_english: string;
  title_long: string;
  year: number;
  rating: number;
  runtime: number;
  genres: Genre[];
  summary: string;
  description_full: string;
  language: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  download_count?: number;
  like_count?: number;
  date_uploaded: string;
  date_uploaded_unix: number;
  torrents: {
    url: string;
    quality: string;
    type: string;
    hash: string;
    seeds: number;
    peers: number;
    is_repack: string;
    video_codec: string;
    bit_depth: string;
    audio_channels: string;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  }[];
  cast?: {
    name?: string;
    character_name?:string
    url_small_image?: string
    imdb_code?: string
  }[]
};

export type MovieList = {
  movie_count: number;
  limit: number;
  page_count?: number;
  movies: Movie[];
}
export type Genre =
  | ""
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Mystery"
  | "Romance"
  | "Sci-Fi"
  | "Thriller"
  | "Biography"
  | "Documentary"
  | "Family"
  | "Film-Noir"
  | "History"
  | "Music"
  | "Musical"
  | "News"
  | "Reality-TV"
  | "Short"
  | "Sport"
  | "Talk-Show"
  | "War"
  | "Western"
  | "Game-Show";

export type SliderFilmContent = {
  genre: Genre;
  text: string;
  filmsResponse: MovieList
}

export type FilmRetrieveInfo = {
  movie: Movie;
  suggestions: MovieList
}