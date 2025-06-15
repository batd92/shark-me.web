import { formatUnits } from 'viem';

export const formatTokenAmount = (amount: bigint | string, decimals: number = 18): string => {
    return formatUnits(BigInt(amount), decimals);
};

export const parseTokenAmount = (amount: string, decimals: number = 18): bigint => {
    const cleanAmount = amount.replace(/,/g, '');
    const multiplier = Array.from({ length: decimals }, () => BigInt(10)).reduce((acc, val) => acc * val, BigInt(1));
    const [whole, fraction = ''] = cleanAmount.split('.');
    const wholeBig = BigInt(whole) * multiplier;
    const fractionBig = fraction ?
        BigInt(fraction.padEnd(decimals, '0').slice(0, decimals)) :
        BigInt(0);
    return wholeBig + fractionBig;
};
