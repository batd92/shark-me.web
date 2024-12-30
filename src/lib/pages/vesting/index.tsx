import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import Link from "next/link";

const Vesting: React.FC = () => {
    

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
                </div>
            </div>
        </div> 
    );
};

export default Vesting;
