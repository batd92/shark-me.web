import { useReadContract, useWriteContract } from 'wagmi';
import { type Abi, Address, parseEther } from 'viem';
import { Course } from '@/lib/constants/abis';
import { type CourseInfo } from '@/lib/types/course';
import { toast } from 'sonner';
import { useErc20Approve } from '@/lib/hooks/useToken';
import { SUPPORTED_CHAINS } from '@/lib/constants/chainId';

export type PurchaseInfo = {
    purchaseTimestamp: bigint;
    expiryTimestamp: bigint;
}

export function useCourseService(contractAddress: Address, usdtAddress: Address, smaAddress: Address) {
    const { writeContractAsync, status, error } = useWriteContract();
    const { approve: approveUSDT, allowance: usdtAllowance } = useErc20Approve(usdtAddress);

    // Admin functions
    const createCourse = async (courseId: number, priceUSDT: string, priceSMA: string, duration: number) => {
        if (!writeContractAsync) return;
        return writeContractAsync({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'createCourse',
            args: [BigInt(courseId), parseEther(priceUSDT), parseEther(priceSMA), BigInt(duration)]
        });
    };

    const updateCourse = async (courseId: number, priceUSDT: string, priceSMA: string, duration: number) => {
        if (!writeContractAsync) return;
        return writeContractAsync({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'updateCourse',
            args: [BigInt(courseId), parseEther(priceUSDT), parseEther(priceSMA), BigInt(duration)]
        });
    };

    const revokeCourse = async (courseId: number) => {
        if (!writeContractAsync) return;
        return writeContractAsync({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'revokeCourse',
            args: [BigInt(courseId)]
        });
    };

    // Read functions
    const getCourseInfo = (courseId: number) => {
        return useReadContract({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'courseCatalog',
            args: [BigInt(courseId)]
        });
    };

    const useAccessStatus = (account: Address, courseId: number) => {
        return useReadContract({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'checkAccess',
            args: [account, BigInt(courseId)]
        });
    };

    const useRemainingTime = (account: Address, courseId: number) => {
        return useReadContract({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'getRemainingAccessTime',
            args: [account, BigInt(courseId)]
        });
    };

    const usePurchaseInfo = (account: Address, courseId: number) => {
        return useReadContract({
            address: contractAddress,
            abi: Course as Abi,
            functionName: 'userPurchaseInfo',
            args: [account, BigInt(courseId)]
        });
    };

    // Purchase with checks
    const purchaseWithUSDT = async (courseId: number) => {
        if (!writeContractAsync) {
            throw new Error('Write contract not initialized');
        }

        try {
            const hash = await writeContractAsync({
                address: contractAddress,
                abi: Course as Abi,
                functionName: 'purchaseWithUSDT',
                args: [BigInt(courseId)]
            });

            return hash;
        } catch (error) {
            console.error('Purchase failed:', error);
            throw error;
        }
    };

    const purchaseWithSMA = async (courseId: number, courseInfo: CourseInfo) => {
        if (!writeContractAsync) {
            toast.error('Write contract not initialized');
            return;
        }

        try {
            if (!courseInfo?.isActive) {
                toast.error('Course is not available');
                return;
            }

            const hash = await writeContractAsync({
                address: contractAddress,
                abi: Course as Abi,
                functionName: 'purchaseWithSMA',
                args: [BigInt(courseId)]
            });

            if (hash) {
                toast.success('Purchase with SMA successful!');
                return hash;
            }
        } catch (error) {
            toast.error('SMA Purchase failed: ' + (error as Error).message);
            console.error('SMA Purchase failed:', error);
        }
    };

    return {
        // Admin functions
        createCourse,
        updateCourse,
        revokeCourse,
        // Purchase functions
        purchaseWithUSDT,
        purchaseWithSMA,
        // Read functions
        getCourseInfo,
        useAccessStatus,
        useRemainingTime,
        usePurchaseInfo,
        // Transaction status
        status,
        error
    };
}
