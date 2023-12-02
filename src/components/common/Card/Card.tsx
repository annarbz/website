import React from 'react'
import {AiTwotoneStar} from 'react-icons/ai'
import classNames from 'classnames'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import {Movie} from "@/lib/api/types";
import Link from "next/link";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {CiCircleMore} from "react-icons/ci";


type Props = {
  data: Movie,
  size?: "normal" | "large"
}


const Card = ({data, size = 'large'}: Props) => {


  const name = data.title;
  const year = data.year


  return (
    <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden rounded-xl w-44">
      <Link
        href={`/films/${data.id}`}
        className='w-full block h-full'>
        <div className={classNames(`list__card-content group`, {
          'h-60': size === 'normal',
          'h-[280px]': size === 'large'
        })}>
          <LazyLoadImage
            wrapperClassName='w-full h-full block'
            loading='lazy'
            className='w-full h-full block object-cover'
            alt={data.title_english}
            srcSet={`${data.medium_cover_image} 300w`}
          />

          <div className='absolute bottom-0  py-3 left-0 w-full px-3  z-[6]'>
            <div
              className='text-white block font-light text-[14px] hover:text-dark-teal transition-colors duration-300'>{name}</div>
            <div className='flex items-end  text-light-gray text-xs'>
              <span>{year ? year : "N/A"}</span>
              <span className='flex items-center ml-2 text-[10px] gap-[2px]'><AiTwotoneStar
                className='text-sm'/>{data.rating ? data.rating.toFixed(1) : "Рейтинга нет"}</span>
            </div>
          </div>
          <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white rounded-full text-dark-teal
                        text-[36px] flex z-[6] scale-50 opacity-0
                        group-hover:opacity-100 group-hover:scale-100 transition-all duration-300'>
            <CiCircleMore/></div>
        </div>
      </Link>
    </div>

  )
}

export default Card