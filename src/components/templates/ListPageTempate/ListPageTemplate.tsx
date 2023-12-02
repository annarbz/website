import {Genre, MovieList} from "@/lib/api/types";
import {useEffect, useRef, useState} from "react";
import {useFilmList} from "@/lib/hooks/useFilmList";
import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import {SkeletonCard} from "@/components/common/SkeletonCard/SceletonCard";
import Card from "@/components/common/Card/Card";
import cn from "classnames";
import {FilterBar} from "@/components/common/FilterBar/FilterBar";
import {FilterData} from "@/components/common/FilterBar/types";

type Props = {
  page?: number;
  size?: number;
  initialData?: MovieList;
  genre?: Genre;
  languages?: string,
  year?: string,
  search?: string
}
export const ListPageTemplate = ({initialData, genre, languages, year, size = 30, page: currentPage = 1}: Props) => {
  const [page, setPage] = useState(currentPage);

  const [showingPagesPagination, setShowingPagesPagination] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useState<FilterData>({
    genres: genre ? [genre] : [],
    languages: languages ? [languages] : [],
    year: year ? year : ''
  })
  const [totalPages, setTotalPages] = useState(currentPage);
  const searchRef = useRef<HTMLInputElement>(null)

  const pageSize = size;
  const {filmList, isLoading, updateFilmList} = useFilmList({
    currentPage: String(page),
    pageSize: String(pageSize),
    defaultValue: initialData,
    genre: searchParams.genres,
    language: searchParams.languages[0],
    year: searchParams.year,
    search: searchRef?.current?.value ?? '',
  });
  useEffect(() => {
    updateFilmList();

    const movieCount = filmList?.data.movie_count ?? pageSize;
    setTotalPages(Number((movieCount / pageSize).toFixed(0)));
    setShowingPagesPagination(getPageNumbers())
    updateQueryParams();
  }, [page, pageSize, searchParams])


  const updateQueryParams = () => {
    try {
      // @ts-ignore
      const url = new URL(location);
      if (searchRef?.current?.value) url.searchParams.set("search", searchRef?.current?.value);
      else url.searchParams.delete("search");
      if (searchParams.genres[0]) url.searchParams.set("genre", searchParams.genres[0]);
      else url.searchParams.delete("genre");
      if (searchParams.languages[0]) url.searchParams.set("language", searchParams.languages[0]);
      else url.searchParams.delete("language");
      if (searchParams.year) url.searchParams.set("year", searchParams.year);
      else url.searchParams.delete("year");
      if (page) url.searchParams.set("page", String(page));
      else url.searchParams.delete("page");
      if (pageSize) url.searchParams.set("size", String(pageSize));
      else url.searchParams.delete("size");
      // @ts-ignore
      if (history.pushState) {
        window.history.pushState({}, "", url);
      } else {
        window.history.replaceState({}, "", url);
        // ** It seems that current browsers other than Safari don't support pushState
        // title attribute. We can achieve the same thing by setting it in JS.
        document.title = "Title";
      }
    } catch (e) {
      console.error(e);
    }
  }
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 10; // Максимальное количество отображаемых номеров страниц
    const halfMaxPageNumbers = Math.floor(maxPageNumbers / 2) < 5 ? Math.floor(maxPageNumbers / 2) : 5;
    let startPageNumber = page - halfMaxPageNumbers;
    let endPageNumber = page + halfMaxPageNumbers;

    if (startPageNumber <= 0) {
      startPageNumber = 1;
      endPageNumber = maxPageNumbers;
    }

    if (endPageNumber > totalPages) {
      endPageNumber = totalPages;
      startPageNumber = totalPages - maxPageNumbers + 1;
      if (startPageNumber <= 0) {
        startPageNumber = 1;
      }
    }

    for (let i = startPageNumber; i <= endPageNumber; i++) {
      pageNumbers.push(i
      );
    }
    return pageNumbers;
  };
  const handlePreviousPage = () => {
    setPage(prevState => prevState - 1);
  }

  const handleNextPage = () => {
    setPage(prevState => prevState + 1);
  }


  const handleOnFilter = (data: FilterData) => {
    setSearchParams(data);
  }


  return (
    <div className='pt-20 pb-12 bg-black-2 w-full'>
      <section className='top-rated py-6 bg-black-2'>
        <Wrapper>
          <h2
            className='text-light-gray capitalize py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
            List Movie
          </h2>

          <label htmlFor="search"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Search </label>
          <input type="text" id="search"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Search" ref={searchRef}/>

          <FilterBar searchParams={searchParams} onFilter={handleOnFilter}/>

          <div
            className='grid gap-y-8 gap-x-4 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 mt-8'>

            {
              isLoading || !filmList || !filmList?.data?.movies || filmList?.data?.movies.length === 0 ? new Array(14).fill(0).map((_, index) => {
                  return (
                    <SkeletonCard key={index.toString() + "all"}/>
                  )
                }) :
                filmList.data.movies.map((item, index) => {
                  return (
                    <Card data={item} key={item.id}/>
                  )
                })
            }
          </div>


          {filmList ?
            <>
              <nav aria-label="Page navigation example" className='flex'>
                <ul className="inline-flex -space-x-px text-sm mt-10 mx-[auto]">
                  {page > 1 && <li>
                      <span
                          onClick={handlePreviousPage}
                          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                          Previous
                      </span>
                  </li>
                  }

                  {/* Отображение номеров страниц */}
                  {showingPagesPagination.map((num) => (
                    <li key={num}>
                      <span
                        onClick={() => setPage(num)}
                        style={{}}
                        className={cn(`flex items-center cursor-pointer justify-center px-3 h-8 leading-tight text-gray-500  border border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white `,
                          {'bg-gray-800  hover:bg-gray-700': page !== num + 1},
                          {'bg-dark-teal': page !== num})}
                      >
                        {num}
                      </span>
                    </li>
                  ))}

                  {page < totalPages && totalPages > 1 &&
                      <li>
                          <span
                              onClick={handleNextPage}
                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          >
                              Next
                          </span>
                      </li>
                  }
                </ul>
              </nav>
            </>
            : null}

        </Wrapper>
      </section>
    </div>
  )
}