import {GetServerSidePropsContext} from "next";
import {filmRetrieveQuery} from "@/lib/api";

export const gssp = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id as string;
  const data = await filmRetrieveQuery(id)

  return {
    props: {
      film: data,
      id,
    },
  }
}
