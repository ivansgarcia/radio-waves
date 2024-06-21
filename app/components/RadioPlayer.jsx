import axios from "axios";
import Image from "next/image"
import React, { useEffect, useRef, useState } from 'react';
import closeIcon from '../../public/close.png';
import removeIcon from '../../public/star_cross.png';
import addIcon from '../../public/star_add.png';
import likeIcon from '../../public/like.png';
import onAirIcon from '../../public/on_air.png';

const RadioPlayer = ({ radio, favorites, setFavorites, setCurrentRadio }) => {

    console.log('radio', radio);

    const isFavorite = favorites.includes(radio);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        setVoted(false);
    }, [radio]);

    const addToFavorites = () => {
        const newFavorites = [...favorites, radio];
        setFavorites(newFavorites);
    }

    const removeFromFavorites = () => {
        const newFavorites = favorites.filter(fav => fav !== radio);
        setFavorites(newFavorites);
    }

    const voteForStation = () => {
        axios.get('http://de1.api.radio-browser.info/xml/vote/' + radio.stationuuid).then(r => console.log(r))
        setVoted(true);
    }

    const showError = () => {
        alert("Error can`t load radio station")
    }

    return (
        <div className="rounded-t-2xl bg-slate-300 text-center p-8 flex flex-col gap-4 items-center justify-around">
            <button className="self-end" onClick={() => setCurrentRadio()}><Image src={closeIcon} alt="close player" width={15} height={15}/></button>
            <h2 className="text-xl">{radio.name}</h2>
            <div className="flex gap-8 items-center">
                <button onClick={!isFavorite ? addToFavorites : removeFromFavorites}><Image src={isFavorite ? removeIcon : addIcon} alt={isFavorite ? "remove from favorites" : "add to favorites"} width={25} height={25}/></button>
                {!voted && <button onClick={voteForStation}><Image src={likeIcon} alt="like" width={25} height={25}/></button>}
            </div>
            <div className="flex w-full justify-center items-center gap-8">
                <img src={radio.favicon ? radio.favicon : '/on_air.png'} alt="radio" width={150} height={150}/>
                <div className="flex flex-col gap-4">
                    <p>{radio.tags?.substring(0,40)}</p>
                    <p>{radio.country}</p>
                </div>
            </div>
            <audio onErrorCapture={showError} className="w-4/5" src={radio.url} controls autoPlay onError={e => console.log(e)} ></audio>
        </div>
    )
}

export default RadioPlayer