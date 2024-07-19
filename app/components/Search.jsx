import axios from 'axios';
import { motion } from 'framer-motion';
import { iso31661 } from 'iso-3166';
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from "./Spinner";
import { useLocale, useTranslations,  } from "next-intl";
import countriesEng from '../../messages/countries_en.json';
import countriesSpa from '../../messages/countries_es.json';

const Search = ({ setCurrentRadio }) => {

    const locale = useLocale();

    const countries = {
        "en": countriesEng,
        "es": countriesSpa
    }

    const localeCountries = countries[locale];

    const t = useTranslations('MainPage');

    const [radioList, setRadioList] = useState();
    const [radioName, setRadioName] = useState();
    const [country, setCountry] = useState();
    const [loading, setLoading] = useState(false);

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
                        countrycode: country === 'ALL' ? '' : country,
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
    }, [country]);

    return (
        <section className="flex flex-col w-full text-dark items-center gap-8 md:gap-8 pb-64 px-8 pt-8">
            <div className="flex w-full justify-center items-center flex-wrap gap-4 md:gap-8">
                <input
                    placeholder={t('search_for')}
                    className="p-4 rounded-full md:w-2/3 bg-selected placeholder:text-secondary"
                    type="text"
                    onKeyDown={(e) => e.key === 'Enter' && searchRadios()}
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <motion.button
                    whileHover={{ boxShadow: '0 5px 20px #FC900088' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-b from-primary to-primary-dark text-dark text-lg font-semibold py-4 px-8 rounded-full"
                    onClick={() => searchRadios()}
                >
                    {t('search')}
                </motion.button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
                <span className="text-selected">{t('select_country')}</span>
                <select
                    value={country}
                    defaultValue={'all'}
                    onChange={(e) => setCountry(e.target.value.toUpperCase())}
                    className="rounded-2xl p-2 bg-selected cursor-pointer"
                >
                    <option defaultValue={true} value="all">
                        {t('all')}
                    </option>
                    {Object.keys(localeCountries).map((k, index) => (
                        <option key={index} value={k}>
                            {localeCountries[k].substring(0, 24)}
                        </option>
                    ))}
                </select>
            </div>
            {loading && (<Spinner size='big'/>)}
            {radioList &&
                (!!radioList.length ? (
                    <ul className="flex w-full max-w-xl h-full flex-col gap-2">
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
                <motion.button
                    whileInView={{ opacity: 1 , transition: { delay: 0.1, duration: 0.5 }}}
                    initial={{ opacity: 0 }}
                    whileHover={{ boxShadow: '0 5px 20px #4E4E4E' }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-black text-white h-24 w-24 mx-auto italic"
                    onClick={() => searchRadios(true)}
                >
                    {'+ ' + t('more')}
                </motion.button>
            )}
        </section>
    );
};

export default Search;
