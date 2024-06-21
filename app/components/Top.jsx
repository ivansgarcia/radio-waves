import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Top = ({ setCurrentRadio }) => {
    const [topList, setTopList] = useState([]);
    
    useEffect(() => {
        axios
            .get('http://de1.api.radio-browser.info/json/stations/topvote', {
                params: { limit: 50, hidebroken: true },
            })
            .then((result) => setTopList(result.data));
    }, []);
    return (
        <div>
            <h2 className="text-2xl m-8">Top</h2>
            {!!topList.length && (
                <ul className="flex flex-col gap-2">
                    {topList.map((radio, index) => (
                        <li key={index}><button onClick={() => setCurrentRadio(radio)}>{radio.name}</button></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Top;
