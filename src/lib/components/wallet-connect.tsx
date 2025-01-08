'use client';

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
    DropdownMenu,
} from '@/lib/components/ui/dropdown-menu';

export function WalletConnect() {
    return (
        <DropdownMenu>
            <ConnectButton />
        </DropdownMenu>
    );
}
