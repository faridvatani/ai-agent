"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/lib/context/navigation";
import { PlusIcon } from "lucide-react";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoadingSpinner } from "./ui/LoadingSpinner";
import ChatList from "./ChatList";

export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = useNavigation();
  const { isLoading, isAuthenticated } = useConvexAuth();

  const createChat = useMutation(api.chats.createChat);

  const handleNewChat = async () => {
    const chatId = await createChat({ title: "New Chat" });
    router.push(`/dashboard/chat/${chatId}`);
    closeMobileNav();
  };

  return (
    <>
      {/* Background Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          aria-label="Close sidebar"
          onClick={closeMobileNav}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72 bg-white dark:bg-gray-950 backdrop-blur-xl border-r border-gray-300 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-3 border-b border-gray-300">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gray-950 hover:bg-gray-900 dark:hover:bg-gray-900 text-gray-100 dark:text-white border border-gray-200 shadow-xs hover:shadow-sm transition-all duration-200"
          >
            <PlusIcon className="mr-2 size-4" /> New Chat
          </Button>
        </div>

        {isAuthenticated && !isLoading ? (
          <ChatList />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-50 space-x-2.5">
            <LoadingSpinner />
            <span>Loading chats...</span>
          </div>
        )}
      </aside>
    </>
  );
}
