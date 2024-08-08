import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AudioControls from '../AudioControls';
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
            className={`mb-12 flex flex-col items-center justify-around gap-2 rounded-t-2xl bg-gradient-to-b from-primary to-primary-darker p-2 pb-4 text-center text-text md:mb-0 md:p-4`}
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
                        className="absolute z-50 rounded-full border-4 border-red-600 bg-black p-4 text-lg text-white"
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
                className={`${collapsed ? 'flex-row' : 'flex-col'} relative flex w-full flex-wrap items-center justify-center gap-0`}
            >
                <RadioPlayerHeader
                    collapsed={collapsed}
                    radio={radio}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />
                <div
                    className={`${collapsed ? 'flex-row md:max-w-[70%]' : 'my-4 flex-col md:max-w-[80%]'} flex w-full items-center justify-center gap-2 sm:gap-[5%]`}
                >
                    <RadioPlayerInfo collapsed={collapsed} radio={radio} />
                    <AudioControls url={radio.url} showError={showError} />
                </div>
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
