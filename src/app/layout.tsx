// RootLayout.tsx
import { headers } from "next/headers";
import { Toaster } from '@/lib/components/ui/toaster';
import Layout from '@/lib/layout';
import { cn } from '@/lib/styles/utils';
import { fontSans } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';
import "@rainbow-me/rainbowkit/styles.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import type { Metadata } from "next";
import Providers from '@/lib/components/providers';

export const metadata: Metadata = {
    title: "APT92 | Rainbowkit + Wagmi + SharkMe",
    description: "APT92 | SharkMe App",
    icons: {
        icon: "/icon.svg",
    },
};

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
    const cookie = headers().get("cookie");

    return (
        <html lang="en">
            <body className={cn(fontSans.variable, 'font-sans')}>
                <Providers cookie={cookie}>
                    <Theme>
                        <Layout>{children}</Layout>
                    </Theme>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
