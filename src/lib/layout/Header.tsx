import Link from 'next/link';

import { ThemeToggle } from '@/lib/components/theme-toggle';
import { WalletConnect } from '../components/wallet-connect';

import AppMenu from './AppMenu';

const Header = () => {
    return (
        <header className="flex h-24 w-full items-center">
            <div className="flex-[60%]">
                <Link href="/">
                    <h1 className="text-base font-bold md:text-xl">
                        Public APTs
                    </h1>
                    <p className="text-xs text-gray-500">
                        Find some public anything you want.
                    </p>
                </Link>
            </div>
            <div className="ml-auto flex flex-[40%] items-center justify-end gap-2 text-right">
                <AppMenu />
                <WalletConnect />
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
