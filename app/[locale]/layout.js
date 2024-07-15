import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import {locales} from '@/config';

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

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="bg-gradient-to-br from-black to-dark h-full min-h-screen">
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
