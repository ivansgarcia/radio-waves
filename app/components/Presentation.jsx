'use client';
import { motion } from 'framer-motion';
import Image from "next/image";
import React from 'react';
import radioIcon from '../../public/radio.png';

const Presentation = () => {
    return (
        <motion.div
            animate={{ opacity: 0, display: 'none' }}
            transition={{ delay: 2, duration: 0.5 }}
            // onAnimationEnd={{ display: 'none'}}
            className="hidden md:flex h-screen bg-gradient-to-br from-lighter to-light dark:from-darker dark:to-dark z-40 w-full fixed text-5xl justify-center items-center">
                <Image className="animate-pulse" src={radioIcon} alt="logo" width={180} height={180}/>
        </motion.div>
    );
};

export default Presentation;
