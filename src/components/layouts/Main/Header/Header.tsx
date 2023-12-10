import React, {useEffect, useRef, useState} from "react";
import cn from "classnames";
import Wrapper from "@/components/layouts/Wrapper/Wrapper";
import {HiBars3BottomLeft} from "react-icons/hi2";
import Link from "next/link";
import {IoMdClose} from "react-icons/io";
import {AiOutlineSearch} from "react-icons/ai";

type HeaderProps = {
  switchTheme: () => void;
};
const Header: React.FC<HeaderProps> = (props) => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const navRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (navRef.current && navRef.current.contains(event.target)) return
      setShowNav(false)
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  const listIsActive = false;
  return (
    <header className={cn('header py-3 absolute top-0 left-0 w-full z-10 md:z-[6]')}>
      <Wrapper className='flex flex-row  items-center'>
        <button className='btn-bars text-4xl text-white mr-4 inline-block md:hidden duration-300 transition-colors hover:text-dark-teal' onClick={(event) => { event.stopPropagation(); setShowNav(true) }}><HiBars3BottomLeft /></button>
        <nav ref={navRef} className={cn('menu', { active: showNav })}>
          <button className='absolute cursor-pointer z-30 right-4 top-4 text-white text-3xl hover:text-dark-teal transition-colors duration-300 md:hidden' onClick={() => setShowNav(false)}><IoMdClose /></button>
          <Link href={"/"} className={cn("menu-items", { active: !listIsActive })} onClick={() => setShowNav(false)}>Home</Link>
          <Link href={"/list"} className={cn("menu-items", { active: listIsActive })} onClick={() => setShowNav(false)}>Movies</Link>
        </nav>
        <Link href='/list' className="search-box group ml-auto w-9 h-9 rounded-full flex justify-center items-center transition duration-300 ease-in-out hover:bg-white bg-white/10">
          <AiOutlineSearch size={20} className='text-white/50 group-hover:text-gray-500' />
        </Link>


      </Wrapper>
    </header>
  );
};
export default Header;
