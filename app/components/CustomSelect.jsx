import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';

const isMobile = () =>
    typeof window !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

const CustomSelect = ({ items, searchRadios }) => {
    const [expanded, setExpanded] = useState(false);
    const [country, setCountry] = useState('ALL');
    const [filter, setFilter] = useState('');
    const t = useTranslations('MainPage');

    const dropdown = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!expanded) return;
        function handleClick(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpanded(false);
                setFilter('');
            }
        }
        window.addEventListener('mousedown', handleClick);
        return () => {
            window.removeEventListener('mousedown', handleClick);
        };
    }, [expanded]);

    const filteredItems = Object.entries(items)
        .filter(([key, value]) =>
            value.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => a[1].localeCompare(b[1]));

    return (
        <div ref={containerRef} className="relative mt-2 w-72">
            <div className="relative w-full">
                {expanded ? (
                    <input
                        autoFocus={!isMobile()}
                        type="text"
                        placeholder={t('search_country')}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full rounded-full bg-secondary py-2.5 pl-3 pr-10 text-left text-darker placeholder-dark-selected shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-selected dark:placeholder-dark-secondary sm:leading-6 md:text-lg"
                        onBlur={e => {
                            // Solo cerrar si el nuevo foco está fuera del contenedor
                            if (!containerRef.current.contains(e.relatedTarget)) {
                                setTimeout(() => setExpanded(false), 150);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                setExpanded(false);
                                setFilter('');
                            }
                        }}
                    />
                ) : (
                    <button
                        onClick={() => {
                            setExpanded(true);
                        }}
                        className="relative w-full rounded-full bg-secondary py-2.5 pl-3 pr-10 text-left text-darker shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-selected sm:leading-6 md:text-lg"
                    >
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">
                                {country === 'ALL' ? t('all') : items[country]}
                            </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-2 ml-3 flex items-center pr-2">
                            <svg
                                className="h-5 w-5 text-text"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
            {expanded && (
                <ul
                    ref={dropdown}
                    className={`absolute z-50 mt-3 max-h-[35vh] w-full overflow-auto rounded-lg bg-light text-base text-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-selected`}
                >
                    <li className="relative cursor-default select-none pl-4 pr-9 hover:bg-primary">
                        <button
                            onClick={() => {
                                setCountry('ALL');
                                searchRadios(false, 'ALL');
                                setExpanded(false);
                                setFilter('');
                            }}
                            className="w-full py-2 text-left"
                        >
                            <span className="ml-3 block truncate font-normal">
                                {t('all')}
                            </span>
                        </button>
                    </li>
                    {filteredItems.length === 0 && (
                        <li className="text-gray-400 px-4 py-2">
                            {t('no_results') || 'Sin resultados'}
                        </li>
                    )}
                    {filteredItems.map(([key, value], index) => (
                        <li
                            key={key}
                            className="relative cursor-default rounded-xl pl-4 pr-9 hover:bg-primary"
                        >
                            <button
                                onClick={() => {
                                    setCountry(key);
                                    searchRadios(false, key);
                                    setExpanded(false);
                                    setFilter('');
                                }}
                                className="w-full py-2 text-left"
                            >
                                <span className="scroll ml-3 block truncate font-normal">
                                    {value}
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
