'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/lib/services/auth';
import { DEFAULT_CHAIN_ID } from '@/lib/config/constants';
import { getChainConfig } from '@/lib/config/chains';
import { toast } from 'sonner';

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { getSession, signMessage, logout } = useAuth();

  const targetChain = useMemo(() => getChainConfig(DEFAULT_CHAIN_ID), []);
  const isWrongNetwork = chain?.id !== targetChain.id;

  const handleSwitchNetwork = useCallback(async () => {
    if (!isWrongNetwork) return;
    
    try {
      await switchChain({ chainId: targetChain.id });
    } catch (error) {
      console.error('Failed to switch network:', error);
      toast.error(`Vui lòng chuyển sang mạng ${targetChain.name}`);
    }
  }, [isWrongNetwork, switchChain, targetChain]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isConnected || !address) {
        await logout();
        return;
      }

      const session = getSession();
      if (session?.address === address) return;

      try {
        if (address) {
          await signMessage(address);
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        await logout();
      }
    };

    if (isConnected) {
      checkAuth();
    }
  }, [address, isConnected, getSession, signMessage, logout]);

  return (
    <div onClick={isWrongNetwork ? handleSwitchNetwork : undefined}>
      <ConnectButton
        chainStatus="icon"
        showBalance={false}
      />
    </div>
  );
}
