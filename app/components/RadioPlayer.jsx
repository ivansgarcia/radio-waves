import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AudioControls from './AudioControls';
import { useTranslations } from 'next-intl';
import RadioPlayerHeader from './RadioPlayerHeader';
import RadioPlayerInfo from './RadioPlayerInfo';
import RadioPlayerNavigator from './RadioPlayerNavigator';

const RadioPlayer = ({ radio, favorites, setFavorites, setCurrentRadio }) => {
    const t = useTranslations('MainPage');

    const [radioError, setRadioError] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const showError = () => {
        setRadioError(true);
        setTimeout(() => {
            setRadioError(false);
            setCurrentRadio();
        }, 3000);
    };

    return (
        <motion.div
            animate={!collapsed ? { height: 'auto' } : { height: 'auto' }}
            transition={{ ease: 'easeOut', duration: 2 }}
            className={`rounded-t-2xl mb-12 gap-2 md:mb-0 bg-gradient-to-b text-text from-primary to-primary-darker text-center p-2 pb-4 md:p-4 flex flex-col items-center justify-around`}
        >
            <AnimatePresence>
                {radioError && (
                    <motion.p
                        animate={{
                            y: -110,
                            opacity: 1,
                            transition: { delay: 1 },
                        }}
                        initial={{ y: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-black p-4 rounded-full absolute text-white text-lg border-4 border-red-600"
                    >
                        {t('radio_error')}
                    </motion.p>
                )}
            </AnimatePresence>
            <RadioPlayerNavigator
                collapsed={collapsed}
                setCurrentRadio={setCurrentRadio}
                setCollapsed={setCollapsed}
            />
            <div
                className={`${collapsed ? 'flex-row' : 'flex-col'} flex gap-2 flex-wrap items-center w-full justify-center `}
            >
                <RadioPlayerHeader
                    collapsed={collapsed}
                    radio={radio}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
                <div
                    className={`${collapsed ? 'flex-row md:max-w-[70%]' : 'flex-col md:max-w-[80%]'} flex w-full  justify-center gap-[5%] items-center`}
                >
                    <RadioPlayerInfo collapsed={collapsed} radio={radio} />
                    <AudioControls url={radio.url} showError={showError} />
                </div>
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
