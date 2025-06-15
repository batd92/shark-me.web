import { useReadContract, useWriteContract } from 'wagmi';
import { type Abi, Address, parseEther } from 'viem';
import { Staking } from '@/lib/config/abis';

export type StakeInfo = {
    balance: bigint;
    unlockTimestamp: bigint;
    packageId: number;
    stakeId: number;
    lastClaimTimestamp: bigint;
};

export type StakingPackage = {
    packageId: number;
    durationSeconds: number;
    apyBasisPoints: number;
};

const DAY_IN_SECONDS = 86400;

export const STAKING_PACKAGES: StakingPackage[] = [
    { packageId: 0, durationSeconds: 90 * DAY_IN_SECONDS, apyBasisPoints: 2000 },
    { packageId: 1, durationSeconds: 180 * DAY_IN_SECONDS, apyBasisPoints: 2500 },
    { packageId: 2, durationSeconds: 270 * DAY_IN_SECONDS, apyBasisPoints: 3500 },
    { packageId: 3, durationSeconds: 360 * DAY_IN_SECONDS, apyBasisPoints: 5000 },
];

export function useStakingUser(contractAddress: Address) {
    const { writeContract, status, error } = useWriteContract();

    const stake = (amount: string, packageId: number) =>
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'stake',
            args: [parseEther(amount), packageId],
        });

    const withdraw = (packageId: number, stakeId: number) =>
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'withdraw',
            args: [packageId, stakeId],
        });

    const claim = (packageId: number, stakeId: number) =>
        writeContract({
            address: contractAddress,
            abi: Staking as Abi,
            functionName: 'claim',
            args: [packageId, stakeId],
        });

    const useUserStakes = (account: Address, packageId: number) =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'getUserStakes', args: [account, packageId] });

    const useClaimableReward = (account: Address, packageId: number, stakeId: number) =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'getClaimableRewardsForStake', args: [account, packageId, stakeId] });

    const usePackageEnabled = (packageId: number) =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'packageEnabled', args: [packageId] });

    const useMinStakeAmount = () =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'minStakeAmount' });

    const useTotalLocked = () =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'totalLocked' });

    const useStakeToken = () =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'stakeToken' });

    const useRewardToken = () =>
        useReadContract({ address: contractAddress, abi: Staking as Abi, functionName: 'rewardToken' });

    const useAllUserStakes = (account: Address) =>
        STAKING_PACKAGES.map(({ packageId }) => ({ packageId, ...useUserStakes(account, packageId) }));

    return {
        STAKING_PACKAGES,
        stake,
        withdraw,
        claim,
        useUserStakes,
        useClaimableReward,
        useAllUserStakes,
        usePackageEnabled,
        useMinStakeAmount,
        useTotalLocked,
        useStakeToken,
        useRewardToken,
        status,
        error,
    };
}
