import type { APIRoute } from 'astro';
import { streamText } from 'ai';
import { matchUserQuery } from '../../utils/chatMatcher';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage?.content || '';

    // Match user query and get response
    const response = matchUserQuery(userQuery);

    // Create a simple text stream using AI SDK's streamText with a mock model
    const result = streamText({
      model: {
        provider: 'mock',
        modelId: 'mock',
        doStream: async ({ prompt }) => {
          const encoder = new TextEncoder();
          return {
            stream: new ReadableStream({
              async start(controller) {
                // Simulate streaming by sending the response content
                const content = response.content;
                const words = content.split(' ');

                for (const word of words) {
                  controller.enqueue(encoder.encode(JSON.stringify({ type: 'text-delta', textDelta: word + ' ' }) + '\n'));
                  await new Promise(resolve => setTimeout(resolve, 30));
                }

                controller.enqueue(encoder.encode(JSON.stringify({ type: 'finish', finishReason: 'stop' }) + '\n'));
                controller.close();
              },
            }),
            rawCall: { rawPrompt: prompt, rawSettings: {} },
          };
        },
      } as any,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
