import { useState, useRef, useEffect } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { useCourseService } from '@/lib/services/blockchains/course';
import { formatEther, type Address } from 'viem';
import { getAddressForChain } from '@/lib/constants/addresses';
import { DEFAULT_COURSES } from '@/lib/constants/mockData';
import { toast } from 'sonner';
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
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { SUPPORTED_CHAINS } from '@/lib/constants/chainId';
import { CourseInfo } from '@/lib/types/course';

const CourseCard = ({ 
    course, 
    onPurchaseUSDT, 
    onPurchaseSMA, 
    hasAccess, 
    remainingDays,
    isConnected,
    isSupported,
    courseInfo
}: {
    course: (typeof DEFAULT_COURSES)[number];
    onPurchaseUSDT: (courseId: number) => void;
    onPurchaseSMA: (courseId: number) => void;
    hasAccess?: boolean;
    remainingDays?: number;
    isConnected: boolean;
    isSupported: boolean;
    courseInfo?: CourseInfo;
}) => {
    const { openConnectModal } = useConnectModal();

    const renderPurchaseButtons = () => {
        if (!isConnected) {
            return (
                <Button
                    color="blue"
                    variant="soft"
                    style={{
                        backgroundColor: "#4F46E5",
                        color: "white",
                        width: "100%",
                        borderRadius: "4px",
                        cursor: 'pointer'
                    }}
                    onClick={openConnectModal}
                >
                    Connect Wallet
                </Button>
            );
        }

        if (!isSupported) {
            return (
                <Button
                    color="red"
                    variant="soft"
                    style={{
                        backgroundColor: "#DC2626",
                        color: "white",
                        width: "100%",
                        borderRadius: "4px",
                        cursor: 'pointer'
                    }}
                >
                    Un-supported Network
                </Button>
            );
        }

        if (hasAccess) {
            return (
                <Badge size="2" color="green">
                    Access Granted ({remainingDays} days remaining)
                </Badge>
            );
        }

        return (
            <Flex gap="2" width="100%">
                <Button
                    color="blue"
                    variant="soft"
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        borderRadius: "4px",
                        cursor: 'pointer'
                    }}
                    onClick={() => onPurchaseUSDT(course.id)}
                >
                    Buy with USDT
                </Button>
                <Button
                    color="orange"
                    variant="soft"
                    style={{
                        backgroundColor: "#ff7a00",
                        color: "white",
                        borderRadius: "4px",
                        cursor: 'pointer'
                    }}
                    onClick={() => onPurchaseSMA(course.id)}
                >
                    Buy with SMA
                </Button>
            </Flex>
        );
    };

    return (
        <Box key={course.id} maxWidth="280px">
            <Card size="2" style={{ height: 'auto', overflow: 'visible', marginBottom: '30px' }}>
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={course.thumbnail}
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
                <DataList.Root style={{ paddingTop: '5px' }}>
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
                                <Text weight="bold" color="orange">
                                    {formatEther(courseInfo?.priceInUSDT || course.priceInUSDT)} USDT or {formatEther(courseInfo?.priceInSMA || course.priceSMA)} SMA
                                </Text>
                            </Badge>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item style={{ marginBottom: '10px' }}>
                        <DataList.Label style={{ minWidth: '50px' }}>Overview:</DataList.Label>
                        <DataList.Value style={{ justifyContent: 'center', alignItems: "center" }}>
                            {course.description}
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>

                <Flex justify="center" style={{ marginTop: '10px' }}>
                    {renderPurchaseButtons()}
                </Flex>
            </Card>
        </Box>
    );
};

export default function CoursePage() {
    const router = useRouter();
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const isSupported = SUPPORTED_CHAINS.includes(chainId);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const addresses = getAddressForChain(chainId);
    const courseService = useCourseService(addresses.COURSE, addresses.USDT, addresses.SMA);

    const CourseItem = ({ course }: { course: typeof DEFAULT_COURSES[number] }) => {
        const { data } = courseService.getCourseInfo(course.id);
        const courseInfo = data as CourseInfo | undefined;
        
        return (
            <CourseCard
                key={course.id}
                course={course}
                onPurchaseUSDT={handlePurchaseUSDT}
                onPurchaseSMA={handlePurchaseSMA}
                hasAccess={false}
                remainingDays={0}
                isConnected={isConnected}
                isSupported={isSupported}
                courseInfo={courseInfo}
            />
        );
    };

    const handlePurchaseUSDT = async (courseId: number) => {
        if (!isConnected || !address) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            setIsPurchasing(true);
            const result = await courseService.purchaseWithUSDT(courseId);
            if (result) {
                toast.success('Purchase successful!');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error('Purchase failed: ' + (error as Error).message);
        } finally {
            setIsPurchasing(false);
        }
    };

    const handlePurchaseSMA = async (courseId: number) => {
        if (!isConnected || !address) {
            toast.error('Please connect your wallet first');
            return;
        }

        try {
            setIsPurchasing(true);
            const result = await courseService.purchaseWithSMA(courseId, courseService.getCourseInfo(courseId).data as CourseInfo);
            if (result) {
                toast.success('Purchase successful!');
            }
        } catch (error) {
            console.error('Purchase error:', error);
            toast.error('Purchase failed: ' + (error as Error).message);
        } finally {
            setIsPurchasing(false);
        }
    };

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4">
                    <Link style={{ cursor: 'pointer' }} onClick={() => router.back()} size="5">
                        Home
                    </Link> / List of Courses
                </Heading>
            </Box>

            <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="3" width="100%">
                {DEFAULT_COURSES.map((course) => (
                    <CourseItem key={course.id} course={course} />
                ))}
            </Grid>

            {isPurchasing && (
                <Flex
                    justify="center"
                    align="center"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <Card>
                        <Text>Processing purchase...</Text>
                    </Card>
                </Flex>
            )}
        </div>
    );
}
