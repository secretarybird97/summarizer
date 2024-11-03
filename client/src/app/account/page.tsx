"use client";

import { useState } from 'react';
import SiteHeader from "@/components/layout/siteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from '@/components/layout/footer';
export default function Page() {
    const [responseData, setResponseData] = useState<string | null>(null);


    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
                <div className="justify-items-center w-10/12 ">
                    <h1 className="font-bold ">Summaries history</h1>
                    <h3 className="font-bold " >Title of Article</h3>
                    <p className="text-justify">Summarizer is an AI assisted tool focused on generating article summaries either through the URL or plain text.<br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui. <br /><br /></p>
                    <h3 className="font-bold " >Title of Article</h3>
                    <p className="text-justify">Summarizer is an AI assisted tool focused on generating article summaries either through the URL or plain text.<br/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui. <br /><br /></p>
                </div>
                <Card className="bg-cardsBG w-5/12 h-min border-NavText">
                    <CardHeader>
                        <CardTitle className="text-NavText font-bold">Basic Plan</CardTitle>
                        <CardDescription className="text-white">You currently have the Basic Plan</CardDescription>
                    </CardHeader>
                    <CardContent className="text-white">
                        <ul className="list-disc list-inside">
                            <li>3 summaries per day.</li>
                            <li>10 summaries limit in storage of summaries.</li>
                        </ul>
                        <br />
                        <br />
                        <Button className="w-full h-full align-bottom rounded-none font-bold leading-loose bg-intButton hover:bg-rose-500">
                        <a href="/about">Manage plan</a>
                        </Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
