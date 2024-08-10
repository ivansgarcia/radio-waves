import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import Spinner from './Spinner';
import { useLocale, useTranslations } from 'next-intl';
import countriesEng from '../../messages/countries_en.json';
import countriesSpa from '../../messages/countries_es.json';
import CustomSelect from './CustomSelect';

const Search = ({ setCurrentRadio }) => {
    const locale = useLocale();

    const countries = {
        en: countriesEng,
        es: countriesSpa,
    };

    const localeCountries = countries[locale];

    const t = useTranslations('MainPage');

    const [radioList, setRadioList] = useState();
    const [radioName, setRadioName] = useState();
    const [loading, setLoading] = useState(false);

    const searchRadios = useCallback(
        (more = false, country = 'ALL') => {
            setLoading(true);
            !more && setRadioList();
            const url =
                'http://all.api.radio-browser.info/json/stations/search';
            axios
                .get(url, {
                    params: {
                        name: radioName,
                        limit: 20,
                        hidebroken: true,
                        countrycode: country === 'ALL' ? null : country,
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
        [radioList, radioName]
    );

    return (
        <section className="flex w-full flex-col items-center gap-8 pb-80 pt-4 text-darker md:gap-8 md:pt-8">
            <div className="flex w-full flex-wrap items-center justify-center gap-4 px-4 md:gap-8 lg:w-4/5">
                <input
                    placeholder={t('search_for')}
                    className={`flex-1 rounded-full bg-secondary p-4 px-8 placeholder:text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-selected placeholder:dark:text-dark md:w-2/3 md:text-lg`}
                    type="text"
                    onKeyDown={(e) => e.key === 'Enter' && searchRadios()}
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <motion.button
                    whileHover={{ boxShadow: '0 5px 20px #FC900088' }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full bg-gradient-to-b from-primary to-primary-darker px-8 py-4 text-lg font-semibold text-dark"
                    onClick={() => searchRadios()}
                >
                    {t('search')}
                </motion.button>
            </div>
            <div className="flex w-full min-w-48 flex-wrap items-center justify-center gap-8 gap-y-0 px-4">
                <span className="pt-2 text-text dark:text-dark-text md:text-lg">
                    {t('select_country')}
                </span>
                <CustomSelect
                    items={localeCountries}
                    searchRadios={searchRadios}
                />
            </div>
            {radioList &&
                (!!radioList.length ? (
                    <ul className="flex h-full w-full max-w-xl flex-col gap-2 px-8">
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
                                    className="element flex w-full items-center overflow-x-hidden justify-between gap-4 p-4"
                                >
                                    <p className="px-4 break-all">
                                        {radio.name.split(' ').slice(0, 6)}
                                    </p>
                                    <p className="text-sm">
                                        {radio.countrycode}
                                    </p>
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="dark:dark-text text-text">
                        {t('no_results')}
                    </p>
                ))}
            {loading ? (
                <Spinner size="big" />
            ) : (
                radioList?.length >= 20 && (
                    <motion.button
                        whileInView={{
                            opacity: 1,
                            transition: { delay: 0.1, duration: 0.5 },
                        }}
                        initial={{ opacity: 0 }}
                        whileHover={{ boxShadow: '0 0px 40px 5px #FFC132' }}
                        whileTap={{ scale: 0.95 }}
                        className="mx-auto h-24 w-24 rounded-full bg-dark text-lg font-bold text-white dark:bg-dark-selected dark:text-darker"
                        onClick={() => searchRadios(true)}
                    >
                        {'+ ' + t('more')}
                    </motion.button>
                )
            )}
        </section>
    );
};

export default Search;
