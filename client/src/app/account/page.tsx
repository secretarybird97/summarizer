import ManagePlan from "@/components/features/managePlan";
import UserSummaries from "@/components/features/userSummaries";
import { UserInfo } from "@/types/user_info";
import { UserSummary } from "@/types/user_summary";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sampleSummaries, sampleUserInfo } from "./data";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // const response = await fetchSummaries();
  // if (response.status === 401) {
  //   return NextResponse.redirect("/login");
  // }
  // const data = await response.json();
  const summaries: UserSummary[] = sampleSummaries;
  const userInfo: UserInfo = sampleUserInfo;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="justify-items-center w-full">
          <h1 className="font-bold text-4xl text-NavText mb-10">
            Summaries history
          </h1>
          <UserSummaries summaries={summaries} />
        </div>
        <ManagePlan userInfo={userInfo} />
      </main>
    </div>
  );
}
