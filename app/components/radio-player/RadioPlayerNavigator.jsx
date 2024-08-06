import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import closeIcon from '../../../public/close.png';
import upIcon from '../../../public/up.png';

const RadioPlayerNavigator = ({ collapsed, setCollapsed, setCurrentRadio }) => {
    return (
        <nav
            className={`flex items-center justify-between w-full ${!collapsed ? 'p-2 lg:p-3' : 'p-1 md:p-0'}`}
        >
            <motion.button
                initial={{ rotate: 0 }}
                animate={collapsed ? { rotate: 0 } : { rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
                onClick={() => setCollapsed(!collapsed)}
            >
                <Image
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    src={upIcon}
                    alt="expand"
                    width={30}
                    height={30}
                />
            </motion.button>
            <button
                className="margin-left-auto"
                onClick={() => setCurrentRadio()}
            >
                <Image
                    className="w-4 h-4 md:w-5 md:h-5"
                    src={closeIcon}
                    alt="close player"
                    width={30}
                    height={30}
                />
            </button>
        </nav>
    );
};

export default RadioPlayerNavigator;
