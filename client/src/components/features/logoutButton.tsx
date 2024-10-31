"use client";

import { Button } from "../ui/button";

const handleLogout = async () => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      console.log("Logout successful");
      window.location.reload();
    } else {
      // Handle error
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout", error);
  }
};

const LogoutButton = () => <Button onClick={handleLogout}>Logout</Button>;

export default LogoutButton;
