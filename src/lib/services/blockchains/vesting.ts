import { useReadContract, useSimulateContract, useWriteContract } from 'wagmi';
import { type Abi, Address } from 'viem';
import { Vesting } from '@/lib/constants/abis';

export type VestingDetails = {
    totalAmount: bigint;
    vestedAmount: bigint;
    claimedAmount: bigint;
    startTime: bigint;
    endTime: bigint;
    lastClaimTime: bigint;
}

export function useVestingService(contractAddress: Address) {
    const { writeContract, status, error } = useWriteContract();

    const claim = () => {
        writeContract({
            address: contractAddress,
            abi: Vesting as Abi,
            functionName: 'claim'
        });
    };

    const useVestingDetails = (account: Address) => {
        return useReadContract({
            address: contractAddress,
            abi: Vesting as Abi,
            functionName: 'vestingDetails',
            args: [account]
        });
    };

    const useClaimableAmount = (account: Address) => {
        return useReadContract({
            address: contractAddress,
            abi: Vesting as Abi,
            functionName: 'getClaimableAmount',
            args: [account]
        });
    };

    return {
        claim,
        useVestingDetails,
        useClaimableAmount,
        status,
        error
    };
}
