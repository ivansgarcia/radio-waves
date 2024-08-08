import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    unstable_setRequestLocale,
} from 'next-intl/server';
import { locales } from '@/config';
import { ThemeProvider } from 'next-themes';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

    return {
        title: t('title'),
        description: t('description'),
        manifest: '/manifest.json',
    };
}

export default async function LocaleLayout({ children, params: { locale } }) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${openSans.className} h-full min-h-screen transition-colors duration-1000`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class">{children}</ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
