import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import starLightIcon from '../../public/star_light.png';
import starDarkIcon from '../../public/star_dark.png';
import removeIcon from '../../public/star_cross.png';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const removeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
};

const Favorites = ({
    favorites,
    setFavorites,
    setCurrentRadio,
    currentRadio,
}) => {
    const { theme } = useTheme();

    const [currentTheme, setCurrentTheme] = useState();

    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    const t = useTranslations('MainPage');

    const removeFromFavorites = (radio) => {
        const newFavorites = favorites.filter(
            (fav) => fav.stationuuid !== radio.stationuuid
        );
        setFavorites(newFavorites);
    };

    return (
        <section
            className={`flex flex-col max-w-lg mx-auto w-full gap-8 p-2 md:p-4 ${currentRadio ? 'pb-64' : 'pb-32'}`}
        >
            <div className="flex items-start self-center md:self-start">
                <Image
                    className="-mr-2 -rotate-12"
                    src={currentTheme === 'dark' ? starDarkIcon : starLightIcon}
                    alt="favorites"
                    width={50}
                    height={50}
                />
                <h3 className="m-4 z-20 text-3xl font-semibold text-primary-darker dark:text-primary">
                    {t('favorites')}
                </h3>
            </div>
            {favorites &&
                (favorites?.length ? (
                    <ul className="grid grid-cols-2 justify-items-center">
                        {favorites?.map((fav, index) => (
                            <li className="rounded-lg w-full" key={index}>
                                <motion.div
                                    initial="initial"
                                    animate="initial"
                                    whileHover="animate"
                                    className="group relative cursor-pointer w-full flex flex-col items-center gap-4 px-2 py-4 hover:shadow-xl hover:bg-gradient-to-br from-primary to-primary-darker hover:dark:text-text"
                                    onClick={() => setCurrentRadio(fav)}
                                >
                                    <Image
                                        className="sm:w-20"
                                        src={
                                            fav.favicon
                                                ? fav.favicon
                                                : '/on_air.png'
                                        }
                                        alt={fav.name}
                                        width={80}
                                        height={80}
                                    />
                                    <p className="font-semibold text-center">
                                        {fav.name}
                                    </p>
                                    <motion.button
                                        variants={removeAnimation}
                                        className="m-4 absolute -top-3 -right-3 p-1.5 bg-selected dark:bg-dark-selected rounded-full"
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
                    <p className="text-center text-xl my-24">{t('no_favs')}</p>
                ))}
        </section>
    );
};

export default Favorites;
