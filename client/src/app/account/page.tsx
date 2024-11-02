"use client";

import { useState } from 'react';
import SiteHeader from "@/components/layout/siteHeader";
import Plan from '@/components/features/plan';
export default function Page() {
    const [responseData, setResponseData] = useState<string | null>(null);


    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-32 pb-20 gap-16 sm:p-200 font-[family-name:var(--font-geist-sans)]">    
                <p>Account</p>            
            </main>
        </div>
    );
}
