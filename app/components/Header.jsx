import Image from "next/image"
import React from 'react'
import logo from '../../public/logo.png';

const Header = () => {
    return (
        <header className="flex gap-4 items-center w-full p-4 text-2xl font-bold bg-slate-400">
            <Image src={logo} alt="radio world" width={30} height={30} />
            <p>Radio World</p>
        </header>
    )
}

export default Header