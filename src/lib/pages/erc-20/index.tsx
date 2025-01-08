import React, { useState, useEffect } from "react";
import { useAccount, useContractReads } from "wagmi";
import { SharkMe } from "../../constants/abis";
import { APP_ADDRESSES } from "@/lib/constants/addresses";
import { ChainId } from "@/lib/constants/chainId";
import { ethers } from "ethers";
import { useRouter } from 'next/navigation';
import { Box, Link, Grid, Heading, Text, Flex, RadioCards, Blockquote, Code } from "@radix-ui/themes";

const erc20Functions = [
    { name: "name", description: "Returns the name of the token." },
    { name: "totalSupply", description: "Returns the total token supply." },
    { name: "owner", description: "Returns the owner of the token." },
    { name: "symbol", description: "Returns the symbol of the token." },
    { name: "balanceOf", description: "Returns the balance of a specific address." },
    { name: "transfer", description: "Transfers tokens to a specific address." },
    { name: "allowance", description: "Returns the remaining tokens that a spender can use on behalf of the owner." },
    { name: "approve", description: "Allows a spender to use a specified amount of tokens on behalf of the owner." },
    { name: "transferFrom", description: "Transfers tokens on behalf of an owner to another address." },
];

const ERC20: React.FC = () => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
    const [result, setResult] = useState<string | undefined>("");
    const { address } = useAccount();

    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                address: APP_ADDRESSES[ChainId.SEPOLIA]["SMA"] as `0x${string}`,
                abi: SharkMe,
                functionName: selectedIndex !== null ? erc20Functions[selectedIndex]?.name : "name",
                args: selectedIndex === 4 && address ? [address] : [],
            },
        ],
    });

    useEffect(() => {
        if (data && data[0].status === "success" && selectedIndex) {
            if ([1, 4].includes(selectedIndex) && data[0].result) {
                const bigNumber = ethers.toBigInt(data[0].result.toString());
                const formattedValue = ethers.formatUnits(bigNumber, 18);
                setResult(formattedValue);
            } else {
                setResult(data[0].result?.toString() || "");
            }
        }
    }, [data, selectedIndex]);

    const handleRadioChange = (value: string) => {
        setSelectedIndex(+value - 1);
    };

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4" style={{ paddingBottom: '20px' }}><Link style={{ cursor: 'pointer' }} onClick={() => router.back()} size="5">Home</Link> / Token ERC-20 (SMA)</Heading>
            </Box>
            <Grid columns={{ initial: "1", sm: "2", lg: "2" }} gap="3" width="auto">
                <Box>
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "3" }}
                        gap="4"
                        onValueChange={handleRadioChange}
                        style={{ cursor: 'pointer' }}
                    >
                        {erc20Functions.map((item, index) => (
                            <RadioCards.Item key={index} value={(index + 1).toString()} disabled={index >= 4 && !address}>
                                <Flex direction="column" width="100%" align="start">
                                    <Text>{item.name}</Text>
                                </Flex>
                            </RadioCards.Item>
                        ))}
                    </RadioCards.Root>
                    <Blockquote style={{ marginTop: "100px" }}>
                        {erc20Functions[selectedIndex || 0]?.description || ""}
                    </Blockquote>
                </Box>

                <Box style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "100%", overflowX: "auto" }}>
                    <Blockquote style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                        Address: 0x6c35a1F5db9d41Bd448c092Ab0a3Db2f66177Ea7
                    </Blockquote>
                    <Flex style={{ marginTop: "30px" }} direction="column" gap="3" align="start">
                        <Code size="3" style={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                            {result}
                        </Code>
                    </Flex>
                </Box>
            </Grid>
        </div>
    );
};

export default ERC20;
