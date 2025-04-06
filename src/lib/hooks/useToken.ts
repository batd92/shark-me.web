import { useReadContract, useWriteContract } from 'wagmi';
import { type Abi, type Address, type Hash } from 'viem';
import { erc20Abi } from 'viem';

export function useErc20Approve(tokenAddress: Address) {
    const { writeContract } = useWriteContract();

    const approve = async (spender: Address, amount: bigint): Promise<Hash | undefined> => {
        const hash = await writeContract?.({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'approve',
            args: [spender, amount]
        }) as Hash | undefined;
        return hash;
    };

    const allowance = (owner: Address, spender: Address) => {
        return useReadContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'allowance',
            args: [owner, spender]
        });
    };

    return { approve, allowance };
}

export function useErc20Balance(tokenAddress: Address, account?: Address) {
    return useReadContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: account ? [account] : undefined
    });
}
