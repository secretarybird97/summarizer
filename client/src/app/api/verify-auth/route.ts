// app/api/verify-auth/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get(".AspNetCore.Identity.Application");

  if (!auth) {
    return NextResponse.json({ status: "not_logged_in" }, { status: 401 });
  }

  return NextResponse.json({ status: "logged_in" }, { status: 200 });
}
