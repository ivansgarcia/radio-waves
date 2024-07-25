import React, { useState } from 'react';
import Favorites from './Favorites';
import Search from './Search';
import Top from './Top';
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const BigLayout = ({
    favorites,
    setFavorites,
    currentRadio,
    setCurrentRadio,
}) => {

    const t = useTranslations('MainPage');

    const [page, setPage] = useState('search');

    return (
        <div className="hidden md:flex w-full pt-10">
            <section className="border-r-4 border-primary-darker dark:border-primary h-min pb-8 max-w-xs">
                <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    setCurrentRadio={setCurrentRadio}
                    currentRadio={currentRadio}
                />
            </section>
            <section className="w-2/3 mx-8">
                <nav className="m-8 ml-auto font-semibold w-min text-3xl text-primary-darker dark:text-primary">
                    <div className="flex w-64 ml-auto">
                        <button
                            onClick={() => page === 'top' && setPage('search')}
                            className={`${page === 'top' && 'text-selected'} w-1/2 text-center`}
                        >
                            {t('search')}
                        </button>
                        <button
                            onClick={() => page === 'search' && setPage('top')}
                            className={`${page === 'search' && 'text-selected'} w-1/2 text-center`}
                        >
                            {t('top')}
                        </button>
                    </div>
                    <motion.div layout transition="spring" className={`${page === 'search' ? 'mr-auto' : 'ml-auto'} h-1 my-2 w-1/2 bg-primary-darker dark:bg-primary`}></motion.div>
                </nav>
                {page === 'search' && (
                    <Search setCurrentRadio={setCurrentRadio} />
                )}
                {page === 'top' && <Top setCurrentRadio={setCurrentRadio} />}
            </section>
        </div>
    );
};

export default BigLayout;
