import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import starIcon from '../../public/star.png';
import removeIcon from '../../public/star_cross.png';

const Favorites = ({ favorites, setFavorites, setCurrentRadio }) => {
    const removeFromFavorites = (radio) => {
        const newFavorites = favorites.filter((fav) => fav !== radio);
        setFavorites(newFavorites);
    };

    return (
        <section className="flex flex-col w-full gap-8 p-8">
            <div className="flex items-start">
                <Image
                    className="-mr-12 opacity-30 -rotate-12"
                    src={starIcon}
                    alt="favorites"
                    width={75}
                    height={75}
                />
                <h3 className="m-4 text-4xl font-semibold text-primary">
                    Favorites
                </h3>
            </div>
            <ul className="flex flex-col gap-4 w-4/5 mx-auto">
                {favorites?.map((fav, index) => (
                    <li
                        className="bg-secondary text-text w-full justify-around rounded-3xl flex items-center"
                        key={index}
                    >
                        <button
                            className="flex items-center gap-4 w-full p-4"
                            onClick={() => setCurrentRadio(fav)}
                        >
                            <img
                                className="rounded-full"
                                src={fav.favicon ? fav.favicon : '/on_air.png'}
                                alt={fav.name}
                                width={40}
                                height={40}
                            />
                            <p className="flex-1">{fav.name}</p>
                        </button>
                        <button
                            className="m-4"
                            onClick={() => removeFromFavorites(fav)}
                        >
                            <Image
                                src={removeIcon}
                                alt="remove"
                                width={30}
                                height={30}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Favorites;
