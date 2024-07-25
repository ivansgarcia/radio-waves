import Image from 'next/image';
import React from 'react';
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
                    width={50}
                    height={50}
                />
                <h3 className="m-4 z-20 text-3xl font-semibold text-primary-darker dark:text-primary">
                {t('favorites')}
                </h3>
            </div>
            <ul className="grid grid-cols-2 justify-items-center">
                {favorites?.map((fav, index) => (
                    <li
                        className="rounded-lg w-full"
                        key={index}
                    >
                        <button
                            className="group w-full flex flex-col items-center gap-4 px-2 py-4 hover:shadow-xl hover:bg-gradient-to-br from-primary to-primary-darker hover:dark:text-text"
                            onClick={() => setCurrentRadio(fav)}
                        >
                            <img
                                className="sm:w-20"
                                src={fav.favicon ? fav.favicon : '/on_air.png'}
                                alt={fav.name}
                                width={80}
                                height={80}
                            />
                            <p className="font-semibold">{fav.name}</p>
                        </button>
                        {/* <button
                            className="m-4"
                            onClick={() => removeFromFavorites(fav)}
                        >
                            <Image
                                src={removeIcon}
                                alt="remove"
                                width={30}
                                height={30}
                            />
                        </button> */}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Favorites;
