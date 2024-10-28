import { NextResponse } from "next/server";

export async function POST() {
  //   console.log(request);
  try {
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/Logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error("Failed to logout");
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
