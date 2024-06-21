'use client';
import { useEffect, useState } from 'react';
import RadioPlayer from './components/RadioPlayer';
import Favorites from './components/Favorites';
import Menu from './components/Menu';
import Search from './components/Search';
import Top from "./components/Top";

export default function Home() {
    const [page, setPage] = useState('search');
    const [currentRadio, setCurrentRadio] = useState();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        favorites.length &&
            localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const loadFavorites = () => {
        const loadedFavorites = JSON.parse(localStorage.getItem('favorites'));
        console.log(loadedFavorites);
        setFavorites(loadedFavorites);
    };

    return (
        <main className="min-h-screen bg-slate-500 pt-24 flex flex-col items-center">
            <Menu page={page} setPage={setPage} />
            {page === 'favs' && (
                <section>
                    <Favorites
                        favorites={favorites}
                        setCurrentRadio={setCurrentRadio}
                    />
                </section>
            )}
            {page === 'search' && (
                <section className="flex flex-col gap-8 items-center flex-1">
                    <h1 className="text-4xl">Radio Stations</h1>
                    <Search setCurrentRadio={setCurrentRadio} />
                </section>
            )}
            {page === 'top' && (
                <Top setCurrentRadio={setCurrentRadio}/>
            )}
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
