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
            <motion.div whileTap={{ scale: 0 }}>
                <Image
                    src={theme === 'light' ? darkIcon : lightIcon}
                    alt="light theme"
                    width={30}
                    height={30}
                />
            </motion.div>
        </button>
    );
};

export default ThemeChanger;
