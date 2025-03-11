"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";

interface ChatInterfaceProps {
  chatId: Id<"chats">;
  initialMessages: Doc<"messages">[];
}

const ChatInterface = ({ chatId, initialMessages }: ChatInterfaceProps) => {
  return <div>Chat interface</div>;
};

export default ChatInterface;
