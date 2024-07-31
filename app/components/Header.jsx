import Image from "next/image"
import React from 'react'
import logo from '../../public/waves.png';
import ThemeChanger from "./ThemeChanger";
import { Merienda } from "next/font/google"

const merienda = Merienda({ subsets: ['latin'], weight: '800'});

const Header = () => {
    return (
        <header className={`${merienda.className} flex fixed z-30 md:static italic gap-4 items-center w-full px-4 md:py-2 text-2xl md:text-4xl font-bold bg-primary`}>
            <div className="flex gap-4 justify-center font-[800] items-center w-full">
                <Image className="h-10 w-10 md:h-16 md:w-16 p-1.5 m-1 border md:border-2 rounded-full border-dark-secondary" src={logo} alt="radio world" width={50} height={50} />
                <p className="text-dark">RADIO <span className="text-white not-italic">Waves</span></p>
            </div>
            <ThemeChanger/>
        </header>
    )
}

export default Header