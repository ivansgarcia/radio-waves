import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../../public/close.png';
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import onAirIcon from '../../public/on_air.png';
import upIcon from '../../public/up.png';

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
        <div className={`${collapsed ? 'gap-2' : 'gap-8'} rounded-t-2xl mb-16 bg-primary text-center p-4 flex flex-col items-center justify-around`}>
            <div className="flex items-center justify-between w-full">
                <button
                    className="mx-auto"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <Image 
                        src={upIcon}
                        alt="expand"
                        width={15}
                        height={15}
                    />
                </button>
                <button className="margin-left-auto" onClick={() => setCurrentRadio()}>
                    <Image
                        src={closeIcon}
                        alt="close player"
                        width={15}
                        height={15}
                    />
                </button>
            </div>
            <div className="flex gap-8 items-center w-full justify-around">
                <h2 className="text-xl font-semibold">{radio.name}</h2>
                <div className={`${collapsed ? 'hidden' : 'flex'} gap-4 items-center`}>
                    <button
                        className="h-8 w-8"
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
                            width={25}
                            height={25}
                        />
                    </button>

                    <button
                        className={`${voted && 'invisible'} h-8 w-8`}
                        onClick={voteForStation}
                    >
                        <Image
                            src={likeIcon}
                            alt="like"
                            width={25}
                            height={25}
                        />
                    </button>
                </div>
            </div>
            <div className={`${collapsed ? 'flex-row gap-4' : 'flex-col gap-8'} flex w-full items-center`}>
                <div className="flex justify-around items-center gap-4">
                    <img
                        src={radio.favicon ? radio.favicon : '/on_air.png'}
                        alt="radio"
                        width={collapsed ? 60 : 100}
                        height={collapsed ? 60 : 100}
                    />
                    <div className={`${collapsed ? 'hidden': 'flex'} flex-col gap-4 overflow-hidden`}>
                        <p className="text-xs">{radio.tags?.substring(0, 40)}</p>
                        <p>{radio.country}</p>
                    </div>
                </div>
                <audio
                    onErrorCapture={showError}
                    className="w-4/5"
                    src={radio.url}
                    controls
                    autoPlay
                    onError={(e) => console.log(e)}
                ></audio>
            </div>
        </div>
    );
};

export default RadioPlayer;
