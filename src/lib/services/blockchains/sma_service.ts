import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { SharkMe } from "@/lib/constants/abis";
import { ethers } from 'ethers';
import { APP_ADDRESSES } from '@/lib/constants/addresses';
import { ChainId } from '@/lib/constants/chainId';

const addressSMA = APP_ADDRESSES[ChainId.SEPOLIA]["SMA"] as `0x${string}`;

export function useTokenService() {
    const { address } = useAccount();
    const { writeContract } = useWriteContract();

    const formatBalance = (balance: ethers.BigNumberish, decimals = 18): number => {
        const formatted = Number(ethers.formatUnits(balance, decimals));
        return formatted < 1 ? 0 : Math.round(formatted * 100) / 100;
    };

    const { data: balanceData, isLoading, isError } = useReadContract({
        address: addressSMA,
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
                address: addressSMA,
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
        address: addressSMA,
        abi: SharkMe,
        functionName: 'name',
    });

    const getName = () => {
        return nameData || 'Unknown';
    };

    // Get total supply
    const { data: totalSupplyData } = useReadContract({
        address: addressSMA,
        abi: SharkMe,
        functionName: 'totalSupply',
    });

    const getTotalSupply = () => {
        return formatBalance(totalSupplyData as any) || 0;
    };

    // Get owner of the token
    const { data: ownerData } = useReadContract({
        address: addressSMA,
        abi: SharkMe,
        functionName: 'owner',
    });

    const getOwner = () => {
        return ownerData || 'Unknown';
    };

    // Get token symbol
    const { data: symbolData } = useReadContract({
        address: addressSMA,
        abi: SharkMe,
        functionName: 'symbol',
    });

    const getSymbol = () => {
        return symbolData || 'Unknown';
    };

    // Transfer tokens to another address
    const transfer = (to: string, amount: string): boolean => {
        try {
            const parsedAmount = ethers.toBigInt(amount);

            writeContract({
                abi: SharkMe,
                address: addressSMA,
                functionName: 'transfer',
                args: [to, parsedAmount],
            });

            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    };

    // Transfer tokens from one address to another
    const transferFrom = (from: string, to: string, amount: string): boolean => {
        try {
            const parsedAmount = ethers.toBigInt(amount);

            writeContract({
                abi: SharkMe,
                address: addressSMA,
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
