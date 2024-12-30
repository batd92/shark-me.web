import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import Link from "next/link";

const Vesting: React.FC = () => {
    

    return (
        <div className="flex flex-col lg:flex-row justify-start items-center gap-6 p-6">
            ERC-20
            <div className="mt-4 text-center">
                    <Button asChild>
                        <Link href="/">Let&apos;s Head Back</Link>
                    </Button>
                </div>
        </div>
    );
};

export default Vesting;
