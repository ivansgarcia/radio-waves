import axios from 'axios';
import { iso31661 } from 'iso-3166';
import React, { useCallback, useEffect, useState } from 'react';

const Search = ({ setCurrentRadio }) => {
    const [radioList, setRadioList] = useState();
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

    console.log('radioList', radioList);

    return (
        <section className="flex flex-col text-dark items-center gap-8 pb-32 p-8">
            <div className="flex justify-center items-center flex-wrap gap-8">
                <input
                    placeholder="search for..."
                    className="p-4 rounded-full bg-selected placeholder:text-secondary"
                    type="text"
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <button
                    className="bg-primary text-dark p-4 rounded-full"
                    onClick={() => searchRadios()}
                >
                    Search
                </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
                <span className="text-selected">Select country</span>
                <select
                    value={country}
                    defaultValue={'none'}
                    onChange={(e) => setCountry(e.target.value)}
                    className="rounded-2xl p-2 bg-selected"
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
            {radioList &&
                (!!radioList.length ? (
                    <ul className="flex flex-col gap-2">
                        {radioList.map((radio, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setCurrentRadio(radio)}
                                    className="bg-secondary text-text p-4 px-8 w-full rounded-3xl flex gap-4 justify-between items-center"
                                >
                                    <p>{radio.name}</p>
                                    <p className="text-xs">
                                        {radio.countrycode}
                                    </p>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-text">No results</p>
                ))}
            {radioList?.length >= 20 && (
                <button
                    className="rounded-full bg-black text-white h-24 w-24 mx-auto my-8"
                    onClick={() => searchRadios(true)}
                >
                    + More
                </button>
            )}
        </section>
    );
};

export default Search;
