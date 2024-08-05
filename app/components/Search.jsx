import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from "./Spinner";
import { useLocale, useTranslations,  } from "next-intl";
import countriesEng from '../../messages/countries_en.json';
import countriesSpa from '../../messages/countries_es.json';
import CustomSelect from "./CustomSelect";

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
    const [loading, setLoading] = useState(false);

    const searchRadios = useCallback(
        async (more = false, country = 'ALL') => {
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
        <section className="flex flex-col w-full text-darker items-center gap-8 md:gap-8 pb-64 px-8 pt-4 md:pt-8">
            <div className="flex w-full justify-center items-center flex-wrap gap-4 md:gap-8">
                <input
                    placeholder={t('search_for')}
                    className="p-4 px-8 rounded-full lg:w-2/3 md:text-lg bg-secondary dark:bg-dark-selected placeholder:dark:text-dark placeholder:text-dark-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    type="text"
                    onKeyDown={(e) => e.key === 'Enter' && searchRadios()}
                    onChange={(e) => setRadioName(e.target.value)}
                />
                <motion.button
                    whileHover={{ boxShadow: '0 5px 20px #FC900088' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-b from-primary to-primary-darker text-dark text-lg font-semibold py-4 px-8 rounded-full"
                    onClick={() => searchRadios()}
                >
                    {t('search')}
                </motion.button>
            </div>
            <div className="min-w-48 w-full flex flex-wrap gap-y-0 justify-center items-center gap-8">
                <span className="text-text pt-2 md:text-lg dark:text-dark-text">{t('select_country')}</span>
                <CustomSelect items={localeCountries} searchRadios={searchRadios}/>
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
                                    className="element p-4 px-8 w-full flex gap-4 justify-between items-center"
                                >
                                    <p className="px-4">{radio.name.split(' ').slice(0, 6)}</p>
                                    <p className="text-sm">
                                        {radio.countrycode}
                                    </p>
                                </button>
                            </motion.li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-text dark:dark-text">{t('no_results')}</p>
                ))}
            {radioList?.length >= 20 && (
                <motion.button
                    whileInView={{ opacity: 1 , transition: { delay: 0.1, duration: 0.5 }}}
                    initial={{ opacity: 0 }}
                    whileHover={{ boxShadow: '0 0px 40px 5px #FFC132' }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full text-lg bg-dark dark:bg-dark-selected font-bold text-white dark:text-darker h-24 w-24 mx-auto"
                    onClick={() => searchRadios(true)}
                >
                    {'+ ' + t('more')}
                </motion.button>
            )}
        </section>
    );
};

export default Search;
