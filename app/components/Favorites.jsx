import Image from 'next/image';
import React from 'react';
import starLightIcon from '../../public/star_light.png';
import starDarkIcon from '../../public/star_dark.png';
import removeIcon from '../../public/star_cross.png';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const Favorites = ({
    favorites,
    setFavorites,
    setCurrentRadio,
    currentRadio,
}) => {
    const t = useTranslations('MainPage');

    const removeFromFavorites = (radio) => {
        const newFavorites = favorites.filter(
            (fav) => fav.stationuuid !== radio.stationuuid
        );
        setFavorites(newFavorites);
    };

    return (
        <section
            className={`mx-auto flex w-full max-w-lg flex-col gap-8 p-2 md:p-4 ${currentRadio ? 'pb-64' : 'pb-32'}`}
        >
            <div className="flex items-start self-center md:self-start">
                <figure className="relative -mr-2 -rotate-12">
                    <Image
                        className="invisible dark:visible"
                        src={starDarkIcon}
                        alt="favorites"
                        width={50}
                        height={50}
                    />
                    <Image
                        className="absolute top-0 dark:invisible"
                        src={starLightIcon}
                        alt="favorites"
                        width={50}
                        height={50}
                    />
                </figure>
                <h3 className="z-20 m-4 text-3xl font-semibold text-primary-darker dark:text-primary">
                    {t('favorites')}
                </h3>
            </div>
            {favorites &&
                (favorites?.length ? (
                    <ul
                        className={`grid ${favorites.length > 1 && 'grid-cols-2'} justify-items-center`}
                    >
                        {favorites?.map((fav, index) => (
                            <li
                                className="w-full max-w-60 rounded-lg"
                                key={index}
                            >
                                <motion.div
                                    className="group relative flex w-full cursor-pointer flex-col items-center gap-4 from-primary to-primary-darker px-2 py-4 hover:bg-gradient-to-br hover:shadow-xl hover:dark:text-text"
                                    onClick={() => setCurrentRadio(fav)}
                                >
                                    <Image
                                        className="pointer-events-none sm:w-20"
                                        src={
                                            fav.favicon
                                                ? fav.favicon
                                                : '/on_air.png'
                                        }
                                        alt="favorite logo"
                                        width={80}
                                        height={80}
                                    />
                                    <p className="text-center font-semibold">
                                        {fav.name}
                                    </p>
                                    <motion.button
                                        className="absolute -right-3 -top-3 m-4 rounded-full bg-selected p-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-dark-selected"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromFavorites(fav);
                                        }}
                                    >
                                        <Image
                                            src={removeIcon}
                                            alt="remove"
                                            width={30}
                                            height={30}
                                        />
                                    </motion.button>
                                </motion.div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mx-8 my-16 text-center text-xl">
                        {t('no_favs')}
                    </p>
                ))}
        </section>
    );
};

export default Favorites;
