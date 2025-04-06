import { useReadContract, useWriteContract } from 'wagmi';
import { type Abi, Address, parseEther } from 'viem';
import { Staking } from '@/lib/constants/abis';

export type StakingInfo = {
  stakedAmount: bigint;
  rewardRate: bigint;
  lastClaimTime: bigint;
  lockUntil: bigint;
}

export type StakingPackage = {
  duration: bigint;
  rewardRate: bigint;
}

export function useStakingService(contractAddress: Address) {
    const { writeContract, status, error } = useWriteContract();

    // Write functions
    const stake = async (amount: string, packageId: bigint) => {
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'stake',
            args: [parseEther(amount), packageId]
        });
    };

    const unstake = () => {
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'unstake'
        });
    };

    const claim = () => {
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'claim'
        });
    };

    const useStakingDetails = (account: Address) => {
        return useReadContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'stakingInfo',
            args: [account]
        });
    };

    const useStakingPackage = (packageId: bigint) => {
        return useReadContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'stakingPackages',
            args: [packageId]
        });
    };

    const useClaimableReward = (account: Address) => {
        return useReadContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'getClaimableReward',
            args: [account]
        });
    };

    return {
        stake,
        unstake,
        claim,
        useStakingDetails,
        useStakingPackage,
        useClaimableReward,
        status,
        error
    };
}