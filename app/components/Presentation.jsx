'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from "next/image";
import React from 'react';
import radioIcon from '../../public/radio2.png';

const Presentation = () => {
    return (
        <motion.div
            animate={{ opacity: 0, display: 'none' }}
            transition={{ delay: 2, duration: 0.5 }}
            // onAnimationEnd={{ display: 'none'}}
            className="hidden md:flex h-screen bg-gradient-to-br from-lighter to-light dark:from-darker dark:to-dark z-40 w-full fixed text-5xl justify-center items-center">
                    <motion.div
                        animate={{ scale: [0, 1, 1, 0] }}
                        transition={{ duration: 2,  times:[0, 0.1, 0.9, 1]}}
                        initial={{ scale: 0 }}
                        className="w-72 h-72 bg-primary rounded-full flex justify-center items-center shadow-xl"
                    >
                        <Image className="" src={radioIcon} alt="logo" width={180} height={180}/>
                    </motion.div>
        </motion.div>
    );
};

export default Presentation;
