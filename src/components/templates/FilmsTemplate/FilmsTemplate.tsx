import ListMovieHorizontal from "@/components/common/ListMoveHorizontal/ListMovieHorizontal";
import {LazyLoadImage} from "react-lazy-load-image-component";
import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import {FilmRetrieveInfo, MovieList} from "@/lib/api/types";
import {BsClockHistory} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {TorrentModal} from "@/components/common/TorrentModal/TorrentModal";
import React, {useEffect, useState} from "react";
import {MdOutlineCloudDownload} from "react-icons/md";
import {useFilmRetrieve} from "@/lib/hooks/useFilmRetrieve";
import {router} from "next/client";
import {useFilmList} from "@/lib/hooks/useFilmList";

export const FilmsTemplate = ({data, id}: { data?: FilmRetrieveInfo , id:string}) => {
  const [torrentModalIsOpen, setTorrentModalIsOpen] = useState(false);
  const [suggestionForView, setSuggestionForView] = useState<MovieList>();

  const {filmRetrieve, updateFilmRetrieve} = useFilmRetrieve(
    id || "",
    data
  );


  // добавим фильмы из общей кучи, чтобы слайдер выглядел лучше
  const {filmList, isLoading, updateFilmList} = useFilmList(
    {currentPage: "1", pageSize: "6"}
  );

  const {movie, suggestions} = filmRetrieve ? filmRetrieve : {movie: undefined, suggestions: undefined};
  const {cast} = movie ? movie : {cast: undefined};

  useEffect(() => {
    updateFilmRetrieve();

    const arr1 = suggestions?.movies ?? [];
    const arr2 = filmList?.data?.movies ?? [];
    const sug = {
      movie_count: 10,
      page: 1,
      limit: 10,
      page_count: 1,
      movies: [...arr1, ...arr2]
    }

    setSuggestionForView(sug)
  }, [])

  console.log(movie, suggestions);
  return (<div className='detail-page w-full'>
    {
      movie && <div className="detail" style={{backgroundImage: `url(${movie.background_image_original})`}}>
            <Wrapper className='relative z-[1] flex flex-col md:flex-row gap-8 md:gap-16 py-5'>
                <div className="detail-card overflow-hidden self-center rounded-2xl w-60">
                    <LazyLoadImage src={movie.medium_cover_image} loading='lazy'
                                   alt={movie.title}/>
                </div>
                <div className="detail-content text-white md:flex-1">
                    <div
                        className="name text-white text-4xl tracking-widest font-extrabold">{movie.title_long}</div>
                    <div className="info flex items-center gap-2 md:gap-4 text-sm mt-4">
                        <span
                            className='tracking-widest'>{movie.year ?? ""}</span>
                        <span className='flex items-center gap-2'><BsClockHistory
                            className='text-xl'/>{movie.runtime} минут </span>
                        <span className='flex items-center text-sm'><AiFillStar
                            className='text-xl mr-1'/> {movie.rating.toFixed(2)}<span
                            className='text-xs font-sans italic opacity-70'>/10</span></span>
                      {movie.torrents && movie.torrents.length > 0 ?
                        <>
                          <TorrentModal modalIsOpen={torrentModalIsOpen} setIsOpen={setTorrentModalIsOpen}
                                        torrents={movie.torrents}/>
                          <button onClick={() => setTorrentModalIsOpen(true)}
                                  className='flex items-center gap-4 uppercase tracking-[4px] group'>
                            Download
                            <MdOutlineCloudDownload
                              className='text-xl group-hover:translate-x-1 transition-transform duration-300'/></button>
                        </>
                        : null}
                    </div>
                    <div className='flex items-center gap-6 flex-wrap mt-6'>
                      {
                        movie.genres.map((genre, index) => {
                          return (
                            <span key={genre}
                                  className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>{genre}</span>

                          )
                        })
                      }
                    </div>
                    <h2 className='text-light-gray text-2xl relative mb-2 mt-10'>Актерский состав</h2>

                    <div className='flex items-center mt-5 gap-x-8 gap-y-4 flex-wrap'>

                      {cast && cast.map((cast, index) => {
                        return (
                          <div key={cast.imdb_code} className='flex items-center gap-4'>
                            {cast.url_small_image && <img className='w-10 h-10 rounded-full object-cover' src={cast.url_small_image}
                                 alt={cast.name}/> }
                            <span
                              className='text-sm opacity-70 text-white'>{cast.name} {cast.character_name && <>- {cast.character_name}</>}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className='mt-6 text-white text-xs lg:w-[80%]'>
                      {movie.description_full}
                    </div>
                </div>
            </Wrapper>
        </div>

    }
    {suggestionForView && suggestionForView.movies.length > 0 &&
        <div className='bg-black-2 py-5'>
            <Wrapper>
                <h2 className='text-light-gray text-2xl relative mb-10'>Рекомендуем также посмотреть</h2>


                <div className='list-movie-horizontal'>

                  {
                    <ListMovieHorizontal className='pb-8 pt-6'
                                         data={suggestionForView}
                    />
                  }

                </div>


            </Wrapper>
        </div>
    }
  </div>)
}