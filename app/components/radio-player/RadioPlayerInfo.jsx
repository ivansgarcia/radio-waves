import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import defaultRadioImage from '../../../public/on_air.png';

const RadioPlayerInfo = ({ collapsed, radio }) => {
    const t = useTranslations('MainPage');

    return (
        <div className="flex flex-col items-center justify-center gap-2 md:m-2 md:flex-row xl:gap-8">
            <motion.figure
                className={`${collapsed ? 'p-0' : '-m-6 p-8 md:-m-2 md:p-2'}`}
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
                className={`${collapsed ? 'hidden' : 'flex'} w-full flex-wrap items-center justify-around gap-4 gap-y-4 p-2 md:p-6`}
            >
                {radio.tags && (
                    <div
                        className={`${collapsed ? 'hidden' : 'flex'} w-full flex-col sm:w-2/5 md:flex-wrap`}
                    >
                        <p className="hidden italic md:block">Tags:</p>
                        <ul className="flex flex-wrap justify-center gap-2">
                            {radio.tags
                                .split(',')
                                .slice(0, 6)
                                .map((tag, index) => (
                                    <li
                                        key={index}
                                        className="w-auto rounded bg-dark-secondary px-2 text-sm text-lighter md:text-lg"
                                    >
                                        {tag}
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
                {radio.homepage && (
                    <Link
                        className="block items-center justify-center gap-4 break-words font-semibold text-blue-700 md:text-lg"
                        target="_blank"
                        href={radio.homepage}
                    >
                        <span className="text-md hidden font-normal italic text-black md:block">
                            {t('homepage')}:
                        </span>
                        {radio.homepage.length > 40
                            ? radio.homepage.substring(0, 37) + '...'
                            : radio.homepage}
                    </Link>
                )}
                {radio.country && (
                    <p className="flex w-2/5 items-center justify-center gap-4 text-sm font-semibold md:text-lg">
                        <span className="text-md hidden font-normal italic md:block">
                            {t('country')}:
                        </span>
                        {radio.country.length > 32
                            ? radio.country.substring(0, 32) + '...'
                            : radio.country}
                    </p>
                )}
                {!!radio.bitrate && (
                    <p className="flex w-2/5 items-center justify-center gap-4 text-sm font-semibold md:text-lg">
                        <span className="text-md hidden font-normal italic md:block">
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
