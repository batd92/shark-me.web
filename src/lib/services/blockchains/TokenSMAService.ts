import { Contract, Interface } from "ethers";
import { Providers } from "../../config/providers";
import { ChainId } from "../../constants/chainId";

export class TokenSMAService {
    private contract: Contract;

    constructor(address: string, ABI: Interface, chainId: ChainId) {
        const provider = Providers.getStaticProvider(chainId);
        this.contract = new Contract(address, ABI, provider);
    }

    async getBalance(userAddress: string): Promise<string> {
        return await this.contract.balanceOf(userAddress);
    }

    async transferTokens(userAddress: string, toAddress: string, amount: string): Promise<void> {
        await this.contract.transfer(toAddress, amount);
    }
}
