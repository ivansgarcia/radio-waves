import Image from "next/image"
import React from 'react'
import logo from '../../public/logo.png';

const Header = () => {
    return (
        <header className="flex gap-4 items-center w-full px-4 py-2 text-2xl md:text-4xl font-bold bg-secondary md:justify-center md:bg-dark text-primary">
            <Image className="h-8 w-8 md:h-16 md:w-16" src={logo} alt="radio world" width={50} height={50} />
            <p>Radio World</p>
        </header>
    )
}

export default Header