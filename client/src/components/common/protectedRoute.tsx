import { isAuthenticated } from "@/lib/api";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await isAuthenticated();

  if (!auth) {
    redirect("/login");
  }

  return <>{children}</>;
}
