"use client";

import { useState } from 'react';

export default function Page() {
    const [responseData, setResponseData] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const url = formData.get("url") as string;

        const response = await fetch('/api/summary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error("Failed to get article summary");
        }

        const data = await response.json();
        setResponseData(data);
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <form onSubmit={handleSubmit}>
                    <input
                        name="url"
                        type="url"
                        placeholder="Enter an article URL"
                        required
                        className="w-full p-2 border border-solid border-black/[.08] dark:border-white/[.145] rounded text-sm black text-black"
                    />
                    <button
                        type="submit"
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    >
                        Submit
                    </button>
                </form>
                {responseData && (
                    <div className="mt-4 p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded text-sm black text-white">
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}
            </main>
        </div>
    );
}
