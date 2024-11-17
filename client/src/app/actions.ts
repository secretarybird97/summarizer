"use server";

import { SubscriptionTier } from "@/types/subscription-tier";
import { cookies } from "next/headers";

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
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
    throw new Error("Login failed");
  }

  const responseCookies = response.headers.get("set-cookie");

  if (responseCookies) {
    const parsedCookies = responseCookies
      .split(",")
      .map((cookie) => cookie.trim());

    const cookieStore = await cookies();

    parsedCookies.forEach((cookie) => {
      const [cookieName, ...cookieValue] = cookie.split("=");
      cookieStore.set({
        name: cookieName,
        value: cookieValue.join("="),
      });
    });
  }

  return null;
}

export async function logout() {
  const backendUrl = process.env.BACKEND_URL;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const response = await fetch(`${backendUrl}/User/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  cookieStore.delete(".AspNetCore.Identity.Application");
  return null;
}

export async function changeSubscription(subscriptionTier: SubscriptionTier) {
  const newSubscriptionTier =
    subscriptionTier === SubscriptionTier.Premium
      ? SubscriptionTier.Free
      : SubscriptionTier.Premium;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  const backendUrl = process.env.BACKEND_URL;
  console.log(JSON.stringify({ newSubscription: newSubscriptionTier }));
  const response = await fetch(`${backendUrl}/User/subscription`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ newSubscriptionTier }),
  });

  if (!response.ok) {
    throw new Error("Change subscription failed");
  }

  return null;
}
