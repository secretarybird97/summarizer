// app/components/NavBarWrapper.tsx
import { cookies } from "next/headers";
import NavBar from "./navBar";

async function getAuthStatus() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(".AspNetCore.Identity.Application");
  return !!authCookie;
}

export default async function NavBarWrapper() {
  const isAuthenticated = await getAuthStatus();
  return <NavBar isAuthenticated={isAuthenticated} />;
}
