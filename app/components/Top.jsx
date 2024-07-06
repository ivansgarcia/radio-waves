import axios from 'axios';
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from "./Spinner";

const Top = ({ setCurrentRadio }) => {
    const [topList, setTopList] = useState([]);
    const [mode, setMode] = useState('votes');
    const [loading, setLoading] = useState(false);

    console.log(topList);

    const getTopList = useCallback(async (more = false) => {
        setLoading(true);
        !more && setTopList();
        const url = {
            votes: 'http://de1.api.radio-browser.info/json/stations/topvote',
            clicks: 'http://de1.api.radio-browser.info/json/stations/lastclick',
        };
        axios
            .get(url[mode], {
                params: { limit: 20, hidebroken: true, offset: more ? topList.length : 0 },
            })
            .then((result) => {
                const newTopList = more ? topList.concat(result.data) : result.data;
                setTopList(newTopList);
                setLoading(false);
            });
    }, [mode, topList]);


    useEffect(() => {
        getTopList();
    }, [mode]);

    const selectorPosition = {
        votes: 'justify-start',
        clicks: 'justify-end'
    }

    return (
        <section className="pb-52 w-full mx-auto max-w-2xl flex flex-col items-center gap-8 px-8 pt-8 text-text">
            <div className="relative justify-around items-center flex w-full">
                <div
                    className={`${selectorPosition[mode]} absolute items-end flex w-full h-full pointer-events-none`}
                >
                    <motion.div
                        layout
                        className="w-1/2 h-1 bg-text"
                    >
                    </motion.div>
                </div>
                <button onClick={() => setMode('votes')} className={`${mode === 'clicks' ? 'text-selected' : 'text-text'} text-2xl p-2 w-1/2 h-full`}>Top</button>
                <button onClick={() => setMode('clicks')} className={`${mode === 'votes' ? 'text-selected' : 'text-text'} text-2xl p-2 w-1/2 h-full`}>Trending</button>
            </div>
            {loading && (<Spinner/>)}
            {!!topList?.length && (
                <ul className="flex flex-col gap-2 w-full max-w-xl">
                    {topList.map((radio, index) => (
                        <motion.li animate={{ y: 0, opacity: 1 }} initial={{ y: 50, opacity: 0}} transition={{ delay: 0.2 + 0.1 * (index - topList.length + 20)}} key={index}>
                            <button className="bg-secondary p-4 px-8 w-full flex gap-4 justify-between items-center" onClick={() => setCurrentRadio(radio)}>
                                <p>
                                    {radio.name.length > 24
                                        ? radio.name.substring(0, 24) + '...'
                                        : radio.name}
                                </p>
                                <p>{radio.countrycode}</p>
                            </button>
                        </motion.li>
                    ))}
                <button className="rounded-full bg-black text-white h-24 w-24 mx-auto my-8" onClick={() => getTopList(true)}>+ More</button>
                </ul>
            )}
        </section>
    );
};

export default Top;
