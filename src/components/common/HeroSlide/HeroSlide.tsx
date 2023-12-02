import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import {useFilmList} from "@/lib/hooks/useFilmList";
import {MovieList} from "@/lib/api/types";
import {Slide} from "@/components/common/HeroSlide/components/Slide/Slide";
import {Autoplay, Navigation, Pagination,} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

type Props = {
  movieList?: MovieList;
}


const HeroSlide = ({movieList}: Props) => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const {filmList, isLoading, updateFilmList} = useFilmList(
    {currentPage: String(page), pageSize: String(pageSize), defaultValue: movieList}
);

  useEffect(() => {
    updateFilmList();
  }, [page, pageSize])


  return (
    <div className="hero-box">
      <Swiper
        slidesPerView={1}
        modules={[Pagination, Navigation, Autoplay]}
        pagination={true}
        autoplay={
          {
            delay: 5000,
          }
        }

      >
        {
          filmList?.data?.movies.map(movie => {
            let genres: string[] | null = movie.genres ?? null;
            return (
              <SwiperSlide key={`${movie.id}-${movie.title}`}>
                <Slide movie={movie} genres={genres}/>
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    </div>
  )
}


export default HeroSlide