import { AccountDetails } from "@/types/account-details";
import { UserSummary } from "@/types/user-summary";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(".AspNetCore.Identity.Application");

  if (!authCookie) return false;

  // ?  Needed?
  //   const response = await fetch('https://your-aspnet-api.com/verify-auth', {
  //     headers: {
  //       Cookie: `your_auth_cookie_name=${authCookie.value}`
  //     },
  //     credentials: 'include',
  //   })

  //   return response.ok
  return true;
}

export async function fetchSummaries() {
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

  const summaries: UserSummary[] = await response.json();

  const mappedSummaries = summaries.map((summary: UserSummary) => {
    return {
      title: summary.title,
      content: summary.content,
      id: summary.id,
      createdAt: summary.createdAt,
    };
  });

  return NextResponse.json(mappedSummaries);
}

export async function fetchAccountDetails() {
  const backendUrl = process.env.BACKEND_URL;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const response = await fetch(`${backendUrl}/User/info`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    return NextResponse.error();
  }

  const accountDetails: AccountDetails = await response.json();

  return NextResponse.json(accountDetails);
}
