import classNames from 'classnames'
import React, {memo, useRef} from 'react'
import {Swiper, SwiperRef, SwiperSlide} from 'swiper/react'
import Card from '../Card/Card'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {MovieList} from '@/lib/api/types'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/scrollbar'
import {Swiper as SwiperClass} from "swiper/types";
import {Navigation, Pagination} from "swiper/modules";


type Props = {
  className?: string
  data: MovieList
  skeleton?: boolean
}

const ListMovieHorizontal = memo((props: Props) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null)
  const navigationNextRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperRef | null>(null)

  const handleSlideChange = (swiper: SwiperClass) => {
    if (!swiperRef.current || !navigationNextRef.current || !navigationPrevRef.current) return

    if (swiper.isBeginning) {
      navigationPrevRef.current?.classList.remove('active')
    } else {
      navigationPrevRef.current.classList.add('active')
    }

    if (swiper.activeIndex === swiper.slides.length - 2) {
      navigationNextRef.current.classList.remove('active')
    } else {
      navigationNextRef.current.classList.add('active')
    }
  }

  return (
    <Swiper
      slidesPerView="auto"
      modules={[Navigation, Pagination]}
      pagination={{
        dynamicBullets: true,
      }}
      spaceBetween={16}
      className={classNames(props.className)}

      onSlideChange={handleSlideChange}
      ref={swiperRef}
    >
      {!props.skeleton &&
        props.data?.movies.map((movie, index) => {
          if (!movie.title) return null
          return (
            <SwiperSlide className="w-44 self-stretch pb-10" key={movie.id.toString() + `-${Math.random()}`}
                         style={{width: 'auto'}}>
              <Card size="normal" data={movie}/>
            </SwiperSlide>
          )
        })}
      <div
        ref={navigationNextRef}
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="absolute w-28 h-28 bg-black/30 pl-1 [&.active]:flex hover:bg-black transition duration-300 rounded-full translate-x-[65%] hidden active justify-start items-center cursor-pointer top-2/4 right-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
      >
        <MdKeyboardArrowRight/>
      </div>
      <div
        ref={navigationPrevRef}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="absolute w-28 h-28 bg-black/30 pr-1 [&.active]:flex hover:bg-black transition duration-300 rounded-full -translate-x-[65%] hidden  justify-end items-center cursor-pointer top-2/4 left-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl"
      >
        <MdKeyboardArrowLeft/>
      </div>
    </Swiper>
  )
})

export default ListMovieHorizontal