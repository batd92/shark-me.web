import { parseEther } from 'viem';

export const DEFAULT_COURSES = [
    {
        id: 1,
        name: "Blockchain Basic",
        description: "Learn the fundamentals of blockchain technology",
        priceInUSDT: parseEther("99"),
        priceSMA: parseEther("990"),
        duration: BigInt(30 * 24 * 60 * 60), // 30 days in seconds
        thumbnail: "/course.jpeg"
    },
    {
        id: 2,
        name: "DeFi Masterclass",
        description: "Deep dive into Decentralized Finance",
        priceInUSDT: parseEther("199"),
        priceSMA: parseEther("1990"),
        duration: BigInt(60 * 24 * 60 * 60), // 60 days in seconds
        thumbnail: "/course.jpeg"
    },
    {
        id: 3,
        name: "Smart Contract Development",
        description: "Learn to write secure smart contracts",
        priceInUSDT: parseEther("299"),
        priceSMA: parseEther("2990"),
        duration: BigInt(90 * 24 * 60 * 60), // 90 days in seconds
        thumbnail: "/course.jpeg"
    }
] as const;
