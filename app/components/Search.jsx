import axios from 'axios';
import React, { useState } from 'react';

const Search = ({ setCurrentRadio }) => {
    const [radioList, setRadioList] = useState([]);
    const [radioName, setRadioName] = useState();
    const [country, setCountry] = useState();

    const searchRadios = async () => {
        const url = 'http://all.api.radio-browser.info/json/stations/search';
        await axios
            .get(url, {
                params: {
                    name: radioName,
                    limit: 20,
                    hidebroken: true,
                    countrycode: country,
                    order: "votes",
                    reverse: true,
                    offset: radioList.length
                },
            })
            .then((response) => {
                const newRadioList = radioList.concat(response.data);
                setRadioList(newRadioList)
            });
    };

    console.log(radioList);
    
    return (
        <div className="flex flex-col items-center gap-8 pb-8">
            <div className="flex gap-8">
                <input
                    className="p-4 rounded-full"
                    type="text"
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <button
                    className="bg-white p-4 rounded-full"
                    onClick={searchRadios}
                >
                    Search
                </button>
            </div>
            <div>
                <select value={country} defaultValue={'none'} onChange={e => setCountry(e.target.value)}>
                    <option
                        value="none"
                    >
                        NONE
                    </option>
                    <option
                        value="es"
                    >
                        ES
                    </option>
                    <option value="en">
                        EN
                    </option>
                </select>
            </div>
            {!!radioList.length && (
                <ul className="flex flex-col gap-2">
                    {radioList.map((radio, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setCurrentRadio(radio)}
                                className="bg-slate-400 p-4 w-full rounded-3xl"
                            >
                                {radio.name}
                            </button>
                        </li>
                    ))}
                    <button onClick={searchRadios}>More</button>
                </ul>
            )}
        </div>
    );
};

export default Search;
