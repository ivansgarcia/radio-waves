import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import starLightIcon from '../../public/star_light.png';
import starDarkIcon from '../../public/star_dark.png';
import removeIcon from '../../public/star_cross.png';
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const Favorites = ({ favorites, setFavorites, setCurrentRadio, currentRadio }) => {

    const { theme } = useTheme();
    
    const t = useTranslations('MainPage');

    const removeFromFavorites = (radio) => {
        const newFavorites = favorites.filter((fav) => fav !== radio);
        setFavorites(newFavorites);
    };

    return (
        <section className={`flex flex-col w-full gap-8 p-2 md:p-4 ${currentRadio ? 'pb-64' : 'pb-32'}`}>
            <div className="flex items-start">
                <Image
                    className="-mr-2 -rotate-12"
                    src={theme === 'dark' ? starDarkIcon : starLightIcon}
                    alt="favorites"
                    width={70}
                    height={70}
                />
                <h3 className="m-4 z-20 text-4xl font-semibold text-primary-darker dark:text-primary">
                {t('favorites')}
                </h3>
            </div>
            <ul className="flex flex-col gap-4 md:w-full mx-auto">
                {favorites?.map((fav, index) => (
                    <li
                        className="element w-full justify-around flex items-center"
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
