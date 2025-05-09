import { BotIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-full">
      <div className="relative max-w-2xl w-full">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-gray-100 to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50 rounded-3xl"></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px),linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] rounded-3xl"></div>

        <div className="relative space-y-6 p-8 text-center">
          <div className="bg-white/60 dark:bg-gray-950 backdrop-blur-xs shadow-xs ring-1 ring-gray-400/50 dark:ring-gray-100/50 rounded-2xl p-6 space-y-4">
            <div className="bg-linear-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 rounded-xl p-4 inline-flex">
              <BotIcon className="size-12 text-gray-600 dark:text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold bg-linear-to-br from-gray-900 to-gray-600 dark:from-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
              Welcome to the AI Agent Chat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Start a new conversation or select an existing chat from the
              sidebar. Your AI assistant is ready to help with any task.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center-safe gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-blue-500"></div>
                Real-time responses
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-green-500"></div>
                Smart assistance
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-purple-500"></div>
                Powerful tools
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
