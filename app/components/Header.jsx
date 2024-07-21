import Image from "next/image"
import React from 'react'
import logo from '../../public/radio.png';
import ThemeChanger from "./ThemeChanger";

const Header = () => {
    return (
        <header className="flex italic gap-4 items-center w-full px-4 py-2 text-2xl md:text-4xl font-bold bg-gradient-to-t dark:from-dark from-light dark:to-text to-lighter md:justify-center text-primary-darker dark:text-primary">
            <div className="flex gap-4 justify-center items-center w-full">
                <Image className="h-8 w-8 md:h-16 md:w-16" src={logo} alt="radio world" width={50} height={50} />
                <p>RADIO WORLD</p>
            </div>
            <ThemeChanger/>
        </header>
    )
}

export default Header