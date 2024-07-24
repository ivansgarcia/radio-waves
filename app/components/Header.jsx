import Image from "next/image"
import React from 'react'
import logo from '../../public/radio2.png';
import ThemeChanger from "./ThemeChanger";
import { Merienda } from "next/font/google"

const merienda = Merienda({ subsets: ['latin'], weight: '800'});

const Header = () => {
    return (
        <header className={`${merienda.className} flex italic gap-4 items-center w-full px-4 py-2 text-2xl md:text-4xl font-bold bg-gradient-to-b from-primary to-primary-darker text-primary-darker dark:text-primary`}>
            <div className="flex gap-4 justify-center items-center w-full">
                <Image className="h-12 w-12 md:h-16 md:w-16 p-1" src={logo} alt="radio world" width={50} height={50} />
                <p className="text-dark-secondary">RADIO WORLD</p>
            </div>
            <ThemeChanger/>
        </header>
    )
}

export default Header