import React from "react";
import { AspectRatio, Box, Heading, Link } from "@radix-ui/themes";
import { useRouter } from 'next/navigation';

const Dex: React.FC = () => {
    const router = useRouter();

    return (
        <div className="space-y-8 p-6">
            <Box>
                <Heading size="4" style={{ paddingBottom: '20px' }}><Link style={{cursor: 'pointer'}} onClick={() => router.back()} size="5">Home</Link> / DEX of ERC-20 (SMA)</Heading>
            </Box>
            <AspectRatio ratio={16 / 8}>
                <img
                    src="https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80"
                    alt="A house in a forest"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "var(--radius-2)",
                    }}
                />
            </AspectRatio>
        </div>
    );
};

export default Dex;
