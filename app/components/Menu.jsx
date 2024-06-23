import React from 'react'
import starIcon from '../../public/star.png';
import searchIcon from '../../public/search.png';
import topIcon from '../../public/top.png';
import Image from "next/image";

const Menu = ({ page, setPage }) => {
    return (
        <nav className="fixed w-full bottom-0 flex justify-around items-center bg-slate-400">
            <button className={`${page === 'favs' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('favs')}>
                <Image src={starIcon} alt="favorites" width={25} height={25} />
            </button>
            <button className={`${page === 'search' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('search')}>
                <Image src={searchIcon} alt="search" width={25} height={25} />
            </button>
            <button className={`${page === 'top' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('top')}>
                <Image src={topIcon} alt="top" width={25} height={25} />
            </button>
        </nav>
    )
}

export default Menu