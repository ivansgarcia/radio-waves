import React, { useState } from 'react';
import Favorites from './Favorites';
import Search from './Search';
import Top from './Top';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Presentation from './Presentation';

const BigLayout = ({
    favorites,
    setFavorites,
    currentRadio,
    setCurrentRadio,
}) => {
    const t = useTranslations('MainPage');

    const [page, setPage] = useState('search');

    return (
        <div className="hidden w-full pt-36 md:flex">
            <Presentation />
            <section className="h-min min-w-64 max-w-xs border-r-4 border-primary-darker pb-8 dark:border-primary">
                <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    setCurrentRadio={setCurrentRadio}
                    currentRadio={currentRadio}
                />
            </section>
            <section className="mx-auto px-8">
                <div className="p-6 text-center text-2xl text-text dark:text-dark-text">
                    {page === 'search' && <p>{t('search_help')}</p>}
                    {page === 'top' && <p>{t('top_help')}</p>}
                </div>
                <nav className="m-8 mb-4 ml-auto w-min text-3xl font-semibold text-primary-darker dark:text-primary">
                    <div className="ml-auto flex w-64">
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
                    <motion.div
                        layout
                        transition="spring"
                        className={`${page === 'search' ? 'mr-auto' : 'ml-auto'} my-2 h-1 w-1/2 bg-primary-darker dark:bg-primary`}
                    ></motion.div>
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
