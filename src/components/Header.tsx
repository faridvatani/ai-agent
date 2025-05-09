"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/context/navigation";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const { isMobileNavOpen, setIsMobileNavOpen } = useNavigation();

  const handleNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNavToggle}
            className="md:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          >
            {isMobileNavOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
          <Link
            href="/"
            passHref
            className="text-xl font-semibold bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-400 dark:to-gray-100 bg-clip-text text-transparent"
          >
            AI Agent
          </Link>
        </div>
        <div className="flex items-center gap-2.5">
          <ModeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "size-8 ring-2 ring-gray-200/50 ring-offset-2 rounded-full transition-shadow hover:ring-gray-300/50",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
