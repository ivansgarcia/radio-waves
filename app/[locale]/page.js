'use client';
import { useEffect, useState } from 'react';
import RadioPlayer from '../components/radio-player/RadioPlayer';
import Favorites from '../components/Favorites';
import Menu from '../components/Menu';
import Search from '../components/Search';
import Top from '../components/Top';
import Header from '../components/Header';
import { AnimatePresence, motion } from 'framer-motion';
import BigLayout from '../components/BigLayout';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import SlidingText from '../components/SlidingText';
import Image from 'next/image';
import backgroundDarkImage from '../../public/background_dark.jpg';
import backgroundImage from '../../public/background.jpg';

export default function Home() {
    const t = useTranslations('MainPage');

    const [page, setPage] = useState();
    const [currentRadio, setCurrentRadio] = useState();

    const [favorites, setFavorites] = useState();

    const [pageDirection, setPageDirection] = useState();

    const { theme } = useTheme();

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        favorites?.length &&
            localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        page === 'favs' && setPageDirection('100%');
        page === 'top' && setPageDirection('-100%');
    }, [page]);

    const loadFavorites = async () => {
        const loadedFavorites =
            (await JSON.parse(localStorage.getItem('favorites'))) ?? [];
        loadedFavorites?.length ? setPage('favs') : setPage('search');
        setFavorites(loadedFavorites);
    };

    return (
        <main
            className={`relative flex h-full min-h-screen flex-col items-center overflow-hidden`}
        >
            <Image
                src={theme === 'dark' ? backgroundDarkImage : backgroundImage}
                alt="background"
                fill
                className="-z-50 object-cover"
            />
            <Header />
            <SlidingText />
            <div className="w-full pt-12 md:hidden">
                <Menu page={page} setPage={setPage} />
                <AnimatePresence>
                    {page === 'favs' && (
                        <motion.div
                            animate={{ x: 0, position: 'relative' }}
                            initial={{ x: '-100%' }}
                            transition={{ ease: 'easeOut' }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            className="absolute top-10 w-full"
                        >
                            <Favorites
                                favorites={favorites}
                                setFavorites={setFavorites}
                                setCurrentRadio={setCurrentRadio}
                                currentRadio={currentRadio}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {page === 'search' && (
                        <motion.div
                            animate={{ x: 0, position: 'relative' }}
                            initial={{ x: pageDirection }}
                            transition={{ ease: 'easeOut' }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            className="absolute top-10 z-40 w-full"
                        >
                            <Search setCurrentRadio={setCurrentRadio} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {page === 'top' && (
                        <motion.div
                            animate={{ x: 0, position: 'relative' }}
                            initial={{ x: '100%' }}
                            transition={{ ease: 'easeOut' }}
                            exit={{ opacity: 0, position: 'absolute' }}
                            className="absolute top-10 w-full"
                        >
                            <Top setCurrentRadio={setCurrentRadio} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {currentRadio && (
                    <motion.div
                        animate={{ y: 0 }}
                        initial={{ y: '100%' }}
                        exit={{ y: '100%' }}
                        transition={{ ease: 'easeOut' }}
                        className="fixed bottom-0 z-40 w-full"
                    >
                        <RadioPlayer
                            radio={currentRadio}
                            favorites={favorites}
                            setFavorites={setFavorites}
                            setCurrentRadio={setCurrentRadio}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            <BigLayout
                favorites={favorites}
                setFavorites={setFavorites}
                currentRadio={currentRadio}
                setCurrentRadio={setCurrentRadio}
            />
        </main>
    );
}
