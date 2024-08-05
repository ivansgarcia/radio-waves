import React, { useEffect, useState } from 'react'
import SlidingText from "./SlidingText"
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import axios from "axios";

const RadioPlayerHeader = ({ collapsed, radio, favorites, setFavorites }) => {
    const t = useTranslations('MainPage');
    
    const [voted, setVoted] = useState(false);
    const [voteResult, setVoteResult] = useState();
    const [addToFavResult, setAddToFavResult] = useState(false);

    useEffect(() => {
        setVoted(false);
    }, [radio]);

    const isFavorite = !!favorites.find(
        (fav) => fav.stationuuid === radio.stationuuid
    );

    const pressAnim = {
        animate: { scale: 0.2 },
    };

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
        const newFavorites = favorites.filter(
            (fav) => fav.stationuuid !== radio.stationuuid
        );
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

    return (
        <div
                    className={`${collapsed ? 'my-1 md:w-64' : 'my-2 w-full'} flex gap-8 items-center flex-1 md:max-w-[80%] justify-around`}
                >
                    <SlidingText text={radio.name} collapsed={collapsed} />
                    <p
                        className={`hidden text-xl font-semibold ${!collapsed && 'md:block'}`}
                    >
                        {t('votes')}: {voted ? radio.votes + 1 : radio.votes}
                    </p>
                    <div
                        className={`${collapsed ? 'hidden' : 'flex'} gap-4 md:gap-16 items-center`}
                    >
                        <motion.button
                            whileTap="animate"
                            className="h-8 w-8 md:h-10 md:w-10 relative"
                            onClick={() =>
                                !isFavorite
                                    ? addToFavorites()
                                    : removeFromFavorites()
                            }
                        >
                            <motion.figure variants={pressAnim}>
                                <Image
                                    src={isFavorite ? removeIcon : addIcon}
                                    alt={
                                        isFavorite
                                            ? t('remove_fav')
                                            : t('add_fav')
                                    }
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
                                <motion.figure variants={pressAnim}>
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
    )
}

export default RadioPlayerHeader