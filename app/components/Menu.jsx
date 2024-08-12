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
        <nav className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-around bg-gradient-to-t from-primary to-primary-darker/75 transition-colors duration-300 md:hidden">
            <div
                className={`${selectorPosition[page]} pointer-events-none absolute flex h-full w-full`}
            >
                <motion.div
                    layout
                    className="z-30 h-full w-1/3 rounded-3xl bg-secondary dark:bg-dark-selected"
                ></motion.div>
            </div>
            <button
                className={`flex w-1/3 justify-center rounded-3xl`}
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
                className={`flex w-1/3 justify-center rounded-3xl`}
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
                className={`flex w-1/3 justify-center rounded-3xl`}
                onClick={() => {
                    setPage('top');
                    window.scrollTo(0, 0);
                }}
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
