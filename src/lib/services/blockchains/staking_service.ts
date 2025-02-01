import { Contract, Interface } from "ethers";
import { Providers } from "../../config/providers";
import { ChainId } from "../../constants/chainId";
import { Staking_ABI } from "@/lib/constants/abis";
import { ethers } from "ethers";

export class StakingSMAService {
    private contract: Contract;

    constructor(address: string) {
        const provider = Providers.getStaticProvider(ChainId.SEPOLIA);
        this.contract = new Contract(address, Staking_ABI, provider);
    }

    private async handleTransaction(txPromise: Promise<any>): Promise<void> {
        try {
            const tx = await txPromise;
            await tx.wait();
        } catch (error: any) {
            console.error("Transaction failed:", error.reason || error.message);
            throw new Error(error.reason || "Transaction failed.");
        }
    }

    async getOwner(): Promise<string> {
        return await this.contract.owner();
    }

    async stake(amount: string, lockTime: number): Promise<void> {
        await this.handleTransaction(this.contract.stake(this.parseAmount(amount), lockTime));
    }

    async claim(): Promise<string> {
        try {
            const reward = await this.contract.claim();
            return reward;
        } catch (error: any) {
            console.error("Claim failed:", error.reason || error.message);
            throw new Error(error.reason || "Claim failed.");
        }
    }

    async getRewardOf(account: string): Promise<string> {
        return await this.contract.getRewardOf(account);
    }

    async getMinBalance(): Promise<number> {
        return this.formatBigInt(await this.contract.minBalance());
    }

    async withdraw(force: boolean = false): Promise<void> {
        await this.handleTransaction(this.contract.withdraw(force));
    }

    async withdrawFunds(amount: string): Promise<void> {
        await this.handleTransaction(this.contract.withdrawFunds(amount));
    }

    async setMinBalance(minBalance: string): Promise<void> {
        await this.handleTransaction(this.contract.setMinBalance(minBalance));
    }

    async setLockTimeToPercent(lockTime: string, percent: number): Promise<void> {
        await this.handleTransaction(this.contract.setLockTimeToPercent(lockTime, percent));
    }

    async transferOwnership(newOwner: string): Promise<void> {
        await this.handleTransaction(this.contract.transferOwnership(newOwner));
    }

    async renounceOwnership(): Promise<void> {
        await this.handleTransaction(this.contract.renounceOwnership());
    }

    async getUserDetails(address: string): Promise<{
        balance: number;
        lastClaimTimestamp: number;
        unlockTimestamp: number;
        yearlyReward: number;
    }> {
        const [balance, lastClaimTimestamp, unlockTimestamp, yearlyReward] = await this.contract.users(address);
        return { 
            balance: this.formatBalance(balance), 
            lastClaimTimestamp: this.formatBigInt(lastClaimTimestamp), 
            unlockTimestamp: this.formatBigInt(unlockTimestamp), 
            yearlyReward: this.formatBigInt(yearlyReward)
        };
    }
    
    async getTotalLocked(): Promise<number> {
        return this.formatBigInt(await this.contract.totalLocked());
    }

    async getRewardToken(): Promise<string> {
        return await this.contract.rewardToken();
    }

    async getStakeToken(): Promise<string> {
        return await this.contract.stakeToken();
    }

    private formatBalance(balance: bigint, decimals = 18): number {
        const formatted = Number(ethers.formatUnits(balance, decimals));
        return formatted < 1 ? 0 : Math.round(formatted * 100) / 100;
    }

    private formatBigInt(value: bigint): number {
        return (value && Number(value)) || 0;
    }

    private parseAmount(amount: string): ethers.BigNumberish {
        return ethers.toBigInt(amount);
    }
}
