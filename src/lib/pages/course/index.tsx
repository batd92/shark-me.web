import React, { useState } from "react";
import {
    Box,
    Flex,
    Grid,
    Button,
    Badge,
    DataList,
    Card,
    Inset,
    Text,
    Heading,
    Link
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const courses = [
    {
        id: 1,
        name: "Decentralized Exchange",
        price: "100 SMA",
        overview: "This is a course about Decentralized Exchange",
        image: "/course.jpeg"
    },
    {
        id: 2,
        name: "Blockchain Fundamentals",
        price: "50 SMA",
        overview: "Learn the fundamentals of Blockchain technology",
        image: "/course.jpeg"
    },
    {
        id: 3,
        name: "Smart Contracts 101",
        price: "75 SMA",
        overview: "An introduction to smart contracts and their use cases",
        image: "/course.jpeg"
    },
    {
        id: 4,
        name: "Crypto Trading Basics",
        price: "120 SMA",
        overview: "Learn how to trade cryptocurrencies safely and efficiently",
        image: "/course.jpeg"
    },
    {
        id: 5,
        name: "NFTs and DeFi",
        price: "150 SMA",
        overview: "Understand NFTs and DeFi concepts",
        image: "/course.jpeg"
    }
];

const Course: React.FC = () => {
    const router = useRouter();
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
        alert("Course Purchased!");
        setIsPurchased(true);
    };

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4" style={{ paddingBottom: '20px' }}><Link style={{cursor: 'pointer'}} onClick={() => router.back()} size="5">Home</Link> / List of Courses</Heading>
            </Box>
            <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="3" width="100%">
                {courses.map(course => (
                    <Box key={course.id} maxWidth="280px">
                        <Card
                            size="2"
                            style={{
                                height: 'auto',
                                overflow: 'visible',
                                marginBottom: '30px',
                                cursor: 'pointer'
                            }}
                        >
                            <Inset clip="padding-box" side="top" pb="current">
                                <img
                                    src={course.image}
                                    alt={course.name}
                                    style={{
                                        display: "block",
                                        objectFit: "cover",
                                        width: "100%",
                                        height: 200,
                                        backgroundColor: "var(--gray-5)"
                                    }}
                                />
                            </Inset>
                            <DataList.Root style={{ paddingTop: '5px' }} orientation={{ initial: "vertical", sm: "horizontal" }}>
                                <DataList.Item style={{ marginBottom: '10px' }}>
                                    <DataList.Label style={{ minWidth: '50px' }}>Name:</DataList.Label>
                                    <DataList.Value>
                                        <Badge color="orange">{course.name}</Badge>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item style={{ marginBottom: '10px' }}>
                                    <DataList.Label style={{ minWidth: '50px' }}>Price:</DataList.Label>
                                    <DataList.Value>
                                        <Badge color="blue">
                                            <Text weight="bold" color="orange">{course.price}</Text>
                                        </Badge>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item style={{ marginBottom: '10px' }}>
                                    <DataList.Label style={{ minWidth: '50px' }}>Overview:</DataList.Label>
                                    <DataList.Value style={{ justifyContent: 'center', alignItems: "center" }}>
                                        {course?.overview?.slice(0, 42) + "..."}
                                    </DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            <Flex justify="center" style={{ marginTop: '10px', height: 'auto', minHeight: '50px', paddingBottom: '20px' }}>
                                <Button
                                    color="orange"
                                    variant="soft"
                                    style={{
                                        backgroundColor: "#007bff",
                                        color: "white",
                                        minWidth: "100px",
                                        borderRadius: "4px",
                                        cursor: 'pointer'
                                    }}
                                    onClick={handlePurchase}
                                >
                                    BUY
                                </Button>
                            </Flex>
                        </Card>
                    </Box>
                ))}
            </Grid>
        </div>
    );
};

export default Course;
