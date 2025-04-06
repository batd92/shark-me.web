'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, Heading, RadioCards, Text, Link } from "@radix-ui/themes";


const Routers = [
    { name: 'BEP 20', link: 'erc-20' },
    { name: 'Vesting', link: 'vesting' },
    { name: 'Staking', link: 'staking' },
    { name: 'DEX', link: 'dex' },
    { name: 'Course', link: 'course' },
];

export const Home: React.FC = () => {
    const router = useRouter();

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading as="h6" style={{ paddingBottom: '20px' }}><Link style={{cursor: 'pointer'}} onClick={() => router.back()} size="7"></Link> List of Functions</Heading>
            </Box>
            <Box maxWidth="600px">
                <RadioCards.Root defaultValue="0" style={{ height: "200px" }} columns={{ initial: "1", sm: "3" }}>
                    {Routers.map((item, index) => (
                        <RadioCards.Item
                            key={index}
                            value={index.toString()}
                            onClick={() => router.push(`/${item.link}`)}
                            style={{
                                cursor: 'pointer',
                                padding: '16px',
                                transition: 'transform 0.2s, background-color 0.2s',
                                fontWeight: 'bold',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                                (e.currentTarget as HTMLElement).style.opacity = '0.9';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                                (e.currentTarget as HTMLElement).style.opacity = '1';
                            }}
                        >
                            <Flex direction="column" width="100%" align="center">
                                <Text>{item.name}</Text>
                            </Flex>
                        </RadioCards.Item>
                    ))}
                </RadioCards.Root>
            </Box>
        </div>
    );
};
