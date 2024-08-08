import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

const CustomSelect = ({ items, searchRadios }) => {
    const [expanded, setExpanded] = useState(false);
    const [country, setCountry] = useState('ALL');
    const t = useTranslations('MainPage');

    const dropdown = useRef(null);

    useEffect(() => {
        if (!expanded) return;
        function handleClick(event) {
            if (dropdown.current && !dropdown.current.contains(event.target)) {
                setExpanded(false);
            }
        }
        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [expanded]);

    return (
        <div class="relative mt-2 w-72">
            <button
                onClick={() => setExpanded(!expanded)}
                class={`${expanded && 'pointer-events-none'} relative w-full rounded-full bg-secondary py-2.5 pl-3 pr-10 text-left text-darker shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-selected sm:leading-6 md:text-lg`}
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
            {expanded && (
                <ul
                    ref={dropdown}
                    class={`absolute z-50 mt-3 max-h-[35vh] w-full overflow-auto rounded-lg bg-light text-base text-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-selected`}
                >
                    <li class="relative cursor-default select-none pl-4 pr-9 hover:bg-primary">
                        <button
                            onClick={() => {
                                setCountry('ALL');
                                searchRadios(false, 'ALL');
                                setExpanded(false);
                            }}
                            class="w-full py-2 text-left"
                        >
                            <span class="ml-3 block truncate font-normal">
                                {t('all')}
                            </span>
                        </button>
                    </li>
                    {Object.values(items)
                        .sort()
                        .map((k, index) => (
                            <li
                                key={index}
                                class="relative cursor-default rounded-xl pl-4 pr-9 hover:bg-primary"
                            >
                                <button
                                    onClick={() => {
                                        setCountry(
                                            Object.keys(items).find(
                                                (key) => items[key] === k
                                            )
                                        );
                                        searchRadios(
                                            false,
                                            Object.keys(items).find(
                                                (key) => items[key] === k
                                            )
                                        );
                                        setExpanded(false);
                                    }}
                                    class="w-full py-2 text-left"
                                >
                                    <span class="scroll ml-3 block truncate font-normal">
                                        {k}
                                    </span>
                                </button>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
