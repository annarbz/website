import {MainLayout} from "@/components/layouts/Main";
import {GetServerSideProps, NextPage} from "next";
import {gssp} from "@/services/listPage/gssp";
import {TListPageProps} from "@/services/listPage/types";
import {ListPageTemplate} from "@/components/templates/ListPageTempate/ListPageTemplate";


const Page: NextPage<TListPageProps> = (props) => {
  const {filmList, page, size, genre, language, year, search} = props;
  return (
    <MainLayout>
      <ListPageTemplate initialData={filmList} page={page} size={size} genre={genre} languages={language} year={year} search={search}/>
    </MainLayout>
  );
}


export const getServerSideProps: GetServerSideProps = gssp;

export default Page