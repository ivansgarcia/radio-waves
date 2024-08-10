import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Spinner from './Spinner';
import { useTranslations } from 'next-intl';

const Top = ({ setCurrentRadio }) => {
    const t = useTranslations('MainPage');

    const [topList, setTopList] = useState([]);
    const [mode, setMode] = useState('votes');
    const [loading, setLoading] = useState(false);

    const getTopList = useCallback(
        (list = []) => {
            setLoading(true);
            !list.length && setTopList();
            const url = {
                votes: 'http://de1.api.radio-browser.info/json/stations/topvote',
                clicks: 'http://de1.api.radio-browser.info/json/stations/lastclick',
            };
            axios
                .get(url[mode], {
                    params: {
                        limit: 20,
                        hidebroken: true,
                        offset: list.length,
                    },
                })
                .then((result) => {
                    const newTopList = list.concat(result.data);
                    setTopList(newTopList);
                    setLoading(false);
                });
        },
        [mode]
    );

    useEffect(() => {
        getTopList();
    }, [getTopList]);

    const selectorPosition = {
        votes: 'justify-start',
        clicks: 'justify-end',
    };

    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-8 pb-80 pt-8 text-text">
            <div className="relative flex w-full items-center justify-around text-2xl font-semibold md:text-3xl">
                <div
                    className={`${selectorPosition[mode]} pointer-events-none absolute flex h-full w-full items-end`}
                >
                    <motion.div
                        layout
                        className="h-1 w-1/2 bg-primary-darker dark:bg-primary"
                    ></motion.div>
                </div>
                <button
                    onClick={() => setMode('votes')}
                    className={`${mode === 'clicks' ? 'text-dark-selected dark:text-dark-selected' : 'text-primary-darker dark:text-primary'} h-full w-1/2 p-2`}
                >
                    {t('top')}
                </button>
                <button
                    onClick={() => setMode('clicks')}
                    className={`${mode === 'votes' ? 'text-dark-selected dark:text-dark-selected' : 'text-primary-darker dark:text-primary'} h-full w-1/2 p-2`}
                >
                    {t('trending')}
                </button>
            </div>
            {!!topList?.length && (
                <ul className="flex w-full max-w-xl flex-col gap-2">
                    {topList.map((radio, index) => (
                        <motion.li
                            animate={{ y: 0, opacity: 1 }}
                            initial={{ y: 50, opacity: 0 }}
                            transition={{
                                delay:
                                    0.2 + 0.1 * (index - topList.length + 20),
                            }}
                            key={index}
                        >
                            <button
                                className="element flex w-full items-center justify-between gap-4 p-4"
                                onClick={() => setCurrentRadio(radio)}
                            >
                                <p className="break-all">{radio.name.split(' ').slice(0, 7)}</p>
                                <p className="text-sm">{radio.countrycode}</p>
                            </button>
                        </motion.li>
                    ))}
                </ul>
            )}
            {loading ? (
                <Spinner size="big" />
            ) : (
                <motion.button
                    whileInView={{
                        opacity: 1,
                        transition: { delay: 0.1, duration: 0.5 },
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ boxShadow: '0 5px 20px #4E4E4E80' }}
                    whileTap={{ scale: 0.95 }}
                    className="mx-auto my-8 h-24 w-24 rounded-full bg-dark-secondary font-bold text-white dark:bg-dark-selected dark:text-darker"
                    onClick={() => getTopList(topList)}
                >
                    {'+ ' + t('more')}
                </motion.button>
            )}
        </section>
    );
};

export default Top;
