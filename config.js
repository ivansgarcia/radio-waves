import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'en';
export const locales = ['en', 'es'];

export const pathnames = {
    '/': '/',
    '/pathnames': {
        en: '/pathnames',
        de: '/pfadnamen',
    },
};

export const localePrefix = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${port}`;
