import {MainLayout} from "@/components/layouts/Main";
import {GetServerSideProps, NextPage} from "next";
import {gssp} from "@/services/indexPage/gssp";
import {TIndexPageProps} from "@/services/indexPage/types";
import {Home} from "@/components/templates/Home/Home";

// Получаем пропсы переданные с gssp
const Page: NextPage<TIndexPageProps> = (props) => {
  const {homeFilmsContent} = props;
  return (
    <MainLayout>
      <Home homeFilmsContent={homeFilmsContent}/>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = gssp;

export default Page;
