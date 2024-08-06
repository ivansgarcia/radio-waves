import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from 'next/link';
import React from 'react';
import defaultRadioImage from '../../../public/on_air.png';

const RadioPlayerInfo = ({ collapsed, radio }) => {
    const t = useTranslations('MainPage');

    return (
        <div className="flex flex-col md:flex-row gap-2 justify-center md:m-2 xl:gap-8 items-center">
            <motion.figure
                className={`${collapsed ? 'p-0' : 'p-8 md:p-2'}`}
                animate={collapsed ? { width: 75 } : { width: 200 }}
            >
                <Image 
                    src={radio.favicon ? radio.favicon : defaultRadioImage}
                    alt="radio"
                    width={300}
                    height={300}

                />
            </motion.figure>
            <div
                className={`${collapsed ? 'hidden' : 'flex'} flex-wrap gap-4 gap-y-4 justify-center w-full items-center p-2 md:p-6`}
            >
                {radio.tags && (
                    <div
                        className={`${collapsed ? 'hidden' : 'flex'} flex-col md:flex-wrap w-full sm:w-2/5`}
                    >
                        <p className="italic hidden md:block">Tags:</p>
                        <ul className="flex flex-wrap gap-2 justify-center">
                            {radio.tags
                                .split(',')
                                .slice(0, 6)
                                .map((tag, index) => (
                                    <li
                                        key={index}
                                        className="text-sm md:text-lg px-2 w-auto rounded bg-dark-secondary text-lighter"
                                    >
                                        {tag}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
                {radio.homepage && (
                    <Link
                        className="items-center gap-4 block justify-center md:text-lg w-2/5 break-words text-blue-700 font-semibold"
                        target="_blank"
                        href={radio.homepage}
                    >
                        <span className="hidden font-normal italic md:block text-md text-black">
                            {t('homepage')}:
                        </span>
                        {radio.homepage.length > 40
                            ? radio.homepage.substring(0, 37) + '...'
                            : radio.homepage}
                    </Link>
                )}
                {radio.country && (
                    <p className="text-sm md:text-lg font-semibold flex items-center gap-4 justify-center w-2/5">
                        <span className="hidden italic md:block font-normal text-md">
                            {t('country')}:
                        </span>
                        {radio.country.length > 32
                            ? radio.country.substring(0, 32) + '...'
                            : radio.country}
                    </p>
                )}
                {!!radio.bitrate && (
                    <p className="text-sm md:text-lg flex items-center font-semibold gap-4 justify-center w-2/5">
                        <span className="hidden italic md:block text-md font-normal">
                            Bitrate:
                        </span>
                        {radio.bitrate} kbps
                    </p>
                )}
            </div>
        </div>
    );
};

export default RadioPlayerInfo;
