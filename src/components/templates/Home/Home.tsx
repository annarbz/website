import {SliderFilmContent} from "@/lib/api/types";
import HeroSlide from "@/components/common/HeroSlide/HeroSlide";
import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import {ListMovieHorizontalFetcher} from "@/components/common/ListMovieHorizontalFetcher/ListMovieHorizontalFetcher";

type Props = {
  homeFilmsContent: SliderFilmContent[]

};
export const Home = (props: Props) => {
  const {homeFilmsContent} = props;
  const filmSliders = homeFilmsContent.slice(1);
  console.log(homeFilmsContent[0]);
  return (
    <div className='home'>
      <HeroSlide movieList={homeFilmsContent[0]?.filmsResponse}/>
      <section className="about py-3">
        <Wrapper>
          <h1 className='text-light-gray text-xl'>Watch Movies Online Free</h1>
          <p className='text-light-gray text-xs sm:text-sm mt-2'><span className='text-white text-sm'>Movie
            <span className='text-dark-teal'>Flix</span></span> - Just a better place to watch movies online for free. It
            allows you to watch movies online in high quality for free. No registration is required. The content is
            updated daily with fast streaming servers, multi-language subtitles supported. Just open fmovies.to and
            watch your favorite movies, tv-shows. We have almost any movie, tv-shows you want to watch!</p>
          <p className='text-light-gray mt-2 text-xs sm:text-sm'>Please help us by sharing this site with your friends.
            Thanks!</p>
        </Wrapper>
      </section>
      {filmSliders.map((filmSlider, index) => (
        <ListMovieHorizontalFetcher sliderFilmContent={filmSlider} key={filmSlider.genre} showViewMore
                                    linkViewMore={`/list/?genre=${filmSlider.genre}`}/>
      ))}
    </div>
  )
}