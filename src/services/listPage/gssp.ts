import {GetServerSidePropsContext} from "next";
import {filmListQuery} from "@/lib/api";
import {Genre} from "@/lib/api/types";

export const gssp = async (ctx: GetServerSidePropsContext) => {
  const page = ctx.query.page as string ?? '1';
  const pageSize = ctx.query.size as string ?? "30";
  const genre = ctx.query.genre as Genre ?? "";
  const search = ctx.query.search as string ?? "";
  const language = ctx.query.language as string ?? "";
  const year = ctx.query.year as string ?? "";
  const {data} = await filmListQuery(page, pageSize, genre, search, language, year);

  return {
    props: {
      filmList: data,
      page: Number(page),
      size: pageSize,
      genre,
      search,
      language,
      year,
    },
  }
}
