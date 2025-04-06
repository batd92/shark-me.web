import {
    Box,
    RadioCards,
    Flex,
    Text,
    Grid,
    TextField,
    Button,
    Badge,
    DataList,
    Heading,
    Link
} from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { APP_ADDRESSES } from "@/lib/constants/addresses";
import { ChainId } from "@/lib/constants/chainId";
import { useAccount } from 'wagmi'


import { StakingSMAService } from "../../services/blockchains/staking";
import { useTokenService } from "../../services/blockchains/sma";

const APYRates = [
    { duration: '7 days', rate: '10%', lockTime: 604800 },
    { duration: '30 days', rate: '20%', lockTime: 2592000 },
    { duration: '60 days', rate: '30%', lockTime: 5184000 }
];


const Staking: React.FC = () => {
    const router = useRouter();
    const { address } = useAccount();
    const stakingSMAService = new StakingSMAService(APP_ADDRESSES[ChainId.SEPOLIA]["STAKING"]);
       const {
            getBalance,
            approve,
            getName,
            getTotalSupply,
        } = useTokenService();

    const [selectedValue, setSelectedValue] = useState("1");
    const [amountApprove, setAmountApprove] = useState(0);
    const [amountWithdraw, setAmountWithdraw] = useState(0);
    const [yourSMA, setYourSMA] = useState(0);
    const [totalLocked, setTotalLocked] = useState(0);
    const [minBalance, setMinBalance] = useState(0);
    const [stakingInfo, setStakingInfo] = useState({
        balance: 0,
        lastClaimTimestamp: 0,
        unlockTimestamp: 0,
        yearlyReward: 0
    });


    const selectedRate = APYRates[parseInt(selectedValue) - 1];
    const handleRadioChange = (value: string) => setSelectedValue(value);

    const fetchUserDetails = useCallback(async () => {
        if (!address) return;

        try {
            const [totalLockedValue, minBalanceValue, stakingData] = await Promise.all([
                stakingSMAService.getTotalLocked(),
                stakingSMAService.getMinBalance(),
                stakingSMAService.getUserDetails(address)
            ]);

            setYourSMA(getBalance());
            setTotalLocked(totalLockedValue);
            setMinBalance(minBalanceValue);
            setStakingInfo(stakingData);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }, [address]);


    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);

    const handleApprove = async () => {
        if (amountApprove < minBalance || amountApprove > yourSMA) {
            alert("Please adjust the amount you want to stake accordingly.");
        }

        // stake
        await stakingSMAService.stake(amountApprove.toString(), APYRates[(+selectedValue) - 1].lockTime);
    };

    const handleWithdraw = () => {
        console.log("Withdraw clicked for amount:", amountWithdraw);
    };
    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4" style={{ paddingBottom: '20px' }}>
                    <Link onClick={() => router.back()} size="5">Home</Link> / Staking
                </Heading>
            </Box>

            <Box style={{ justifyContent: 'center', alignItems: "center" }}>
                <RadioCards.Root
                    columns={{ initial: "1", sm: "3" }}
                    gap="6"
                    style={{ textAlign: 'center' }}
                >
                    <RadioCards.Item value="1" disabled>
                        <Flex direction="column" width="100%" align="start">
                            <Text weight="bold" color="orange">$ {totalLocked}</Text>
                            <Text>Total Value Locked</Text>
                        </Flex>
                    </RadioCards.Item>
                    <RadioCards.Item value="2" disabled>
                        <Flex direction="column" width="100%" align="start">
                            <Text weight="bold" color="orange">{APYRates[APYRates.length - 1].rate} %</Text>
                            <Text>APY Rate</Text>
                        </Flex>
                    </RadioCards.Item>
                    <RadioCards.Item value="3" disabled>
                        <Flex direction="column" width="100%" align="start">
                            <Text weight="bold" color="orange">69,899</Text>
                            <Text>Number of Stakers</Text>
                        </Flex>
                    </RadioCards.Item>
                </RadioCards.Root>
            </Box>
            <Heading as="h6" style={{ paddingBottom: '20px' }}>Participate IDO Stack</Heading>

            <Grid columns={{ initial: "1", md: "3" }} gap="6" width="100%">
                <Box style={{ gridColumn: "span 2" }}>
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "3" }}
                        gap="4"
                        onValueChange={handleRadioChange}
                        value={selectedValue}
                    >
                        {APYRates.map((rate, index) => (
                            <RadioCards.Item key={index} value={(index + 1).toString()}>
                                <Flex direction="column" width="100%" align="start">
                                    <Text weight="bold">{rate.duration}</Text>
                                    <Text>APY Rate: {rate.rate}</Text>
                                </Flex>
                            </RadioCards.Item>
                        ))}
                    </RadioCards.Root>

                    <DataList.Root style={{ paddingTop: '40px' }} orientation={{ initial: "vertical", sm: "horizontal" }}>
                        <DataList.Item>
                            <DataList.Label minWidth="120px">Lock Period:</DataList.Label>
                            <DataList.Value>{selectedRate.duration}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="120px">Re-locks on registration:</DataList.Label>
                            <DataList.Value>Yes</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="120px">Early unstake fee:</DataList.Label>
                            <DataList.Value>{selectedRate.rate}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="120px">Status:</DataList.Label>
                            <DataList.Value>Unlocked</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Box>

                <Box style={{ gridColumn: "span 1" }}>
                    <Flex direction="column" gap="4">
                        <Box>
                            <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>Amount: {yourSMA} SMA</Badge>
                            <TextField.Root
                                size="3"
                                placeholder="Number ..."
                                type="number"
                                value={amountApprove}
                                onChange={(e) => setAmountApprove(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            >
                                <TextField.Slot side="right" px="1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button size="2" onClick={handleApprove}>Approve</Button>
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                        <Box style={{ marginTop: '30px' }}>
                            <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>Staked: {stakingInfo.balance} SMA</Badge>
                            <TextField.Root
                                size="3"
                                placeholder="Number ..."
                                type="number"
                                value={amountWithdraw}
                                onChange={(e) => setAmountWithdraw(parseFloat(e.target.value))}
                                style={{ width: '100%' }}
                            >
                                <TextField.Slot side="right" px="1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button size="2" onClick={handleWithdraw}>Withdraw</Button>
                                </TextField.Slot>
                            </TextField.Root>
                        </Box>
                    </Flex>
                </Box>
            </Grid>

        </div>
    );
};

export default Staking;
