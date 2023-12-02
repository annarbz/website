import React, {memo, useEffect, useState} from "react";
import Modal from "react-modal";
import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import Link from "next/link";
import {MdOutlineCloudDownload} from "react-icons/md";
import {FaStar} from "react-icons/fa";
import {CiCircleMore} from "react-icons/ci";
import {BiMoviePlay} from "react-icons/bi";
import {Movie} from "@/lib/api/types";
import {TorrentModal} from "@/components/common/TorrentModal/TorrentModal";
import {bespoleznie_texts} from "@/components/common/HeroSlide/components/Slide/constants";

interface SlideProps {
  movie: Movie,
  genres: string[] | null;
}

export const Slide = memo(({movie, genres}: SlideProps) => {


  // Настройки модалки для перехода на сайт
  const [appElement, setAppElement] = useState<HTMLElement | undefined>();
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'transparent',
      border: 'none'
    },
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const openMovie = () => {
    window.open(movie.url, '_blank')
    closeModal();
  }

  useEffect(() => {
    const el = document.getElementById("modals");
    if (el)
      setAppElement(el);
    console.log(el);
  }, [])
  // Настройки модалки для перехода на сайт - end

  const [torrentModalIsOpen, setTorrentModalIsOpen] = useState(false);

  const trimText = (text: string) => {
    const words = text.split(' ');
    return words.slice(0, 20).join(' ');
  };

  return (
    <>


      {appElement && <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          appElement={appElement}
          ariaHideApp={false}
          contentLabel="Show video"
      >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div
                      className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Предупреждение!
                      </h3>
                      <button type="button"
                              onClick={closeModal}
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              data-modal-hide="default-modal">
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                               fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                    strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span className="sr-only">Close modal</span>
                      </button>
                  </div>
                  <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          Вы будете переадресованы на другой вебсайт
                      </p>
                  </div>
                  <div
                      className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button data-modal-hide="default-modal" type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={openMovie}>
                          Полетели!
                      </button>
                      <button onClick={closeModal} data-modal-hide="default-modal" type="button"
                              className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                          Не не, никуда не пойду
                      </button>
                  </div>
              </div>
          </div>
      </Modal>
      }
      <div className={`hero-slide`} style={{backgroundImage: `url(${movie.background_image_original})`}}>
        <Wrapper className='h-full relative z-10'>
          <div className="slide-content w-full md:w-[65%] pr-6 ">
            <Link
              href={`/movies/${movie.id}`}
              className="movie-name duration-300 transition-colors hover:text-dark-teal text-3xl md:text-4xl  text-white font-bold  drop-shadow-lg block pr-6">
              {movie.title_long}
            </Link>
            <div className="movie-info flex items-start gap-2 sm:gap-4 md:gap-6 mt-2">
              {movie.torrents && movie.torrents.length > 0 && (
                <>
                  <TorrentModal modalIsOpen={torrentModalIsOpen} setIsOpen={setTorrentModalIsOpen}
                                torrents={movie.torrents}/>
                  <Link
                    href={`#`}
                    onClick={() => {
                      setTorrentModalIsOpen(true)
                    }}
                    className="quality px-3 py-0.5 flex items-center rounded bg-dark-teal font-medium text-white text-xl">
                    <MdOutlineCloudDownload/>
                  </Link>
                </>
              )}
              {movie.rating ? (
                <span className="rating flex  gap-1 text-white text-sm">
                                <FaStar size={16}/>{movie.rating.toFixed(1)}
                              </span>
              ) : (
                <span className="rating flex  gap-1 text-white text-sm">
                                <FaStar size={16}/>Оценок нет
                              </span>
              )}
              <div className="cate">
                {genres?.map(item => {
                  return (
                    <a
                      href={`/list/?genre=${item}`}
                      key={`${movie.imdb_code}-${item}`}
                      className='cates inline-block mr-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>
                      {item}
                    </a>
                  )
                })}
              </div>
            </div>
            <div className="movie-desc hidden  sm:block mt-4 text-white/50 font-thin text-sm">
              {trimText(movie.synopsis.length ? movie.synopsis : bespoleznie_texts[movie.id % 15])}
            </div>
            <div className="buttons mt-8 flex gap-6">
              <Link
                href={`/films/${movie.id}`}
                className="watch-btn banner-btn  border-dark-teal text-dark-teal  hover:bg-dark-teal hover:text-white ">
                <CiCircleMore size={20}/> Узнать больше
              </Link>
              <button
                onClick={openModal}
                className="add-btn banner-btn  border-white/50 text-white/50 hover:bg-white hover:text-black">
                <BiMoviePlay size={16}/> Смотреть онлайн
              </button>
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  )
})