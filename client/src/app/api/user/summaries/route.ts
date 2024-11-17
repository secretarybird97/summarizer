import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function GET() {
  const backendUrl = process.env.BACKEND_URL;
  const cookieStore = await cookies();
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedSummaries = summaries.map((summary: any) => {
    return {
      title: summary.title,
      content: summary.content,
    };
  });

  return NextResponse.json({ summaries: mappedSummaries });
}
