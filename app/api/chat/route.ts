import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  try {
    const result = streamText({
      model: openai("gpt-4.1-mini"),
      messages: [...(await convertToModelMessages(messages))],
    });
    return result.toUIMessageStreamResponse();
  } catch (e) {
    console.log("Error in streaming response", e);
    return new Response(e instanceof Error ? e.message : "api is failing", {
      status: 500,
    });
  }
}
