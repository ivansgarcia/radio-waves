import Image from "next/image"
import React from 'react'
import logo from '../../public/waves.png';
import ThemeChanger from "./ThemeChanger";
import { Merienda } from "next/font/google"

const merienda = Merienda({ subsets: ['latin'], weight: '800'});

const Header = () => {
    return (
        <header className={`${merienda.className} flex fixed z-50 md:static italic gap-4 items-center w-full px-4 md:py-2 text-2xl md:text-4xl font-bold bg-primary`}>
            <div className="flex gap-4 justify-center font-[800] items-center w-full">
                <Image className="h-10 w-10 md:h-16 md:w-16 p-2.5 m-1 shadow-[0_0px_80px_rgba(255,255,255,1)] rounded-full dark:shadow-[0_0px_10px_rgba(0,0,0,0.5)]" src={logo} alt="radio world" width={50} height={50} />
                <p className="text-dark">RADIO <span className="text-white not-italic">Waves</span></p>
            </div>
            <ThemeChanger/>
        </header>
    )
}

export default Header