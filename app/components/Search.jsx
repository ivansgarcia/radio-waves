import axios from 'axios';
import { iso31661 } from 'iso-3166';
import React, { useCallback, useEffect, useState } from 'react';

const Search = ({ setCurrentRadio }) => {
    const [radioList, setRadioList] = useState([]);
    const [radioName, setRadioName] = useState();
    const [country, setCountry] = useState();

    const searchRadios = useCallback(
        async (more = false) => {
            const url =
                'http://all.api.radio-browser.info/json/stations/search';
            await axios
                .get(url, {
                    params: {
                        name: radioName,
                        limit: 20,
                        hidebroken: true,
                        countrycode: country,
                        order: 'votes',
                        reverse: true,
                        offset: more ? radioList.length : 0,
                    },
                })
                .then((response) => {
                    const newRadioList = more
                        ? radioList.concat(response.data)
                        : response.data;
                    setRadioList(newRadioList);
                })
                .catch((e) => console.log(e));
        },
        [radioList, country, radioName]
    );

    useEffect(() => {
        country && searchRadios();
    }, [country]);

    return (
        <div className="flex flex-col items-center gap-8 pb-32 p-8">
            <div className="flex flex-wrap gap-8">
                <input
                    placeholder="search for..."
                    className="p-4 rounded-full"
                    type="text"
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <button
                    className="bg-white p-4 rounded-full"
                    onClick={() => searchRadios()}
                >
                    Search
                </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
                <span>Select country</span>
                <select
                    value={country}
                    defaultValue={'none'}
                    onChange={(e) => setCountry(e.target.value)}
                    className="rounded-2xl p-2"
                >
                    <option defaultValue={true} value="none">
                        Not set
                    </option>
                    {iso31661.map((country, index) => (
                        <option key={index} value={country.alpha2}>
                            {country.name.substring(0, 24)}
                        </option>
                    ))}
                </select>
            </div>
            {!!radioList.length && (
                <ul className="flex flex-col gap-2">
                    {radioList.map((radio, index) => (
                        <li key={index}>
                            <button
                                onClick={() => setCurrentRadio(radio)}
                                className="bg-slate-400 p-4 px-8 w-full rounded-3xl flex gap-4 justify-between items-center"
                            >
                                <p>{radio.name}</p>
                                <p className="text-xs">{radio.countrycode}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {radioList.length >= 20 && (
                <button className="rounded-full bg-black text-white h-24 w-24" onClick={() => searchRadios(true)}>+ More</button>
            )}
        </div>
    );
};

export default Search;
