import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { SharkMe } from "@/lib/config/abis";
import { ethers } from 'ethers';
import { getAddressForChain } from '@/lib/config/addresses';
import { ChainId } from '@/lib/config/chainId';

const addressSMA = getAddressForChain(ChainId.SEPOLIA);

export function useTokenService() {
    const { address } = useAccount();
    const { writeContract } = useWriteContract();

    const formatBalance = (balance: ethers.BigNumberish, decimals = 18): number => {
        const formatted = Number(ethers.formatUnits(balance, decimals));
        return formatted < 1 ? 0 : Math.round(formatted * 100) / 100;
    };

    const { data: balanceData, isLoading, isError } = useReadContract({
        address: addressSMA.SMA,
        abi: SharkMe,
        functionName: "balanceOf",
        args: [address],
    });

    const getBalance = () => {
        if (isLoading) return 0;
        if (isError || !balanceData) return 0;

        return formatBalance(balanceData as any);
    };

    const approve = (amount: string): boolean => {
        try {
            const parsedAmount = ethers.toBigInt(amount);

            writeContract({
                abi: SharkMe,
                address: addressSMA.SMA,
                functionName: 'approve',
                args: [address, parsedAmount],
            });

            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    // Error handling
    const handleError = (error: unknown): void => {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Transaction failed:", message);
        throw new Error(message);
    };

    const { data: nameData } = useReadContract({
        address: addressSMA.SMA,
        abi: SharkMe,
        functionName: 'name',
    });

    const getName = () => {
        return nameData || 'Unknown';
    };

    const { data: totalSupplyData } = useReadContract({
        address: addressSMA.SMA,
        abi: SharkMe,
        functionName: 'totalSupply',
    });

    const getTotalSupply = () => {
        return formatBalance(totalSupplyData as any) || 0;
    };

    const { data: ownerData } = useReadContract({
        address: addressSMA.SMA,
        abi: SharkMe,
        functionName: 'owner',
    });

    const getOwner = () => {
        return ownerData || 'Unknown';
    };

    const { data: symbolData } = useReadContract({
        address: addressSMA.SMA,
        abi: SharkMe,
        functionName: 'symbol',
    });

    const getSymbol = () => {
        return symbolData || 'Unknown';
    };

    const transfer = (to: string, amount: string): boolean => {
        try {
            const parsedAmount = ethers.toBigInt(amount);

            writeContract({
                abi: SharkMe,
                address: addressSMA.SMA,
                functionName: 'transfer',
                args: [to, parsedAmount],
            });

            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    const transferFrom = (from: string, to: string, amount: string): boolean => {
        try {
            const parsedAmount = ethers.toBigInt(amount);

            writeContract({
                abi: SharkMe,
                address: addressSMA.SMA,
                functionName: 'transferFrom',
                args: [from, to, parsedAmount],
            });

            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    return {
        getBalance,
        approve,
        getName,
        getTotalSupply,
        getOwner,
        getSymbol,
        transfer,
        transferFrom
    };
}