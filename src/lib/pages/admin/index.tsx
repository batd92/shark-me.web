import React, { useState } from "react";
import { Box, Heading, Text, Tabs, Table, Button, Dialog, Flex, Card, TextField } from "@radix-ui/themes";
import { DEFAULT_COURSES } from '@/lib/config/mockData';
import { useCourseService } from "@/lib/services/blockchains/course";
import { toast } from "sonner";
import { useChainId } from 'wagmi';
import { getAddressForChain } from "@/lib/config/addresses";
import { formatTokenAmount, parseTokenAmount } from '@/lib/utils/format';

interface Course {
    id: number;
    name: string;
    description: string;
    priceInUSDT: bigint;
    priceSMA: bigint;
    duration: bigint;
    thumbnail: string;
}

interface CourseInfo {
    priceInUSDT: bigint;
    priceSMA: bigint;
    duration: bigint;
    isActive: boolean;
}

const Admin = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [priceUSDT, setPriceUSDT] = useState("");
    const [priceSMA, setPriceSMA] = useState("");
    const chainId = useChainId();
    const addresses = getAddressForChain(chainId);
    const courseService = useCourseService(addresses.COURSE, addresses.USDT, addresses.SMA);

    const { data } = courseService.getCourseInfo(selectedCourse?.id || 0);
    const courseInfo = data as CourseInfo | undefined;

    const handleOpenDialog = (course: Course) => {
        setSelectedCourse(course);
        setPriceUSDT(formatTokenAmount(course.priceInUSDT));
        setPriceSMA(formatTokenAmount(course.priceSMA));
        setOpenDialog(true);
    };

    const handleRegister = async () => {
        if (!selectedCourse) {
            toast.error("No course selected.");
            return;
        }

        try {
            if (!courseInfo?.isActive) {
                await courseService.createCourse(
                    selectedCourse.id,
                    priceUSDT,
                    priceSMA,
                    Number(selectedCourse.duration)
                );
                toast.success("Course creation transaction sent!");
            } else {
                await courseService.updateCourse(
                    selectedCourse.id,
                    priceUSDT,
                    priceSMA,
                    Number(selectedCourse.duration)
                );
                toast.success("Course update transaction sent!");
            }
            setOpenDialog(false);
        } catch (error) {
            toast.error("Transaction failed: " + (error as Error).message);
        }
    };

    return (
        <Box p="4">
            <Tabs.Root defaultValue="course">
                <Flex direction="column" gap="4">
                    <Card>
                        <Flex justify="between" align="center" mb="4">
                            <Heading size="4">Course Management</Heading>
                            <Tabs.List>
                                <Tabs.Trigger value="course">Courses</Tabs.Trigger>
                                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                            </Tabs.List>
                        </Flex>

                        <Tabs.Content value="course">
                            <Table.Root variant="surface">
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Price (USDT)</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell>Price (SMA)</Table.ColumnHeaderCell>
                                        <Table.ColumnHeaderCell width="100">Actions</Table.ColumnHeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {DEFAULT_COURSES.map((course) => (
                                        <Table.Row key={course.id}>
                                            <Table.RowHeaderCell>{course.name}</Table.RowHeaderCell>
                                            <Table.Cell>{course.description}</Table.Cell>
                                            <Table.Cell>{formatTokenAmount(course.priceInUSDT)}</Table.Cell>
                                            <Table.Cell>{formatTokenAmount(course.priceSMA)}</Table.Cell>
                                            <Table.Cell>
                                                <Button size="1" onClick={() => handleOpenDialog(course)}>
                                                    Add To Blockchain
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>

                            <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
                                <Dialog.Content size="3">
                                    <Flex direction="column" gap="5">
                                        <Box>
                                            <Dialog.Title size="6">
                                                {courseInfo?.isActive ? 'Update Course on Blockchain' : 'Register Course to Blockchain'}
                                            </Dialog.Title>
                                            <Dialog.Description size="2" color="gray">
                                                Configure pricing for <strong>{selectedCourse?.name}</strong>
                                            </Dialog.Description>
                                        </Box>

                                        <Card variant="surface">
                                            <Flex direction="column" gap="3">
                                                <Text size="2" weight="bold">Course Details</Text>
                                                <Box>
                                                    <Text size="2" mb="1" color="gray">ID: #{selectedCourse?.id}</Text>
                                                    <br></br>
                                                    <Text size="2" mb="1">{selectedCourse?.description}</Text>
                                                    <br></br>
                                                    <Text size="2" color="gray">
                                                        Duration: {selectedCourse && Math.floor(Number(selectedCourse.duration) / (24 * 60 * 60))} days
                                                    </Text>
                                                </Box>
                                            </Flex>
                                        </Card>

                                        <Card variant="surface">
                                            <Flex direction="column" gap="4">
                                                <Flex justify="between" align="baseline">
                                                    <Text size="2" weight="bold">Token Configuration</Text>
                                                    <Text size="2" color="gray">
                                                        {courseInfo?.isActive ? 'Current Prices' : 'Set Initial Prices'}
                                                    </Text>
                                                </Flex>

                                                <Box>
                                                    <Flex justify="between" align="center" mb="2">
                                                        <Text as="label" size="2" weight="bold">USDT Price</Text>
                                                        {courseInfo?.isActive && (
                                                            <Text size="2" color="gray">
                                                                Current: {formatTokenAmount(courseInfo.priceInUSDT)} USDT
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                    <TextField.Root size="2" type="number" value={priceUSDT} placeholder="…"  onChange={(e) => setPriceUSDT(e.target.value)}/>
                                                </Box>

                                                <Box>
                                                    <Flex justify="between" align="center" mb="2">
                                                        <Text as="label" size="2" weight="bold">SMA Price</Text>
                                                        {courseInfo?.isActive && (
                                                            <Text size="2" color="gray">
                                                                Current: {formatTokenAmount(courseInfo.priceSMA)} SMA
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                    <TextField.Root size="2" type="number" value={priceSMA} placeholder="…"  onChange={(e) => setPriceSMA(e.target.value)}/>
                                                </Box>
                                            </Flex>
                                        </Card>

                                        {courseInfo?.isActive && (
                                            <Text size="2" color="gray" align="center">
                                                This course is already registered on the blockchain.
                                                Any changes will update the existing configuration.
                                            </Text>
                                        )}

                                        <Flex gap="3" justify="end">
                                            <Button color="gray" variant="soft" onClick={() => setOpenDialog(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleRegister}>
                                                {courseInfo?.isActive ? 'Update Course' : 'Register Course'}
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Tabs.Content>

                        <Tabs.Content value="settings">
                            <Card>
                                <Text size="2">App settings will go here</Text>
                            </Card>
                        </Tabs.Content>
                    </Card>
                </Flex>
            </Tabs.Root>
        </Box>
    );
};

export default Admin;
