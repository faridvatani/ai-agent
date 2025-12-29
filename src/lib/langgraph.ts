/* initialise AI model
   - https://js.langchain.com/docs/integrations/chat/
   - https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
   - https://js.langchain.com/docs/integrations/chat/openai/#prompt-caching
   - https://langchain-ai.github.io/langgraphjs/concepts/
*/

import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import wxflows from "@wxflows/sdk/langchain";
import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import SYSTEM_MESSAGE from "@/constants/systemMessage";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  AIMessage,
  BaseMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";

// Trim the messages to manage conversation history
const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

// Tools are ability to communicate with the LLM provider
// Connect to wxflows
const toolClient = new wxflows({
  endpoint: process.env.WXFLOWS_ENDPOINT || "",
  apikey: process.env.WXFLOWS_APIKEY,
});

// Retrieve the tools
let toolNode: ToolNode | null = null;

async function getToolNode() {
  if (toolNode) return toolNode;

  const tools = await toolClient.lcTools;
  toolNode = new ToolNode(tools);

  return toolNode;
}

// Connect to the LLM provider with better tool instructions
const initialiseModel = () => {
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7, // Creativity level
    maxTokens: 4096, //  Max tokens for generate longer responses
    streaming: true, // Enable streaming for SSE
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
  });

  return model;
};

// Define the function that determines whether to continue or not
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) return "tools";

  // If the last message is a tool message, route back to agent
  if (lastMessage.content && lastMessage._getType() === "tool") return "agent";

  // Otherwise, we stop (reply to the user)
  return END;
}

// Define the a new graph
const createWorkflow = async () => {
  const model = initialiseModel();
  const toolsNode = await getToolNode();

  // bind tools after they are ready
  model.bindTools(toolsNode.tools);

  // implement langgraph
  return new StateGraph(MessagesAnnotation)
    .addNode("agent", async (state) => {
      // Create the system message content
      const systemContent = SYSTEM_MESSAGE;

      // Create the prompt template with system message and messages placeholder
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemContent),
        new MessagesPlaceholder("messages"),
      ]);

      // Trim the messages to manage conversation history
      const trimmedMessages = await trimmer.invoke(state.messages);

      // Format the prompt with the current messages
      const prompt = await promptTemplate.invoke({ messages: trimmedMessages });

      // Get response from the model
      const response = await model.invoke(prompt);

      return { messages: [response] };
    })
    .addNode("tools", toolsNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");
};

export async function submitQuestion(messages: BaseMessage[], chatId: string) {
  // Create workflow with chatId and onToken callback
  const workflow = await createWorkflow();

  // Create a checkpoint to save the state of the conversation
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer });

  return app.streamEvents(
    { messages },
    {
      version: "v2",
      configurable: { thread_id: chatId },
      streamMode: "messages",
      runId: chatId,
    }
  );
}
