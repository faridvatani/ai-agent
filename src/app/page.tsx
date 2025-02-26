import { BackgroundLines } from "@/components/ui/background-lines";
import FeatureCard from "@/components/ui/FeatureCard";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Bot, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

const featureCards = [
  {
    title: "Fast",
    description: "Real-time streamed responses",
    icon: <Rocket />,
  },
  {
    title: "Modern",
    description: "Next.js 15, Tailwind CSS, Convex, Clerk",
    icon: <Sparkles />,
  },
  {
    title: "Smart",
    description: "Powered by Your Favourite LLM's",
    icon: <Bot />,
  },
];

export default function Home() {
  return (
    <BackgroundLines>
      <main className="min-h-screen bg-black/90 flex flex-col justify-center items-center">
        <section className="w-full px-4 py-8 mx-auto max-w-6xl sm:px-6 lg:px-8 flex flex-col items-center space-y-5 text-center bg-white/95 backdrop-blur-lg rounded-full">
          {/* Hero content */}
          <header className="space-y-2">
            <h1 className="text-5xl font-bold tracking-tight sm:leading-tight sm:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              AI Agent Assistant
            </h1>
            <p className="max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed">
              Discover your AI chat assistant that not only converses but also
              accomplishes tasks!
            </p>
          </header>
          {/* CTA Button */}
          <SignedIn>
            <Link href="/dashboard">
              <button className="group relative inline-flex items-center justify-center px-8 py-2 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-md hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={"/dashboard"}
              forceRedirectUrl={"/dashboard"}
            >
              <button className="group relative inline-flex items-center justify-center px-8 py-2 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-md hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Sign Up
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </SignInButton>
          </SignedOut>
        </section>
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-8 max-w-3xl mx-auto">
          {featureCards.map(({ title, description, icon }) => (
            <FeatureCard
              key={title}
              title={title}
              description={description}
              icon={icon}
            />
          ))}
        </div>
      </main>
      <footer className="relative bottom-0 w-full p-4 text-center text-gray-500">
        <span className="text-gray-400 text-sm">
          Powered by IBM&apos;s WxTools & your preferred LLM&apos;s.
        </span>
      </footer>
    </BackgroundLines>
  );
}
