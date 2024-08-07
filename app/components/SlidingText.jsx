import React from 'react';
import { motion } from 'framer-motion';

const SlidingText = ({ text, collapsed }) => {
    text = text?.split(' ').slice(0, 6).join(' ');

    if (text?.length > 33) {
        text = text.substring(0, 30) + '...';
    }

    return (
        <div
            className={`w-72
            lg:w-96 flex overflow-hidden text-2xl md:text-3xl font-semibold relative`}
        >
            <motion.p
                className="whitespace-nowrap w-full"
                animate={{
                    x: ['100%', '-200%'],
                    transition: {
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 10,
                            ease: 'linear',
                        },
                    },
                }}
            >
                {text}
            </motion.p>
            <motion.p
                className="whitespace-nowrap hidden absolute w-full"
                animate={{
                    x: ['100%', '-200%'],
                    display: 'block',
                    transition: {
                        x: {
                            delay: 5,
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 10,
                            ease: 'linear',
                        },
                        display: {
                            delay: 5,
                        },
                    },
                }}
            >
                {text}
            </motion.p>
        </div>
    );
};

export default SlidingText;
