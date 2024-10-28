"use client";

import { useEffect, useState } from "react";

async function checkUserStatus() {
  const response = await fetch("/api/verify-auth", { credentials: "include" });
  if (!response.ok) {
    return false; // User is not logged in
  }

  const data = await response.json();
  return data.status === "logged_in"; // Check the returned status
}

export default function UserStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkUserStatus().then(setIsLoggedIn);
  }, []);

  return (
    <div>{isLoggedIn ? <p>You’re logged in!</p> : <p>Please log in</p>}</div>
  );
}
