import Image from 'next/image';
import React from 'react';
import logo from '../../public/waves.png';
import ThemeChanger from './ThemeChanger';
import { Merienda } from 'next/font/google';
import { motion } from 'framer-motion';

const merienda = Merienda({ subsets: ['latin'], weight: '800' });

const Header = () => {
    return (
        <motion.header
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 'all' }}
            initial={{ opacity: 0 }}
            className={`${merienda.className} fixed z-50 flex w-full items-center gap-4 bg-primary px-4 text-2xl font-bold italic md:static md:py-2 md:text-4xl`}
        >
            <div className="flex w-full items-center justify-center gap-4 font-[800]">
                <Image
                    className="m-1 h-10 w-10 rounded-full p-1.5 shadow-[0_0px_80px_rgba(255,255,255,1)] dark:shadow-[0_0px_10px_rgba(0,0,0,0.5)] md:h-16 md:w-16 md:p-2.5"
                    src={logo}
                    alt="radio world"
                    width={50}
                    height={50}
                />
                <p className="text-dark">
                    RADIO{' '}
                    <span className="text-3xl not-italic text-white md:text-5xl">
                        Waves
                    </span>
                </p>
            </div>
            <ThemeChanger />
        </motion.header>
    );
};

export default Header;
