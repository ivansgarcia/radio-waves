import React from 'react'
import starIcon from '../../public/star.png';
import searchIcon from '../../public/search.png';
import topIcon from '../../public/top.png';
import Image from "next/image";

const Menu = ({ page, setPage }) => {
    return (
        <nav className="fixed z-20 w-full bottom-0 h-16 flex justify-around items-center bg-secondary">
            <button className={`${page === 'favs' && 'bg-selected'} p-4 w-full flex justify-center rounded-3xl`} onClick={() => setPage('favs')}>
                <Image src={starIcon} alt="favorites" width={25} height={25} />
            </button>
            <button className={`${page === 'search' && 'bg-selected'} p-4 w-full flex justify-center rounded-3xl`} onClick={() => setPage('search')}>
                <Image src={searchIcon} alt="search" width={25} height={25} />
            </button>
            <button className={`${page === 'top' && 'bg-selected'} p-4 w-full flex justify-center rounded-3xl`} onClick={() => setPage('top')}>
                <Image src={topIcon} alt="top" width={25} height={25} />
            </button>
        </nav>
    )
}

export default Menu