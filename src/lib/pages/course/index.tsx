import React, { useState } from "react";
import { Button } from "@/lib/components/ui/button";

const Course: React.FC = () => {
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
        setIsPurchased(true);
    };

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
                        <strong>Typography</strong> is the art and technique of arranging type to
                        make written language legible, readable, and appealing when displayed.
                    </p>
                    <div style={{ marginTop: "16px" }}>
                        <Button
                            onClick={handlePurchase}
                            disabled={isPurchased}
                            style={{
                                width: "100%",
                                backgroundColor: isPurchased ? "#d1d5db" : "#3b82f6",
                                color: "#ffffff",
                                cursor: isPurchased ? "not-allowed" : "pointer",
                            }}
                        >
                            {isPurchased ? "Đã Mua" : "Mua Khóa Học"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;
