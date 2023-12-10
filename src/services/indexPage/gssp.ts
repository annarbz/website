import {GetServerSidePropsContext} from "next";
import {filmListQuery} from "@/lib/api";
import {Genre, SliderFilmContent} from "@/lib/api/types";

export const gssp = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const page = ctx.query.page as string ?? "1";
  const pageSize = ctx.query.size as string ?? "10";

  // Жанры используемые на index page
  const homeGenres: { genre: Genre, text: string }[] = [ // Обьявляем список всех жанров на главной странице
    {
      genre: "",
      text: ""
    },
    {
      genre: "Drama",
      text: "Драма"
    },
    {
      genre: "Comedy",
      text: "Комедия"
    },

    {
      genre: "Fantasy",
      text: "Фентези"
    },
    {
      genre: "Horror",
      text: "Хоррор"
    },
  ]
  // через цикл получаем массив слайдеров, который будет использоваться на главной странице
  const homeFilmsContent: SliderFilmContent[] = await Promise.all(homeGenres.map(async genre => {
    const filmData = await filmListQuery(page, pageSize, genre.genre);
    return {
      genre: genre.genre,
      text: genre.text,
      filmsResponse: filmData.data,
    }
  }))


  return { // Возвращаем props на /pages/index.tsx
    props: {
      homeFilmsContent,
    },
  }
}
