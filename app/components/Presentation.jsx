'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import radioIcon from '../../public/waves.png';
import { Merienda } from "next/font/google";

const merienda = Merienda({ subsets: ['latin'], weight: '800'});

const Presentation = () => {
    return (
        <motion.div
            animate={{ opacity: 0, display: 'none' }}
            transition={{ delay: 3, duration: 0.5 }}
            className="flex fixed bg-white dark:bg-dark top-0 items-center w-full h-screen z-40"
        >
            <motion.div
                animate={{ x: '-100%'}}
                transition={{ delay: 2, duration: 0.5, display: 'none' }}
                className="flex bg-primary shadow-xl flex-col justify-center items-center h-full pb-24 gap-8 w-[55%]"
            >
                <Image
                    priority
                    className="shadow-[0_0px_80px_rgba(255,255,255,1)] self-start mx-[10%] dark:shadow-[0_0px_10px_rgba(0,0,0,0.5)] rounded-full p-6"
                    src={radioIcon}
                    alt="logo"
                    width={180}
                    height={180}
                />
                <div className={merienda.className}>
                    <h1 className="text-8xl xl:text-9xl text-dark italic font-extrabold ">
                        RADIO
                    </h1>
                    <h2 className="text-8xl xl:text-9xl drop-shadow-[0_0px_10px_rgba(255,255,255,0.5)] dark:drop-shadow-none text-white ml-24 font-bold">
                        Waves
                    </h2>
                </div>
            </motion.div>
            <motion.div
                animate={{ opacity: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="flex justify-center items-center w-[45%]"
            >
                <p className="text-4xl text-darker dark:text-lighter font-semibold m-[10%] text-center">
                    Explore radio stations over the world
                </p>
            </motion.div>
        </motion.div>
    );
};

export default Presentation;
