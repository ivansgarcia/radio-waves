import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';
import lightIcon from '../../public/sun.png';
import darkIcon from '../../public/moon.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        theme !== 'dark' && theme !== 'light' && setTheme('light');
    }, [setTheme, theme]);

    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <motion.figure className="relative" whileTap={{ scale: 0 }}>
                <Image
                    className="invisible dark:visible"
                    src={lightIcon}
                    alt="light theme"
                    width={25}
                    height={25}
                />
                <Image
                    className="absolute top-0 dark:invisible"
                    src={darkIcon}
                    alt="dark theme"
                    width={25}
                    height={25}
                />
            </motion.figure>
        </button>
    );
};

export default ThemeChanger;
