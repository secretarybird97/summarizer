import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/login?useCookies=true`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const cookies = response.headers.get("set-cookie");

    if (cookies) {
      return NextResponse.json(
        { status: 200 },
        { headers: { "set-cookie": cookies } }
      );
    } else {
      throw new Error("Failed to set cookies");
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
