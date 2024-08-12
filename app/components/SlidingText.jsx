import React from 'react';
import { motion } from 'framer-motion';

const SlidingText = ({ text, collapsed }) => {
    text = text?.split(' ').slice(0, 6).join(' ');

    if (text?.length > 28) {
        text = text.substring(0, 25) + '...';
    }

    return (
        <div
            className={`relative flex overflow-hidden ${collapsed ? 'text-xl ' : 'text-2xl'} w-full font-semibold sm:text-3xl max-w-xl`}
        >
            <motion.p
                className="w-full whitespace-nowrap"
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
                className="absolute right-0 hidden w-full whitespace-nowrap"
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
