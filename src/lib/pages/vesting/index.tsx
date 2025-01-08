import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box, Grid, Heading, Text, Flex, RadioCards, Blockquote, Link } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
const labels = [
    {
        label: "Public Sale",
        rate: 0.24,
        color: "blue",
        overview: "Tokens sold to the public during the initial token offering.",
    },
    {
        label: "Farming Pool",
        rate: 27.3,
        color: "green",
        overview: "Rewards for users participating in yield farming activities.",
    },
    {
        label: "Staking",
        rate: 15.3,
        color: "orange",
        overview: "Tokens allocated for staking incentives to secure the network.",
    },
    {
        label: "Ecosystem",
        rate: 7.5,
        color: "purple",
        overview: "Support for ecosystem development, partnerships, and integrations.",
    },
    {
        label: "Advisor",
        rate: 7.03,
        color: "red",
        overview: "Compensation for advisors who provide strategic guidance.",
    },
    {
        label: "Private Sale",
        rate: 23.45,
        color: "pink",
        overview: "Tokens sold to private investors before the public sale.",
    },
    {
        label: "Liquidity",
        rate: 13.3,
        color: "yellow",
        overview: "Tokens reserved for ensuring liquidity on exchanges.",
    },
    {
        label: "Marketing",
        rate: 7.3,
        color: "cyan",
        overview: "Funds allocated for marketing and promotional campaigns.",
    },
    {
        label: "Team",
        rate: 5.3,
        color: "gray",
        overview: "Tokens allocated for the team to incentivize long-term commitment.",
    },
];

const Vesting: React.FC = () => {
    const router = useRouter();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const data = {
        labels: labels.map((x) => x.label),
        datasets: [
            {
                label: "Tokenomics Distribution",
                data: labels.map((x) => x.rate),
                backgroundColor: labels.map((x, index) =>
                    selectedIndex === null || selectedIndex === index
                        ? x.color
                        : `${x.color.replace(")", ", 0.3)").replace("rgb", "rgba")}`
                ),
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        onClick: (_: any, elements: any[]) => {
            if (elements.length > 0) {
                const chartIndex = elements[0].index;
                setSelectedIndex(chartIndex);
            }
        },
    };

    const handleRadioChange = (value: string) => {
        setSelectedIndex(parseInt(value) - 1);
    };

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4" style={{ paddingBottom: '20px' }}><Link style={{cursor: 'pointer'}} onClick={()=> router.back()} size="5">Home</Link> / Tokenomics Distribution</Heading>
            </Box>
            <Grid
                columns={{ initial: "1", sm: "2" }}
                gap="4"
            >
                <Box style={{ width: "100%", maxWidth: "400px" }}>
                    <RadioCards.Root
                        defaultValue="1"
                        columns={{ initial: "1", sm: "2" }}
                        gap="4"
                        onValueChange={handleRadioChange}
                    >
                        {labels.map((item, index) => (
                            <RadioCards.Item
                                key={index}
                                value={(index + 1).toString()}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor:
                                        selectedIndex === index ? labels[index].color : "transparent",
                                }}
                            >
                                <Flex direction="column" width="100%" align="start">
                                    <Text
                                        style={{
                                            color: selectedIndex === index ? "white" : labels[index].color,
                                        }}
                                    >
                                        {item.label} - {item.rate}%
                                    </Text>
                                </Flex>
                            </RadioCards.Item>
                        ))}
                    </RadioCards.Root>

                    <Blockquote
                        style={{
                            marginTop: "20px",
                            fontSize: "14px",
                            minHeight: "60px",
                        }}
                    >
                        {labels[selectedIndex || 0].overview}
                    </Blockquote>
                </Box>

                <Box style={{ width: "100%", maxWidth: "400px" }}>
                    <Doughnut data={data} options={options} />
                </Box>
            </Grid>
        </div>
    );
};

export default Vesting;
