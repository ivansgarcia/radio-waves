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

    const getOs = () => {
        const os = ['iPhone'];
        return os.find((v) => navigator?.userAgent.indexOf(v) >= 0);
    };

    const isIos = getOs() === 'iPhone';

    return (
        <motion.div
            animate={!collapsed ? { height: 'auto' } : { height: 'auto' }}
            transition={{ ease: 'easeOut', duration: 2 }}
            className={`${isIos ? 'mb-16' : 'mb-12'} ${!collapsed && 'mobile:mb-0 mobile:!h-screen'} z-50 flex flex-col items-center justify-around gap-2 rounded-t-2xl bg-primary bg-gradient-to-b p-2 px-4 pb-4 text-center text-text shadow-lg md:mb-0 md:p-4 md:px-[5%]`}
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
                        className="absolute z-50 rounded-full border-4 border-red bg-black p-4 text-lg text-white"
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
                className={`${collapsed ? 'flex-row' : isIos ? 'flex-col mobile:pb-16' : 'flex-col mobile:pb-8'} relative flex w-full flex-wrap justify-around gap-1 sm:items-center sm:justify-around mobile:h-full`}
            >
                <RadioPlayerHeader
                    collapsed={collapsed}
                    radio={radio}
                    favorites={favorites}
                    setFavorites={setFavorites}
                />

                <RadioPlayerInfo collapsed={collapsed} radio={radio} />
                <AudioControls
                    url={radio.url}
                    altUrl={radio.url_resolved}
                    showError={showError}
                    collapsed={collapsed}
                />
            </div>
        </motion.div>
    );
};

export default RadioPlayer;
