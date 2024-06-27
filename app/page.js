'use client';
import { useEffect, useState } from 'react';
import RadioPlayer from './components/RadioPlayer';
import Favorites from './components/Favorites';
import Menu from './components/Menu';
import Search from './components/Search';
import Top from './components/Top';
import Header from './components/Header';
import { AnimatePresence, easeOut, motion } from 'framer-motion';

export default function Home() {
    const [page, setPage] = useState();
    const [currentRadio, setCurrentRadio] = useState();

    const [favorites, setFavorites] = useState([]);

    const [pageDirection, setPageDirection] = useState();

    console.log('direction', pageDirection);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        favorites.length &&
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
        <main className="flex flex-col items-center">
            <Header />
            <div className="w-full md:hidden">
                <Menu page={page} setPage={setPage} />
                <AnimatePresence>
                    {page === 'favs' && (
                        <motion.div
                            animate={{ x: 0 }}
                            initial={{ x: '-100%' }}
                            transition={{ ease: 'easeOut' }}
                            exit={{ opacity: 0 }}
                            className="absolute top-20 w-full"
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
                            animate={{ x: 0 }}
                            initial={{ x: pageDirection }}
                            transition={{ ease: 'easeOut' }}
                            className="absolute top-20 w-full"
                            exit={{ opacity: 0 }}
                        >
                            <Search setCurrentRadio={setCurrentRadio} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {page === 'top' && (
                        <motion.div
                            animate={{ x: 0 }}
                            initial={{ x: '100%' }}
                            transition={{ ease: 'easeOut' }}
                            exit={{ opacity: 0 }}
                            className="absolute top-20 w-full"
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
                        className="w-full fixed bottom-0"
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
            <div className="hidden md:flex w-full">
                <section className="w-1/3 border-r-4 border-primary">
                    <Favorites
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setCurrentRadio={setCurrentRadio}
                        currentRadio={currentRadio}
                    />
                </section>
                {/* <hr className="w-2 h-screen bg-primary"></hr> */}
                <section className="w-full">
                <nav className="flex justify-end m-8 gap-8 text-3xl text-primary">
                    <button>Search</button>
                    <button>Top</button>
                </nav>
                    <Search setCurrentRadio={setCurrentRadio} />
                </section>
            </div>
        </main>
    );
}
