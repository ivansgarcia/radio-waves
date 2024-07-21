import { NextIntlClientProvider } from 'next-intl';
import {
    getMessages,
    getTranslations,
    unstable_setRequestLocale,
} from 'next-intl/server';
import { locales } from '@/config';
import Presentation from '../components/Presentation';
import { ThemeProvider } from "next-themes";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'LocaleLayout' });

    return {
        title: t('title'),
    };
}

export default async function LocaleLayout({ children, params: { locale } }) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="bg-gradient-to-b from-lighter to-light dark:from-darker dark:to-dark h-full min-h-screen">
                <Presentation />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider attribute="class">{children}</ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
