"use client";

import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

async function handleLogout() {
  try {
    await logout();
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
}

interface NavBarProps {
  isAuthenticated: boolean;
}

export default function NavBar({ isAuthenticated }: NavBarProps) {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const authNavItems = isAuthenticated
    ? [{ name: "Account", href: "/account" }]
    : [
        { name: "Login", href: "/login" },
        { name: "Sign Up", href: "/register" },
      ];

  const allNavItems = [...navItems, ...authNavItems];

  return (
    <header className="sticky top-0 z-50 w-full border-b mb-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="justify-between flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 ml-6">
            <span className="hidden font-bold sm:inline-block font-serif text-NavText">
              Summarizer.
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {allNavItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={pathname === item.href}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 pl-4 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-3">
              {allNavItems.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setIsOpen}
                >
                  {item.name}
                </MobileLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center space-x-2 p-6 justify-end">
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {isAuthenticated && (
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

interface MobileLinkProps {
  href: string;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={`${className} ${
        pathname === href ? "text-foreground" : "text-foreground/60"
      } transition-colors hover:text-foreground`}
      {...props}
    >
      {children}
    </Link>
  );
}
