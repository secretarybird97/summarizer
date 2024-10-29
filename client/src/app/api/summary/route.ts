import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { input } = await request.json();

  try {
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/Summarize/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: input }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to summarize article");
    }

    const summary = await response.json();
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
