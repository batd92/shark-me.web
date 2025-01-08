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
import { useState } from "react";
import { useRouter } from 'next/navigation';

const APYRates = [
    {
        duration: '7 days',
        rate: '10%',
    },
    {
        duration: '30 days',
        rate: '20%',
    },
    {
        duration: '60 days',
        rate: '30%',
    }
];

const Staking: React.FC = () => {
    const router = useRouter();
    const [selectedValue, setSelectedValue] = useState("1");
    const [amountApprove, setAmountApprove] = useState(0);
    const [amountWithdraw, setAmountWithdraw] = useState(0);

    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
    };

    const selectedRate = APYRates[parseInt(selectedValue) - 1];

    const handleApprove = () => {
        console.log("Approve clicked for amount:", amountApprove);
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
                            <Text weight="bold" color="orange">$ 63,939,379</Text>
                            <Text>Total Value Locked</Text>
                        </Flex>
                    </RadioCards.Item>
                    <RadioCards.Item value="2" disabled>
                        <Flex direction="column" width="100%" align="start">
                            <Text weight="bold" color="orange">136.99 %</Text>
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
                            <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>Amount: 350.70 BUSD</Badge>
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
                            <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>Staked: 350.70 BUSD</Badge>
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
