"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ChatRow from "./ChatRow";
import { LoadingSpinner } from "./ui/LoadingSpinner";

export default function ChatList() {
  const router = useRouter();
  const chats = useQuery(api.chats.listChats);
  const deleteChat = useMutation(api.chats.deleteChat);

  const handleDeleteChat = async (id: Id<"chats">) => {
    await deleteChat({ id });
    // If we're currently viewing this chat, redirect to dashboard
    if (window.location.pathname.includes(id)) {
      router.push("/dashboard");
    }
  };

  if (!chats) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-50 space-x-2.5">
        <LoadingSpinner />
        <span>Loading chats...</span>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-50">
        <span>No chats available.</span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      {chats.map((chat) => (
        <ChatRow key={chat._id} chat={chat} onDelete={handleDeleteChat} />
      ))}
    </div>
  );
}
