import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../../public/close.png';
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import onAirIcon from '../../public/on_air.png';
import upIcon from '../../public/up.png';
import { motion } from "framer-motion";
import Link from "next/link";

const RadioPlayer = ({ radio, favorites, setFavorites, setCurrentRadio }) => {
    console.log('radio', radio);

    const isFavorite = favorites.includes(radio);
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

    const showError = () => {
        alert('Error can`t load radio station');
    };

    return (
        <motion.div animate={!collapsed ? { height: '400px'} : { height: '150px'}} initial={{ height: '200px'}} transition={{ ease: 'easeOut' }} className={`${collapsed ? 'gap-2' : 'gap-8'} rounded-t-2xl mb-12 md:mb-0 bg-primary text-center p-4 flex flex-col items-center justify-around`}>
            <div className="flex items-center justify-between w-full">
                <motion.button
                    initial={{ rotate: 0 }}
                    animate={collapsed ? { rotate: 0} : { rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Image 
                        src={upIcon}
                        alt="expand"
                        width={15}
                        height={15}
                    />
                </motion.button>
                <button className="margin-left-auto" onClick={() => setCurrentRadio()}>
                    <Image
                        src={closeIcon}
                        alt="close player"
                        width={15}
                        height={15}
                    />
                </button>
            </div>
            <div className={`flex gap-8 items-center w-full justify-around ${collapsed && 'md:justify-start'}`}>
                <h2 className={`text-xl font-semibold ${!collapsed ? 'md:text-4xl' : 'ml-20 md:text-2xl'}`}>{radio.name}</h2>
                <p className={`hidden ${!collapsed && 'md:block'}`}>Votes: {voted ? radio.votes + 1 : radio.votes}</p>
                <div className={`${collapsed ? 'hidden' : 'flex'} gap-4 md:gap-16 items-center`}>
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
            <div className={`${collapsed ? 'flex-row gap-4' : 'flex-col gap-8'} flex justify-center md:justify-around w-full items-center`}>
                <div className={`flex justify-center items-center gap-4 ${!collapsed && 'md:w-full'} md: md:px-8`}>
                    <motion.img
                        animate={collapsed ? { width: 60 } : { width: 150 }}
                        src={radio.favicon ? radio.favicon : '/on_air.png'}
                        alt="radio"
                        width={200}
                        height={200}
                    />
                    <div className={`${collapsed ? 'hidden': 'flex'} justify-center flex-col md:flex-row md:flex-wrap gap-4 md:gap-8 overflow-hidden md:justify-evenly`}>
                        <p className="text-xs md:text-xl w-full flex gap-4 items-center justify-center md:w-1/3"><span className="hidden italic md:block text-sm">Tags:</span>{radio.tags?.substring(0, 40)}</p>
                        <Link className="flex items-center gap-4 justify-center md:w-1/3" target="_blank" href={radio.homepage} ><span className="hidden italic md:block text-sm">Homepage:</span>{radio.homepage}</Link>
                        <p className="text-sm md:text-lg flex items-center gap-4 justify-center md:w-1/3"><span className="hidden italic md:block text-sm">Country:</span>{radio.country.length > 32 ? radio.country.substring(0, 32) + '...' : radio.country}</p>
                        <p className="text-xs md:text-lg flex items-center gap-4 justify-center md:w-1/3"><span className="hidden italic md:block text-sm">Bitrate:</span>{radio.bitrate} kbps</p>
                    </div>
                </div>
                <audio
                    onErrorCapture={showError}
                    className="w-4/5 max-w-[60vw]"
                    src={radio.url}
                    controls
                    autoPlay
                    onError={(e) => console.log(e)}
                ></audio>
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
