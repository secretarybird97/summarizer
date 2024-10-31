import { Button } from "../ui/button";

export default function MainNav() {
  return (
    <nav className="flex items-center justify-between w-full p-4">
      {/* Title on the left */}
      <div className="text-lg font-bold font-serif">
        <a href="/">Summarizer.</a>
      </div>

      {/* Nav items on the right */}
      <div className="flex gap-2">
        <Button variant="link">
          <a href="/about">About</a>
        </Button>
        <Button variant="link">
          <a href="/account">Account</a>
        </Button>
        <Button variant="link">
          <a href="/login">Login</a>
        </Button>
        <Button variant="link">
          <a href="/register">Signup</a>
        </Button>
      </div>
    </nav>
  );
}
