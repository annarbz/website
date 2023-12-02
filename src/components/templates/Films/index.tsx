import {useFilmList} from "@/lib/hooks/useFilmList";
import {useEffect, useState} from "react";
import Pagination from "../../common/Pagination/Pagination";
import Film from "./Film/Film";
import * as Style from "./index.styled";
import HeroSlide from "@/components/common/HeroSlide/HeroSlide";
import {MovieList} from "@/lib/api/types";

const Films = ({movieList}: { movieList?: MovieList }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const {filmList, isLoading, updateFilmList} = useFilmList({
    currentPage: String(page),
    pageSize: String(pageSize),
    defaultValue: movieList
  });

  useEffect(() => {
    updateFilmList();
  }, [page, pageSize])

  const filmsList = filmList?.data?.movies.map((film) => {
    return <Film key={film.id} {...film}></Film>;
  });

  if (isLoading) {
    return;
  }
  return filmList ? (
    <Style.Films>
      <Style.Content>
        <Style.Title onClick={updateFilmList}>Films</Style.Title>
        <HeroSlide/>

        <Style.List>{filmsList}</Style.List>
        <Pagination
          totalUsersCount={filmList?.data?.movie_count ?? 1}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={(page) => setPage(page)}
        />
      </Style.Content>
    </Style.Films>
  ) : null;
};

export default Films;
