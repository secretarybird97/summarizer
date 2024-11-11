import { Summary } from "@/types/summary";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await new Response(request.body).text();
  const data = JSON.parse(body);

  const requestData = {
    url: data.input,
    ipAddress: data.ip_address,
  };

  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/Summarize/article`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(requestData),
    });
    console.log(response);
    if (response.status === 429) {
      return NextResponse.json(
        { error: "Too many requests, please try again later" },
        { status: 429 }
      );
    }

    if (!response.ok) {
      throw new Error("Failed to summarize article");
    }

    const summary: Summary = await response.json();
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        responseHeaders.append(key, value);
      }
    });
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
