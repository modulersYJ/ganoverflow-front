import { ChatGPTMessage } from "@/utils/openAI/chatGPT";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/openAI/openAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export async function POST(req: Request): Promise<Response> {
  const { prompts } = (await req.json()) as {
    prompts?: ChatGPTMessage[];
  };

  if (!prompts) {
    return new Response("No prompts in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: prompts,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 4096,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
