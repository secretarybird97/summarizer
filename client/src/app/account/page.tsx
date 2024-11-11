import UserSummaries from "@/components/features/userSummaries";
import Footer from "@/components/layout/footer";
import SiteHeader from "@/components/layout/siteHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserSummary } from "@/types/user_summary";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function fetchSummaries() {
  const backendUrl = process.env.BACKEND_URL;
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${backendUrl}/User/summaries`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  const summaries = await response.json();

  const mappedSummaries = summaries.map((summary: UserSummary) => {
    return {
      title: summary.title,
      content: summary.content,
      id: summary.id,
      createdAt: summary.createdAt,
    };
  });

  return NextResponse.json({ summaries: mappedSummaries });
}

export default async function Page() {
  const response = await fetchSummaries();
  const data = await response.json();
  const summaries = data.summaries;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="justify-items-center w-full">
          <h1 className="font-bold text-4xl text-NavText mb-10">
            Summaries history
          </h1>
          <UserSummaries summaries={summaries} />
        </div>
        <Card className="bg-cardsBG w-5/12 h-min border-NavText">
          <CardHeader>
            <CardTitle className="text-NavText font-bold">Basic Plan</CardTitle>
            <CardDescription className="text-white">
              You currently have the Basic Plan
            </CardDescription>
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
