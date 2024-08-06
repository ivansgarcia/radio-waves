import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                // protocol: ,
                hostname: '**',
            }
        ]
    }
};

export default withNextIntl(nextConfig);
