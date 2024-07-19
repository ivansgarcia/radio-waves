'use client';
import { motion } from 'framer-motion';
import Image from "next/image";
import React from 'react';
import radioIcon from '../../public/radio.png';

const Presentation = () => {
    return (
        <motion.div
            animate={{ opacity: 0 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="hidden md:flex h-screen bg-black z-40 w-full fixed text-5xl text-primary justify-center items-center">
                <Image className="animate-pulse" src={radioIcon} alt="logo" width={180} height={180}/>
        </motion.div>
    );
};

export default Presentation;
