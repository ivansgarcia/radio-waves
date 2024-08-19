import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../../public/waves.png';
import ThemeChanger from './ThemeChanger';
import { Merienda } from 'next/font/google';
import { motion } from 'framer-motion';

const merienda = Merienda({ subsets: ['latin'], weight: '800' });

const headerAnimation = {
    onScreen: {
        height: '75px',
        fontSize: '2.25rem',
    },
    outScreen: {
        height: '50px',
        fontSize: '1.5rem',
    },
};

const logoAnimation = {
    onScreen: {
        height: '60px',
        width: '60px',
        border: '8px solid #ffc132',
    },
    outScreen: {
        height: '35px',
        width: '35px',
        border: '4px solid #ffc132',
    },
};

const titleAnimation = {
    onScreen: {
        width: '95%',
    },
    outScreen: {
        width: '250px',
    },
};

const Header = () => {
    const [isMobile, setIsMobile] = useState();

    const handleResize = () => {
        window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
    };

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.header
            whileInView="onScreen"
            viewport={{ amount: 'all' }}
            initial="outScreen"
            className={`${merienda.className} z-40 w-full`}
        >
            <motion.div
                variants={!isMobile && headerAnimation}
                transition={{ duration: 0.5 }}
                className="fixed flex h-14 w-full items-center justify-between gap-4 bg-primary px-4 py-2 text-2xl font-bold italic"
            >
                <motion.div
                    variants={!isMobile && titleAnimation}
                    transition={{ duration: 0.5 }}
                    className="flex flex-1 items-center justify-center gap-4 md:flex-none"
                >
                    <motion.figure
                        variants={!isMobile && logoAnimation}
                        className="relative flex h-10 w-10 rounded-full border-4 border-primary shadow-[0_0px_10px_rgba(0,0,0,0.2)]"
                    >
                        <Image
                            className="object-cover"
                            src={logo}
                            alt="radio world"
                            fill
                            sizes="100%"
                        />
                    </motion.figure>
                    <p className="text-dark">
                        RADIO <span>Waves</span>
                    </p>
                </motion.div>
                <ThemeChanger />
            </motion.div>
        </motion.header>
    );
};

export default Header;
