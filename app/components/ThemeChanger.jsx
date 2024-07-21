import { useTheme } from "next-themes"
import React from 'react';
import lightIcon from '../../public/sun.png'
import darkIcon from '../../public/moon.png'
import Image from "next/image";

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();

    console.log(theme);

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className=""
        >
            <Image src={theme === 'light' ? darkIcon : lightIcon} alt="light theme" width={30} height={30} />
        </button>
    )
}

export default ThemeChanger