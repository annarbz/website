import {FilterData} from "@/components/common/FilterBar/types";
import {useEffect, useMemo, useState} from "react";
import {FaCalendarAlt, FaFilter, FaFolderOpen, FaGlobeAmericas} from "react-icons/fa";
import Dropdown, {DropItem, DropItemSimple} from "@/components/common/Dropdown/Dropdown";
import {genres} from "@/lib/api/constants";

type Props = {
  searchParams: FilterData;
  onFilter?: (data: FilterData) => void
}
export const FilterBar = ({onFilter, searchParams}: Props) => {
  const [filterData, setFilterData] = useState<FilterData>({
    genres: [],
    languages: [],
    year: ""
  })


  let genresSelectedString = useMemo(() => {
    if (filterData.genres.length === 0) return 'All'
    if (filterData.genres.length > 1) return `${filterData.genres.length} selected`
    return filterData.genres[0];

  }, [filterData.genres])

  let languagesSelectedString = useMemo(() => {
    if (filterData.languages.length === 0) return 'All'
    if (filterData.languages.length > 1) return `${filterData.languages.length} selected`
    return filterData.languages[0];
  }, [filterData])

  let yearSelectedString = useMemo(() => {
    return filterData.year !== "" ? filterData.year : "All"
  }, [filterData.year])


  useEffect(() => {
    let data: FilterData = {
      genres: [],
      languages: [],
      year: ""
    }

    data.genres = searchParams.genres;
    data.languages = searchParams.languages;
    data.year = searchParams.year || "";
    setFilterData(data)

  }, [searchParams])

  //* handle select year
  const handleSelectYear = (checked: boolean, value: string) => {
    let data = filterData
    if (checked) data.year = value
    setFilterData({...data})
  }

  //* handle select languages and genres
  const createHandleSelect = (type: "languages" | "genres") => {
    return (checked: boolean, value: string) => {
      let data = {...filterData}
      if (checked) {
        data[type].push(value)
        setFilterData({...filterData})
      } else {
        data[type].splice(data[type].indexOf(value), 1)
        setFilterData({...filterData})
      }
    }
  }


  //* render list item
  const renderGenre = () => {
    return genres.map(genre => {
      return <DropItem name={genre} value={genre} check={filterData.genres.includes(genre + "")}
                       onChangeEvent={createHandleSelect("genres")} id={`check-${genre}`}
                       key={genre}/>
    })
  }

  const renderCountry = () => {
    return ['russian', 'english'].map(data => {
      return <DropItem name={data} value={data}
                       check={filterData.languages.includes(data)} id={`check-${data}`}
                       key={data} onChangeEvent={createHandleSelect("languages")}/>
    })
  }

  const renderYear = () => {
    let el: React.ReactElement[] = [<DropItemSimple name={"All"} check={filterData.year === ""} value={""}
                                                    id={`check-all`} key={`all`} onChangeEvent={handleSelectYear}/>]
    const now = new Date()
    let currentYears = now.getFullYear()
    for (let index = currentYears; index >= currentYears - 12; index--) {
      el.push(<DropItemSimple name={index + ""} check={filterData.year === index + ""} value={index + ""}
                              id={`check-${index.toString()}`} key={index.toString()}
                              onChangeEvent={handleSelectYear}/>)
    }

    return el
  }


  return (
    <div className='mt-6 flex items-center flex-wrap xs:flex-nowrap gap-2'>

      <Dropdown grid key={1} selected={genresSelectedString} buttonIcon={<FaFolderOpen className='text-sm'/>}
                title='Genre' renderItems={renderGenre}/>
      <Dropdown grid key={2} selected={languagesSelectedString} dropContentClassName='languages-drop'
                buttonIcon={<FaGlobeAmericas className='text-sm'/>} title='Languages' renderItems={renderCountry}/>
      <Dropdown key={3} selected={yearSelectedString} buttonIcon={<FaCalendarAlt className='text-sm'/>} title='Years'
                renderItems={renderYear}/>
      <button onClick={() => onFilter && onFilter(filterData)}
              className=' w-[48%] xs:w-auto px-2 py-1.5 hover:opacity-75 cursor-pointer transition-opacity duration-300 h-full font-light text-sm gap-x-1 flex justify-center items-center bg-dark-teal rounded'>
        <FaFilter className='text-base'/>Filter
      </button>
    </div>
  )
}
