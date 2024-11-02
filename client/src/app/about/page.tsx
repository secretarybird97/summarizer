"use client";

import { useState } from 'react';
import SiteHeader from "@/components/layout/siteHeader";
import Plan from '@/components/features/plan';
export default function Page() {
    const [responseData, setResponseData] = useState<string | null>(null);


    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
                <div>
                    <h1 className="font-bold ">About Summarizer</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui.</p>
                </div>
            <Plan />

            </main>
        </div>
    );
}
