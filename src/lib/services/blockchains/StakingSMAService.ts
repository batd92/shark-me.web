import { Contract, Interface } from "ethers";
import { Providers } from "../../config/providers";
import { ChainId } from "../../constants/chainId";

export class StakingSMAService {
    private contract: Contract;

    constructor(address: string, ABI: Interface, chainId: ChainId) {
        const provider = Providers.getStaticProvider(chainId);
        this.contract = new Contract(address, ABI, provider);
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

    async stake(amount: string, lockTime: string): Promise<void> {
        await this.handleTransaction(this.contract.stake(amount, lockTime));
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

    async getMinBalance(): Promise<string> {
        return await this.contract.minBalance();
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
        balance: string;
        lastClaimTimestamp: string;
        unlockTimestamp: string;
        yearlyReward: string;
    }> {
        const [balance, lastClaimTimestamp, unlockTimestamp, yearlyReward] = await this.contract.users(address);
        return { balance, lastClaimTimestamp, unlockTimestamp, yearlyReward };
    }

    async getTotalLocked(): Promise<string> {
        return await this.contract.totalLocked();
    }

    async getRewardToken(): Promise<string> {
        return await this.contract.rewardToken();
    }

    async getStakeToken(): Promise<string> {
        return await this.contract.stakeToken();
    }
}
