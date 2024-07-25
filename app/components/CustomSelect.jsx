import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const CustomSelect = ({ items, country, setCountry }) => {

    const [expanded, setExpanded] = useState(false);
    const t = useTranslations('MainPage');

    return (
        <div class="relative mt-2 w-72">
            <button
                onClick={() => setExpanded(!expanded)}
                class="relative w-full rounded-full bg-secondary dark:bg-dark-selected py-2.5 pl-3 pr-10 text-left text-darker shadow-sm  focus:outline-none focus:ring-2 focus:ring-primary sm:leading-6"
            >
                <span class="flex items-center">
                    <span class="ml-3 block truncate">
                        {country === 'ALL' ? t('all') : items[country]}
                    </span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-2 ml-3 flex items-center pr-2">
                    <svg
                        class="h-5 w-5 text-text"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </button>

            <ul class={`${expanded ? 'block' : 'hidden'} text-dark absolute z-10 mt-3 max-h-96 w-full overflow-auto rounded-lg text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-light dark:bg-selected`}>
                <li class="relative cursor-default select-none pl-4 pr-9 hover:bg-primary">
                    <button
                        onClick={() => {
                            setCountry('ALL');
                            setExpanded(false);
                        }}
                        class="w-full text-left py-2"
                    >
                        <span class="ml-3 block truncate font-normal">
                            {t('all')}
                        </span>
                    </button>
                </li>
                {Object.keys(items).map((k, index) => (
                    <li
                        key={index}
                        class="relative cursor-default pl-4 pr-9 hover:bg-primary rounded-xl"
                    >
                        <button
                            onClick={() => {
                                setCountry(k);
                                setExpanded(false);
                            }}
                            class="w-full text-left py-2"
                        >
                            <span class="ml-3 block scroll truncate font-normal">
                                {items[k]}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomSelect;
