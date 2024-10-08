import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  try {
    const backendUrl = process.env.BACKEND_URL;
    console.log(`${backendUrl}/ArticleSummary`);
    const data = await fetch(`${backendUrl}/ArticleSummary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });
    if (!data.ok) {
      throw new Error("Failed to get article summary");
    }

    const summary = await data.json();
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
