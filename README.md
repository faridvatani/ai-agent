This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Set up a Convex dev deployment

Next, run the following command:

```bash
npx convex dev
```

This will prompt you to log in with GitHub, create a project, and save your production and deployment URLs.

It will also create a `convex/` folder for you to write your backend API functions in. The dev command will then continue running to sync your functions with your dev deployment in the cloud.

## Getting Started with IBM Watsonx.ai Flows Engine

Follow these steps to set up your project using wxflows:

Setup

1. Sign Up & Authenticate: Create a free account, install the CLI for Python or Node.js, and log in to your account.

2. Create a Folder: Create a folder named wxflows.

3. Initialize Project:

```
wxflows init --endpoint=api/ai-agent
```

4. Install Pre-built Tools:
   From the [IBM wxflows tools repository](https://github.com/IBM/wxflows/blob/main/tools/README.md), import tools like Wikipedia, Google books, Math, YouTube Transcript and etc. For example:

```
wxflows import tool https://raw.githubusercontent.com/IBM/wxflows/refs/heads/main/tools/wikipedia.zip
wxflows import tool https://raw.githubusercontent.com/IBM/wxflows/refs/heads/main/tools/youtube_transcript.zip
wxflows import tool https://raw.githubusercontent.com/IBM/wxflows/refs/heads/main/tools/math.zip
wxflows import curl https://dummyjson.com/comments
wxflows import curl https://introspection.apis.stepzen.com/customers
```

5. Deploy the tools:

```
wxflows deploy
```
## Keywords
✅ **LangChain:** A framework for working with large language models (LLMs) that enables the use of tools, conversation history management, and more.<br>
✅ **LangGraph:** A tool for managing conversation flow and states using state graphs (StateGraph).<br>
✅ **systemMessage:** A message that instructs the model on how it should behave (such as guidelines or rules).<br>
✅ **Prompt Caching:** Storing requests and responses to speed up future conversations.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
