import axios from 'axios';
import { motion } from 'framer-motion';
import { iso31661 } from 'iso-3166';
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from "./Spinner";
import { useTranslations } from "next-intl";

const Search = ({ setCurrentRadio }) => {

    const t = useTranslations('MainPage');

    const [radioList, setRadioList] = useState();
    const [radioName, setRadioName] = useState();
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(false);

    console.log(iso31661);

    const searchRadios = useCallback(
        async (more = false) => {
            setLoading(true);
            !more && setRadioList();
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
                    setLoading(false);
                })
                .catch((e) => console.log(e));
        },
        [radioList, country, radioName]
    );

    useEffect(() => {
        country && searchRadios();
    }, [country, searchRadios]);

    return (
        <section className="flex flex-col w-full text-dark items-center gap-8 md:gap-8 pb-48 px-8 pt-8">
            <div className="flex w-full justify-center items-center flex-wrap gap-4 md:gap-8">
                <input
                    placeholder={t('search_for')}
                    className="p-4 rounded-full md:w-2/3 bg-selected placeholder:text-secondary"
                    type="text"
                    onKeyDown={(e) => e.key === 'Enter' && searchRadios()}
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <button
                    className="bg-gradient-to-b from-primary to-primary-dark text-dark text-lg font-semibold py-4 px-8 rounded-full"
                    onClick={() => searchRadios()}
                >
                    {t('search')}
                </button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
                <span className="text-selected">{t('select_country')}</span>
                <select
                    value={country}
                    defaultValue={'none'}
                    onChange={(e) => setCountry(e.target.value)}
                    className="rounded-2xl p-2 bg-selected"
                >
                    <option defaultValue={true} value="none">
                        {t('all')}
                    </option>
                    {iso31661.map((country, index) => (
                        <option key={index} value={country.alpha2}>
                            {country.name.substring(0, 24)}
                        </option>
                    ))}
                </select>
            </div>
            {loading && (<Spinner/>)}
            {radioList &&
                (!!radioList.length ? (
                    <ul className="flex lg:w-1/2 h-full flex-col gap-2">
                        {radioList.map((radio, index) => (
                            <motion.li
                                animate={{ y: 0, opacity: 1 }}
                                initial={{ y: 50, opacity: 0 }}
                                transition={{
                                    delay:
                                        0.1 * (index - radioList.length + 20),
                                }}
                                key={index}
                            >
                                <button
                                    onClick={() => setCurrentRadio(radio)}
                                    className="bg-gradient-to-br from-secondary to-dark hover:from-selected hover:to-secondary hover:text-black transition-colors text-text p-4 px-8 w-full flex gap-4 justify-between items-center"
                                >
                                    <p>{radio.name}</p>
                                    <p className="text-xs">
                                        {radio.countrycode}
                                    </p>
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-text">{t('no_results')}</p>
                ))}
            {radioList?.length >= 20 && (
                <button
                    className="rounded-full bg-black text-white h-24 w-24 mx-auto my-8"
                    onClick={() => searchRadios(true)}
                >
                    + {t('more')}
                </button>
            )}
        </section>
    );
};

export default Search;
