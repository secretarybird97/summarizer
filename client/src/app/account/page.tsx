"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scrollarea"
import { Trash2Icon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdownmenu"
import React from 'react';
import { Input } from '@/components/ui/input';
export default function Page() {
    
    const [responseData, setResponseData] = useState<string | null>(null);
    const [sortby, setSortby] = React.useState("Most recent")

    return (
        <div className="flex min-h-screen flex-col">
            <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
                <div className="justify-items-center w-full">
                    <h1 className="font-bold text-4xl text-NavText mb-10">Summaries history</h1>
                    <div className="grid grid-cols-2 w-full mb-4 px-10 justify-between">
                        <Input className="justify-self-start w-64" placeholder="Search by article name:" />
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="justify-self-end w-40 " variant="outline">Sort by: {sortby} </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                            <DropdownMenuRadioGroup value={sortby} onValueChange={setSortby}>
                            <DropdownMenuRadioItem value="Most recent">Most recent</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Oldest">Oldest</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <ScrollArea className="h-96 w-11/12 rounded-md border p-6">
                    <Card className="bg-cardsBG w-full h-min border-transparent my-5 ml-0.5">
                        <CardHeader>
                            <CardTitle className="text-NavText font-bold self-center">Title of Article 1</CardTitle>
                            <CardDescription className="text-white self-end">Generated on 05/11/2024</CardDescription>
                        </CardHeader>
                        <CardContent className="text-white">
                            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, nulla perferendis! Natus odit quaerat veniam esse porro sit, voluptatibus recusandae repellendus, molestias minima ex consequuntur ea laborum, unde autem deserunt. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui.</p>
                        </CardContent>
                        <CardContent className="justify-self-end">
                            <Button className="rounded-none bg-black hover:bg-rose-500">
                                <Trash2Icon color='white' /> <p className="text-white">Delete from history</p>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-cardsBG w-full h-min border-transparent my-5">
                        <CardHeader>
                            <CardTitle className="text-NavText font-bold self-center">Title of Article 2</CardTitle>
                            <CardDescription className="text-white self-end">Generated on 03/11/2024</CardDescription>
                        </CardHeader>
                        <CardContent className="text-white">
                            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, nulla perferendis! Natus odit quaerat veniam esse porro sit, voluptatibus recusandae repellendus, molestias minima ex consequuntur ea laborum, unde autem deserunt. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui.</p>
                        </CardContent>
                        <CardContent className="justify-self-end">
                            <Button className="rounded-none bg-black hover:bg-rose-500">
                                <Trash2Icon color='white' /> <p className="text-white">Delete from history</p>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-cardsBG w-full h-min border-transparent my-5 ml-0.5">
                        <CardHeader>
                            <CardTitle className="text-NavText font-bold self-center">Title of Article 3</CardTitle>
                            <CardDescription className="text-white self-end">Generated on 02/11/2024</CardDescription>
                        </CardHeader>
                        <CardContent className="text-white">
                            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, nulla perferendis! Natus odit quaerat veniam esse porro sit, voluptatibus recusandae repellendus, molestias minima ex consequuntur ea laborum, unde autem deserunt. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui.</p>
                        </CardContent>
                        <CardContent className="justify-self-end">
                            <Button className="rounded-none bg-black hover:bg-rose-500">
                                <Trash2Icon color='white' /> <p className="text-white">Delete from history</p>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="bg-cardsBG w-full h-min border-transparent my-5">
                        <CardHeader>
                            <CardTitle className="text-NavText font-bold self-center">Title of Article 4</CardTitle>
                            <CardDescription className="text-white self-end">Generated on 01/11/2024</CardDescription>
                        </CardHeader>
                        <CardContent className="text-white">
                            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, nulla perferendis! Natus odit quaerat veniam esse porro sit, voluptatibus recusandae repellendus, molestias minima ex consequuntur ea laborum, unde autem deserunt. Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat, sequi doloribus commodi quae! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus, nostrum placeat, corporis omnis tempora aliquam incidunt praesentium, repudiandae architecto dolores sit natus minus ab nihil magnam minima fuga quo qui.</p>
                        </CardContent>
                        <CardContent className="justify-self-end">
                            <Button className="rounded-none bg-black hover:bg-rose-500">
                                <Trash2Icon color='white' /> <p className="text-white">Delete from history</p>
                            </Button>
                        </CardContent>
                    </Card>
                    </ScrollArea>

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
        </div>
    );
}
