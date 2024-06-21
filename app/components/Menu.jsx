import React from 'react'
import starIcon from '../../public/star.png';
import searchIcon from '../../public/search.png';
import topIcon from '../../public/top.png';
import Image from "next/image";

const Menu = ({ page, setPage }) => {
    return (
        <nav className="fixed w-full top-0 flex justify-around items-center bg-slate-400">
            <div className={`${page === 'favs' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('favs')}>
                <Image src={starIcon} alt="favorites" width={25} height={25} />
            </div>
            <div className={`${page === 'search' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('search')}>
                <Image src={searchIcon} alt="search" width={25} height={25} />
            </div>
            <div className={`${page === 'top' && 'bg-slate-200'} p-4 w-full flex justify-center`} onClick={() => setPage('top')}>
                <Image src={topIcon} alt="top" width={25} height={25} />
            </div>
        </nav>
    )
}

export default Menu