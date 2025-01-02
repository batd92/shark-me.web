import React, { useEffect, useState } from "react";
import { Button } from "@/lib/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { useTokenSMAService } from "../../hooks/useTokenSMAService";

const Staking: React.FC = () => {
    const { address } = useAccount();
    const ressult = useTokenSMAService();

    const { data } = useBalance({
        address,
    });

    const ens = useEnsName({
        address,
    });

    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (ressult && address) {
                const fetchedBalance = await ressult.getBalance(address);
                console.log("Balance:", balance);
                setBalance(fetchedBalance);
            }
        };

        fetchBalance();
    }, [ressult, address]);

    const handleConnectWallet = () => {};

    const handleStake = () => {};

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}
        >
            <div
                style={{
                    width: "350px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    transition: "transform 0.3s ease-in-out",
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    <img
                        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                        alt="Blockchain Staking"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "12px",
                        }}
                    />
                </div>
            </div>

            <Dialog.Root open={true}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        style={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    />
                    <Dialog.Content
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#ffffff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            width: "300px",
                            textAlign: "center",
                        }}
                    >
                        <h4 style={{ color: "#ff5c5c" }}>Please Connect Your Wallet First</h4>
                        <Button
                            onClick={() => {}}
                            style={{
                                backgroundColor: "#ff5c5c",
                                color: "#ffffff",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                marginTop: "16px",
                            }}
                        >
                            Close
                        </Button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default Staking;
