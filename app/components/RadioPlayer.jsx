import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../../public/close.png';
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import onAirIcon from '../../public/on_air.png';
import upIcon from '../../public/up.png';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AudioControls from './AudioControls';
import { useTranslations } from 'next-intl';

const RadioPlayer = ({ radio, favorites, setFavorites, setCurrentRadio }) => {
    const t = useTranslations('MainPage');

    const isFavorite = !!favorites.find(
        (fav) => fav.stationuuid === radio.stationuuid
    );
    const [voted, setVoted] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setVoted(false);
    }, [radio]);

    const addToFavorites = () => {
        const newFavorites = [...favorites, radio];
        setFavorites(newFavorites);
    };

    const removeFromFavorites = () => {
        const newFavorites = favorites.filter((fav) => fav !== radio);
        setFavorites(newFavorites);
    };

    const voteForStation = () => {
        axios
            .get(
                'http://de1.api.radio-browser.info/xml/vote/' +
                    radio.stationuuid
            )
            .then((r) => console.log(r));
        setVoted(true);
    };

    return (
        <motion.div
            animate={!collapsed ? { height: 'auto' } : { height: 'auto' }}
            // initial={{ height: '200px' }}
            transition={{ ease: 'easeOut', duration: 2 }}
            className={` rounded-t-2xl mb-12 md:gap-2 md:mb-0 bg-gradient-to-b from-primary to-primary-dark text-center p-2 md:p-4 flex flex-col items-center justify-around`}
        >
            <nav
                className={`flex items-center justify-between w-full ${!collapsed ? 'p-2 lg:p-4' : 'p-1'}`}
            >
                <motion.button
                    initial={{ rotate: 0 }}
                    animate={collapsed ? { rotate: 0 } : { rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Image
                        className="w-4 h-4 lg:w-5 lg:h-5"
                        src={upIcon}
                        alt="expand"
                        width={30}
                        height={30}
                    />
                </motion.button>
                <button
                    className="margin-left-auto"
                    onClick={() => setCurrentRadio()}
                >
                    <Image
                        className="w-4 h-4 md:w-5 md:h-5"
                        src={closeIcon}
                        alt="close player"
                        width={30}
                        height={30}
                    />
                </button>
            </nav>
            <div
                className={`flex gap-8 items-center w-full justify-around lg:px-[12%]`}
            >
                <h2
                    className={`text-xl font-semibold mb-2 ${!collapsed ? 'md:text-4xl' : 'md:text-2xl'}`}
                >
                    {radio.name}
                </h2>
                <p className={`hidden text-2xl ${!collapsed && 'md:block'}`}>
                    {t('votes')}: {voted ? radio.votes + 1 : radio.votes}
                </p>
                <div
                    className={`${collapsed ? 'hidden' : 'flex'} gap-4 md:gap-16 items-center`}
                >
                    <button
                        className="h-8 w-8 md:h-10 md:w-10"
                        onClick={
                            !isFavorite ? addToFavorites : removeFromFavorites
                        }
                    >
                        <Image
                            src={isFavorite ? removeIcon : addIcon}
                            alt={
                                isFavorite
                                    ? 'remove from favorites'
                                    : 'add to favorites'
                            }
                            width={50}
                            height={50}
                        />
                    </button>

                    <button
                        className={`${voted && 'invisible'} h-8 w-8 md:h-10 md:w-10`}
                        onClick={voteForStation}
                    >
                        <Image
                            src={likeIcon}
                            alt="like"
                            width={50}
                            height={50}
                        />
                    </button>
                </div>
            </div>
            <div
                className={`${collapsed ? 'flex-row' : 'flex-col'} flex gap-2 items-center w-full justify-around md:px-8`}
            >
                <div className="flex flex-col md:flex-row justify-center xl:gap-8 items-center">
                    <motion.img
                        animate={collapsed ? { width: 80 } : { width: 150 }}
                        src={radio.favicon ? radio.favicon : '/on_air.png'}
                        alt="radio"
                        width={200}
                        height={200}
                        className={collapsed && 'md:-mt-8'}
                    />
                    <div
                        className={`${collapsed ? 'hidden' : 'flex'} flex-wrap gap-y-4 justify-center items-center p-2 md:p-8`}
                    >
                        {radio.tags && (
                            <div
                                className={`${collapsed ? 'hidden' : 'flex'} flex-col md:flex-wrap w-1/2`}
                            >
                                <p className="italic">Tags:</p>
                                <ul className="flex flex-wrap gap-2 justify-center">
                                    {radio.tags
                                        .split(',')
                                        .slice(0, 6)
                                        .map((tag, index) => (
                                            <li
                                                key={index}
                                                className="text-xs md:text-xl px-2 w-auto rounded bg-secondary bg-opacity-30"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                        <Link
                            className="items-center gap-4 block justify-center break-words w-1/2 text-blue-700 font-semibold"
                            target="_blank"
                            href={radio.homepage}
                        >
                            <span className="hidden font-normal italic md:block text-md text-black">
                                {t('homepage')}:
                            </span>
                            {radio.homepage}
                        </Link>
                        <p className="text-sm md:text-lg font-semibold flex items-center gap-4 justify-center w-1/2">
                            <span className="hidden italic md:block font-normal text-md">
                                {t('country')}:
                            </span>
                            {radio.country.length > 32
                                ? radio.country.substring(0, 32) + '...'
                                : radio.country}
                        </p>
                        <p className="text-xs md:text-lg flex items-center font-semibold gap-4 justify-center w-1/2">
                            <span className="hidden italic md:block text-md font-normal">
                                Bitrate:
                            </span>
                            {radio.bitrate} kbps
                        </p>
                    </div>
                </div>
                <AudioControls
                    url={radio.url}
                    setCurrentRadio={setCurrentRadio}
                />
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
