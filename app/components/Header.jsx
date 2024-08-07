import Image from 'next/image';
import React from 'react';
import logo from '../../public/waves.png';
import ThemeChanger from './ThemeChanger';
import { Merienda } from 'next/font/google';
import { motion } from "framer-motion";

const merienda = Merienda({ subsets: ['latin'], weight: '800' });

const Header = () => {
    return (
        <motion.header
            whileInView={{ opacity: 1 }}
            viewport={{ amount:"all"}}
            initial={{ opacity: 0 }}
            className={`${merienda.className} flex fixed z-50 md:static italic gap-4 items-center w-full px-4 md:py-2 text-2xl md:text-4xl font-bold bg-primary`}
        >
            <div className="flex gap-4 justify-center font-[800] items-center w-full">
                <Image
                    className="h-10 w-10 md:h-16 md:w-16 p-1.5 md:p-2.5 m-1 shadow-[0_0px_80px_rgba(255,255,255,1)] rounded-full dark:shadow-[0_0px_10px_rgba(0,0,0,0.5)]"
                    src={logo}
                    alt="radio world"
                    width={50}
                    height={50}
                />
                <p className="text-dark">
                    RADIO <span className="text-white not-italic text-3xl md:text-5xl">Waves</span>
                </p>
            </div>
            <ThemeChanger />
        </motion.header>
    );
};

export default Header;
