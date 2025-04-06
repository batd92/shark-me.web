import { type Address } from 'viem';

export interface CourseInfo {
    priceInUSDT: bigint;
    priceInSMA: bigint;
    duration: bigint;
    isActive: boolean;
}

export interface CourseResponse {
    data: CourseInfo | undefined;
    isError: boolean;
    isLoading: boolean;
}
