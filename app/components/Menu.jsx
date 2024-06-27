import React from 'react';
import starIcon from '../../public/star.png';
import searchIcon from '../../public/search.png';
import topIcon from '../../public/top.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Menu = ({ page, setPage }) => {
    const selectorPosition = {
        favs: 'justify-start',
        search: 'justify-center',
        top: 'justify-end',
    };

    return (
        <nav className="md:hidden fixed z-20 w-full bottom-0 left-0 h-12 flex justify-around items-center bg-secondary">
            <div className={`${selectorPosition[page]} pointer-events-none absolute w-full h-full flex`}>
                <motion.div
                    layout
                    className="w-1/3 h-full rounded-3xl bg-selected z-30"
                ></motion.div>
            </div>
            <button
                className={` w-1/3 flex justify-center rounded-3xl`}
                onClick={() => setPage('favs')}
            >
                <Image
                    className="z-40"
                    src={starIcon}
                    alt="favorites"
                    width={25}
                    height={25}
                />
            </button>
            <button
                className={` w-1/3 flex justify-center rounded-3xl`}
                onClick={() => setPage('search')}
            >
                <Image
                    className="z-40"
                    src={searchIcon}
                    alt="search"
                    width={25}
                    height={25}
                />
            </button>
            <button
                className={`w-1/3 flex justify-center rounded-3xl`}
                onClick={() => setPage('top')}
            >
                <Image
                    className="z-40"
                    src={topIcon}
                    alt="top"
                    width={25}
                    height={25}
                />
            </button>
        </nav>
    );
};

export default Menu;
