// initialise AI model
import { ChatAnthropic } from "@langchain/anthropic";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import wxflows from "@wxflows/sdk/langchain";

// Tools are ability to communicate with the LLM provider
// Connect to wxflows
const toolClient = new wxflows({
  endpoint: process.env.WXFLOWS_ENDPOINT || "",
  apikey: process.env.WXFLOWS_APIKEY,
});

// Retrieve the tools
const tools = await toolClient.lcTools;
const toolNode = new ToolNode(tools);

// Connect to the LLM provider with better tool instructions
const initialiseModel = () => {
  const model = new ChatAnthropic({
    modelName: "claude-3-5-sonnet-20241022",
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    temperature: 0.7, // Creativity level
    maxTokens: 4096, //  Max tokens for generate longer responses
    streaming: true, // Enable streaming for SSE
    clientOptions: {
      defaultHeaders: {
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
    },
    callbacks: [
      {
        handleLLMStart: async () => {
          // console.log("🤖 Starting LLM call");
        },
        handleLLMEnd: async (output) => {
          console.log("🤖 End LLM call", output);
          const usage = output.llmOutput?.usage;
          if (usage) {
            // console.log("📊 Token Usage:", {
            //   input_tokens: usage.input_tokens,
            //   output_tokens: usage.output_tokens,
            //   total_tokens: usage.input_tokens + usage.output_tokens,
            //   cache_creation_input_tokens:
            //     usage.cache_creation_input_tokens || 0,
            //   cache_read_input_tokens: usage.cache_read_input_tokens || 0,
            // });
          }
        },
        // handleLLMNewToken: async (token: string) => {
        //   // console.log("🔤 New token:", token);
        // },
      },
    ],
  }).bindTools(tools);

  return model;
};

// Define the a new graph
const createWorkflow = () => {
  const model = initialiseModel();

  // implement langgraph
  //   return new StateGraph({});
};
