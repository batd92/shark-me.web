'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from '@/lib/services/auth';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function WalletConnect() {
    const { address, isConnected, chainId } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessage, getSession, logout } = useAuth();
    const previousAddress = useRef<string | undefined>();

    const ensureCorrectNetwork = async () => {
        // BSC Testnet chainId = 97
        if (chainId !== 97) {
            try {
                await window.ethereum?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x61' }],
                });
                return true;
            } catch (error: any) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum?.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0x61',
                                chainName: 'BSC Testnet',
                                nativeCurrency: {
                                    name: 'BNB',
                                    symbol: 'tBNB',
                                    decimals: 18
                                },
                                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                                blockExplorerUrls: ['https://testnet.bscscan.com']
                            }]
                        });
                        return true;
                    } catch (addError) {
                        toast.error('Please add BSC Testnet to your wallet manually');
                        return false;
                    }
                }
                toast.error('Please switch to BSC Testnet');
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleAuth = async () => {
            // Case 1: Initial connection or wallet change
            if (isConnected && address && (!previousAddress.current || previousAddress.current !== address)) {
                const session = getSession();

                // Check if we already have a valid session for this address
                if (session?.address === address) {
                    previousAddress.current = address;
                    return;
                }

                // Ensure correct network before signing
                const isCorrectNetwork = await ensureCorrectNetwork();
                if (!isCorrectNetwork) {
                    disconnect();
                    return;
                }

                try {
                    await signMessage(address);
                    toast.success('Wallet authenticated successfully!');
                    previousAddress.current = address;
                } catch (error: any) {
                    if (error?.code === 4001) {
                        toast.error('Please sign the message to use the app');
                        disconnect();
                    } else {
                        toast.error('Authentication failed');
                        disconnect();
                    }
                }
            }

            // Case 2: Disconnection
            if (!isConnected && previousAddress.current) {
                previousAddress.current = undefined;
                // Don't logout here - keep the session
            }
        };

        // Network change handler
        const handleChainChanged = (chainId: string) => {
            const chainIdNumber = parseInt(chainId, 16);
            if (chainIdNumber !== 97) {
                toast.error('Please switch back to BSC Testnet');
                disconnect();
            }
        };

        if (typeof window !== 'undefined' && window.ethereum) {
            window.ethereum.on('chainChanged', handleChainChanged);
        }

        handleAuth();

        return () => {
            if (typeof window !== 'undefined' && window.ethereum) {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
        };
    }, [isConnected, address, chainId]);

    return <ConnectButton />;
}
