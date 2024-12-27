import { ThemeProvider } from '@/lib/components/theme-provider';
import { Toaster } from '@/lib/components/ui/toaster';
import Layout from '@/lib/layout';
import { fontSans } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';
import { cn } from '@/lib/styles/utils';
import BotScriptLoader from '@/lib/scripts/BotScriptLoader';

export { metadata, viewport } from '@/lib/constants/root_metadata';

type RootLayoutProps = {
    children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en">
            <body className={cn(fontSans.variable, 'font-sans')}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <Layout>{children}</Layout>
                    <Toaster />
                </ThemeProvider>
            </body>
            <BotScriptLoader />
        </html>
    );
};

export default RootLayout;
