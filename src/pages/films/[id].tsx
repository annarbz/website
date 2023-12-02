import {MainLayout} from "@/components/layouts/Main";
import {GetServerSideProps, NextPage} from "next";
import {TFilmDetailPageProps} from "@/services/filmsPage/types";
import {gssp} from "@/services/filmsPage/gssp";
import {FilmsTemplate} from "@/components/templates/FilmsTemplate/FilmsTemplate";


const Page: NextPage<TFilmDetailPageProps> = (props) => {
  const {film, id} = props;
  return (
    <MainLayout>
      <FilmsTemplate id={id} data={film}/>
    </MainLayout>
  );
}


export const getServerSideProps: GetServerSideProps = gssp;

export default Page