import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const Top = ({ setCurrentRadio }) => {
    const [topList, setTopList] = useState([]);
    const [mode, setMode] = useState('votes');

    console.log(topList);

    const getTopList = useCallback(async (more = false) => {
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
            });
    }, [mode, topList]);


    useEffect(() => {
        getTopList();
    }, [mode]);

    return (
        <section className="pb-32 flex flex-col items-center gap-8 p-8">
            <div className="flex gap-8">
                <button onClick={() => setMode('votes')} className={`${mode === 'clicks' && 'text-slate-400'} text-2xl`}>Top</button>
                <button onClick={() => setMode('clicks')} className={`${mode === 'votes' && 'text-slate-400'} text-2xl`}>Trending</button>
            </div>
            {!!topList.length && (
                <ul className="flex flex-col gap-2">
                    {topList.map((radio, index) => (
                        <li key={index}>
                            <button className="bg-slate-400 p-4 px-8 w-full rounded-3xl flex gap-4 justify-between items-center" onClick={() => setCurrentRadio(radio)}>
                                <p>
                                    {radio.name.length > 24
                                        ? radio.name.substring(0, 24) + '...'
                                        : radio.name}
                                </p>
                                <p>{radio.countrycode}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button className="rounded-full bg-black text-white h-24 w-24" onClick={() => getTopList(true)}>+ More</button>
        </section>
    );
};

export default Top;
