import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import closeIcon from '../../public/close.png';
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import upIcon from '../../public/up.png';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import AudioControls from './AudioControls';
import { useTranslations } from 'next-intl';

const RadioPlayer = ({ radio, favorites, setFavorites, setCurrentRadio }) => {
    const t = useTranslations('MainPage');

    const isFavorite = !!favorites.find(
        (fav) => fav.stationuuid === radio.stationuuid
    );
    
    const [voted, setVoted] = useState(false);
    const [voteResult, setVoteResult] = useState();
    const [addToFavResult, setAddToFavResult] = useState(false);

    const [radioError, setRadioError] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        setVoted(false);
    }, [radio]);

    const addToFavorites = () => {
        console.log('added', radio);
        console.log('adding');
        const newFavorites = [...favorites, radio];
        setFavorites(newFavorites);
        setAddToFavResult(true);
        setTimeout(() => {
            setAddToFavResult(false);
        }, 2000);
    };

    const removeFromFavorites = () => {
        console.log('removing');
        const newFavorites = favorites.filter((fav) => fav.stationuuid !== radio.stationuuid);
        console.log(newFavorites);
        setFavorites(newFavorites);
    };

    const voteForStation = () => {
        axios
            .get(
                'http://de1.api.radio-browser.info/xml/vote/' +
                    radio.stationuuid
            )
            .then((r) => {
                r.data.includes('ok="true"')
                    ? showVoteResult('ok')
                    : showVoteResult('error');
            });
    };

    const showVoteResult = (result) => {
        setVoteResult(result);
        setTimeout(() => {
            result === 'ok' && setVoted(true);
            setVoteResult();
        }, 2000);
    };

    const showError = () => {
        setRadioError(true);
        setTimeout(() => {
            setRadioError(false);
            setCurrentRadio();
        }, 3000);
    };

    const pressAnim = {
        animate: { scale: 0.2 }
    }

    return (
        <motion.div
            animate={!collapsed ? { height: 'auto' } : { height: 'auto' }}
            transition={{ ease: 'easeOut', duration: 2 }}
            className={`rounded-t-2xl mb-12 md:gap-2 md:mb-0 bg-gradient-to-b text-text from-primary to-primary-darker text-center p-2 md:p-4 flex flex-col items-center justify-around`}
        >
            <AnimatePresence>
                {radioError && (
                    <motion.p
                        animate={{
                            y: -110,
                            opacity: 1,
                            transition: { delay: 1 },
                        }}
                        initial={{ y: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-black p-4 rounded-full absolute text-white text-lg border-4 border-red-600"
                    >
                        {t('radio_error')}
                    </motion.p>
                )}
            </AnimatePresence>
            <nav
                className={`flex items-center justify-between w-full ${!collapsed ? 'p-2 lg:p-4' : 'p-1 md:p-0'}`}
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
                className={`flex gap-8 items-center my-2 w-full justify-around lg:px-[12%]`}
            >
                <h2
                    className={`text-xl -my-1 font-semibold ${!collapsed ? 'md:text-4xl' : 'md:text-2xl'}`}
                >
                    {radio.name}
                </h2>
                <p className={`hidden text-2xl ${!collapsed && 'md:block'}`}>
                    {t('votes')}: {voted ? radio.votes + 1 : radio.votes}
                </p>
                <div
                    className={`${collapsed ? 'hidden' : 'flex'} gap-4 md:gap-16 items-center`}
                >
                    <motion.button
                        whileTap="animate"
                        className="h-8 w-8 md:h-10 md:w-10 relative p-0"
                        onClick={() => 
                            !isFavorite ? addToFavorites() : removeFromFavorites()
                        }
                    >
                        <motion.figure
                            variants={pressAnim}
                        >
                            <Image
                                src={isFavorite ? removeIcon : addIcon}
                                alt={isFavorite ? t('remove_fav') : t('add_fav')}
                                width={50}
                                height={50}
                            />
                        </motion.figure>
                        <AnimatePresence>
                            {addToFavResult && (
                                <motion.p
                                    animate={{ y: -60, opacity: 1 }}
                                    initial={{ y: 0, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    // onAnimationEnd={() => setAddToFavResult(false)}
                                    className="absolute w-40 top-0 -right-12 p-4 text-lg bg-black rounded-full text-white"
                                >
                                    {t('added')}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <motion.button
                        whileTap="animate"
                        className={`${voted && 'invisible'} h-8 w-8 flex justify-center items-center md:h-10 md:w-10 relative`}
                        onClick={() => voteForStation()}
                    >
                        {!voteResult && (
                            <motion.figure
                                variants={pressAnim}
                            >
                                <Image
                                    src={likeIcon}
                                    alt="like"
                                    width={50}
                                    height={50}
                                />
                            </motion.figure>
                        )}
                        <AnimatePresence>
                            {voteResult && (
                                <motion.p
                                    animate={{ y: -60, opacity: 1 }}
                                    initial={{ y: 0, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute w-40 top-0 -right-12 p-4 text-lg bg-black rounded-full text-white"
                                >
                                    {voteResult === 'ok'
                                        ? t('voted')
                                        : t('too_many_votes')}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
            <div
                className={`${collapsed ? 'flex-row' : 'flex-col'} flex  items-center w-full justify-around md:px-8`}
            >
                <div className="flex flex-col md:flex-row justify-center m-2 xl:gap-8 items-center">
                    <motion.img
                        animate={collapsed ? { width: 75 } : { width: 150 }}
                        src={radio.favicon ? radio.favicon : '/on_air.png'}
                        alt="radio"
                        width={200}
                        height={200}
                        className={collapsed ? 'md:-mt-8' : 'm-4'}
                    />
                    <div
                        className={`${collapsed ? 'hidden' : 'flex'} flex-wrap gap-4 gap-y-4 justify-center items-center p-2 md:p-8`}
                    >
                        {radio.tags && (
                            <div
                                className={`${collapsed ? 'hidden' : 'flex'} flex-col md:flex-wrap w-full sm:w-2/5`}
                            >
                                <p className="italic hidden md:block">Tags:</p>
                                <ul className="flex flex-wrap gap-2 justify-center">
                                    {radio.tags
                                        .split(',')
                                        .slice(0, 6)
                                        .map((tag, index) => (
                                            <li
                                                key={index}
                                                className="text-sm md:text-xl px-2 w-auto rounded bg-dark-secondary text-lighter"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                        {radio.homepage && (
                            <Link
                                className="items-center gap-4 block justify-center md:text-lg break-words w-2/5 text-blue-700 font-semibold"
                                target="_blank"
                                href={radio.homepage}
                            >
                                <span className="hidden font-normal italic md:block text-md text-black">
                                    {t('homepage')}:
                                </span>
                                {radio.homepage}
                            </Link>
                        )}
                        {radio.country && (
                            <p className="text-sm md:text-lg font-semibold flex items-center gap-4 justify-center w-2/5">
                                <span className="hidden italic md:block font-normal text-md">
                                    {t('country')}:
                                </span>
                                {radio.country.length > 32
                                    ? radio.country.substring(0, 32) + '...'
                                    : radio.country}
                            </p>
                        )}
                        {!!radio.bitrate && (
                            <p className="text-xs md:text-lg flex items-center font-semibold gap-4 justify-center w-2/5">
                                <span className="hidden italic md:block text-md font-normal">
                                    Bitrate:
                                </span>
                                {radio.bitrate} kbps
                            </p>
                        )}
                    </div>
                </div>
                <AudioControls url={radio.url} showError={showError} />
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
