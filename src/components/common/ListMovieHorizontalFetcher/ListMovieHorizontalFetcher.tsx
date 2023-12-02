import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import ListMovieHorizontal from "@/components/common/ListMoveHorizontal/ListMovieHorizontal";
import {SliderFilmContent} from "@/lib/api/types";
import {useEffect, useState} from "react";
import {useFilmList} from "@/lib/hooks/useFilmList";
import Link from "next/link";

type Props = {
  sliderFilmContent: SliderFilmContent,
  showViewMore?: boolean,
  linkViewMore?: string,
}
export const ListMovieHorizontalFetcher = ({sliderFilmContent, showViewMore = false, linkViewMore = "#"}: Props) => {
  const {genre, text, filmsResponse} = sliderFilmContent;

  const [page, setPage] = useState(1);
  const pageSize = 20;
  const {filmList, isLoading, updateFilmList} = useFilmList({
    currentPage: String(page),
    pageSize: String(pageSize),
    defaultValue: filmsResponse,
    genre: genre
  });

  useEffect(() => {
    updateFilmList();
  }, [page, pageSize])


  return (
    <section>
      <Wrapper>
        <h2
          className='text-light-gray mb-4 py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40 flex justify-between'>
          {text}
          {showViewMore && <Link className="view-more ml-auto text-sm" href={linkViewMore}> View more →</Link>}
        </h2>
        {
          filmList && filmList?.data ? <ListMovieHorizontal className='pb-8 pt-6' data={filmList.data || []}/> : null
        }
      </Wrapper>

    </section>
  )
}