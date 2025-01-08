import { ChainId } from "./chainId";
export type AddressMap = Partial<Record<ChainId, string>>;

export const APP_ADDRESSES = {
    [ChainId.RINKEBY]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.ETHEREUM]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.SEPOLIA]: {
        SMA: "0x6c35a1F5db9d41Bd448c092Ab0a3Db2f66177Ea7",
        STAKING: "0x47f3C8D5A54E8027a39f216759eEEA0Dbfed2751",
        VESTING: "0x47f3C8D5A54E8027a39f216759eEEA0Dbfed2751"
    }
};