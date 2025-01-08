import type { Metadata, Viewport } from 'next';

const creator = 'BaTD APT';
const baseUrl = 'https://publicapis.sznm.dev';
const appName = 'Public APTs';
const description = 'Find Public APTs for your next projects.';

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    applicationName: appName,
    authors: { name: 'apt' },
    creator,
    publisher: creator,
    generator: 'Next.js',
    keywords: [appName],
    referrer: 'origin-when-cross-origin',
    icons: {
        icon: 'https://sznm.dev/app_icons/pub-apis.svg',
    },
    appleWebApp: {
        title: 'pub-apis',
        statusBarStyle: 'default',
    },
    formatDetection: {
        telephone: false,
    },
    manifest: '/manifest.json',
    title: {
        default: appName,
        template: '%s | Public APTs',
    },
    description,
    openGraph: {
        url: '',
        title: appName,
        description,
        images: [],
        siteName: 'apt',
    },
    twitter: {},
};

export const viewport: Viewport = {
    colorScheme: 'dark light',
};
