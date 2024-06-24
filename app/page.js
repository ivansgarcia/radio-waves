'use client';
import { useEffect, useState } from 'react';
import RadioPlayer from './components/RadioPlayer';
import Favorites from './components/Favorites';
import Menu from './components/Menu';
import Search from './components/Search';
import Top from './components/Top';
import Header from './components/Header';

export default function Home() {
    const [page, setPage] = useState();
    const [currentRadio, setCurrentRadio] = useState();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        favorites.length &&
            localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const loadFavorites = async () => {
        const loadedFavorites =
            (await JSON.parse(localStorage.getItem('favorites'))) ?? [];
        loadedFavorites?.length ? setPage('favs') : setPage('search');
        setFavorites(loadedFavorites);
    };

    return (
        <main className="min-h-screen bg-dark flex flex-col items-center">
            <Header />
            <Menu page={page} setPage={setPage} />
            {page === 'favs' && (
                <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    setCurrentRadio={setCurrentRadio}
                />
            )}
            {page === 'search' && <Search setCurrentRadio={setCurrentRadio} />}
            {page === 'top' && <Top setCurrentRadio={setCurrentRadio} />}
            {currentRadio && (
                <div className="w-full fixed bottom-0">
                    <RadioPlayer
                        radio={currentRadio}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setCurrentRadio={setCurrentRadio}
                    />
                </div>
            )}
        </main>
    );
}
