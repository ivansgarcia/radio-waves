'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import radioIcon from '../../public/waves.png';
import { Merienda } from 'next/font/google';
import { useTranslations } from 'next-intl';

const merienda = Merienda({ subsets: ['latin'], weight: '800' });

const Presentation = () => {
    const t = useTranslations('MainPage');

    return (
        <motion.div
            animate={{ opacity: 0, display: 'none' }}
            transition={{ delay: 3, duration: 0.5 }}
            className="fixed top-0 z-50 flex h-screen w-full items-center bg-white dark:bg-dark mobile:hidden"
        >
            <motion.div
                animate={{ x: '-100%' }}
                transition={{ delay: 2, duration: 0.5, display: 'none' }}
                className="flex h-full w-[55%] flex-col items-center justify-center gap-8 bg-primary pb-24 shadow-xl"
            >
                <Image
                    priority
                    className="mx-[10%] w-40 self-start rounded-full p-6 shadow-[0_0px_80px_rgba(255,255,255,1)] dark:shadow-[0_0px_10px_rgba(0,0,0,0.5)] lg:w-52"
                    src={radioIcon}
                    alt="logo"
                    width={180}
                    height={180}
                />
                <div className={merienda.className}>
                    <h1 className="text-[5rem] font-extrabold italic text-dark lg:text-8xl xl:text-9xl">
                        RADIO
                    </h1>
                    <h2 className="ml-24 text-[5rem] font-bold text-white dark:drop-shadow-none lg:text-8xl xl:text-9xl">
                        Waves
                    </h2>
                </div>
            </motion.div>
            <motion.div
                animate={{ opacity: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="flex w-[45%] items-center justify-center"
            >
                <p className="m-[10%] text-center text-3xl font-semibold text-darker dark:text-lighter lg:text-4xl">
                    {t('presentation')}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Presentation;
