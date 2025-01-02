import React, { useState } from "react";
import { Button } from "@/lib/components/ui/button";
import { useContractReads } from "wagmi";
import { SharkMe } from "../../constants/abis";
import Link from "next/link";
import { APP_ADDRESSES } from "@/lib/constants/addresses";
import { ChainId } from "@/lib/constants/chainId";

const ERC20: React.FC = () => {
    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                address: APP_ADDRESSES[ChainId.SEPOLIA] as `0x${string}`,
                abi: SharkMe,
                functionName: "name",
            },
            {
                address: APP_ADDRESSES[ChainId.SEPOLIA] as `0x${string}`,
                abi: SharkMe,
                functionName: "totalSupply",
            },
            {
                address: APP_ADDRESSES[ChainId.SEPOLIA] as `0x${string}`,
                abi: SharkMe,
                functionName: "owner",
            },
        ],
    });

    const name: React.ReactNode = (data?.[0]?.result || "Đang tải...").toString();
    const totalSupply = data?.[1]?.result || "Đang tải...";
    const owner = data?.[2]?.result || "Đang tải...";


    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "5vh",
            }}
        >
            <div
                style={{
                    maxWidth: "250px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                }}
            >
                <div style={{ overflow: "hidden" }}>
                    <img
                        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                        alt="Bold typography"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            backgroundColor: "#f3f4f6",
                        }}
                    />
                </div>
                <div style={{ padding: "16px" }}>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151" }}>
                        <strong>{name}</strong> is the art and technique of arranging type to
                        make written language legible, readable, and appealing when displayed.
                    </p>
                    <br></br>
                    <Link href={`https://sepolia.etherscan.io/token/0x6c35a1F5db9d41Bd448c092Ab0a3Db2f66177Ea7`} passHref>
                        <Button
                            style={{
                                width: "100%",
                                backgroundColor: "#3b82f6",
                                color: "#ffffff",
                                fontWeight: "bold",
                                padding: "12px",
                                textAlign: "center",
                                cursor: "pointer",
                                borderRadius: "8px",
                            }}
                        >
                            View on Etherscan
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ERC20;
