import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import lightIcon from '../../public/sun.png';
import darkIcon from '../../public/moon.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();

    const [currentTheme, setCurrentTheme] = useState();

    useEffect(() => {
        setCurrentTheme(theme);
    }, [theme]);

    return (
        <button
            onClick={() =>
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }
        >
            <motion.div whileTap={{ scale: 0 }}>
                <Image
                    src={currentTheme === 'light' ? darkIcon : lightIcon}
                    alt="light theme"
                    width={30}
                    height={30}
                />
            </motion.div>
        </button>
    );
};

export default ThemeChanger;
