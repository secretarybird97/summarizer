import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email} = await request.json();

  try {
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/recover?useCookies=true`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Invalid email");
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
