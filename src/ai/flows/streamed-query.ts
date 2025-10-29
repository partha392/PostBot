'use server';
/**
 * @fileOverview A streaming AI flow that uses either a knowledge base or web search.
 *
 * - streamedQuery - A function that handles the query and streams the response.
 * - StreamedQueryInput - The input type for the streamedQuery function.
 */

import { ai } from '@/ai/genkit';
import { getKnowledgeForQuery } from '@/lib/knowledge-base';
import type { Message } from '@/lib/types';
import { z } from 'zod';

const StreamedQueryInputSchema = z.object({
  query: z.string().describe('The user query.'),
  docContent: z
    .string()
    .optional()
    .describe('The content of an uploaded document, if any.'),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .describe('The chat history.'),
});

export type StreamedQueryInput = z.infer<typeof StreamedQueryInputSchema>;

export async function streamedQuery(input: StreamedQueryInput) {
  return streamedQueryFlow(input);
}

const docPrompt = ai.definePrompt({
  name: 'docPrompt',
  input: {
    schema: z.object({
      query: z.string(),
      docContent: z.string(),
    }),
  },
  prompt: `You are an AI assistant specialized in analyzing documents and images.
  
  Based on the provided document content and the user's query, generate a concise summary or answer. If the content is an image, describe the image and answer the user's query based on its contents.
  
  User Query: {{{query}}}
  
  Document Content:
  {{media url=docContent}}
  
  Answer:`,
});

const knowledgePrompt = ai.definePrompt({
  name: 'knowledgePrompt',
  input: {
    schema: z.object({
      query: z.string(),
      information: z.string(),
    }),
  },
  prompt: `You are an AI assistant specialized in providing structured and detailed responses to user queries about India Post services and schemes. Your tone should be helpful, clear, and informative, like an expert explaining things without jargon.

  Instructions:
  1.  Start with a friendly introductory paragraph that summarizes what you're about to explain.
  2.  Organize the information into logical sections with clear, bolded headings (e.g., "Key Account / Scheme Types"). Use markdown '##' for main headings and '###' for sub-headings.
  3.  For each scheme or service, provide a clear breakdown including:
      - A brief description of what it is.
      - Eligibility requirements.
      - Key financial details (e.g., minimum deposit, interest rates).
      - Important caveats or rules (e.g., penalties, lock-in periods).
      - A "Use case" to explain who it's best for.
  4.  When you mention a key term (like a financial instrument, government scheme, or technical term), embed a hyperlink to the relevant Wikipedia page. Use markdown format for links, like [Term](https://en.wikipedia.org/wiki/Term).
  5.  Include a final section titled "Important Notes / Real-World Caveats" to give practical, no-fluff advice that applies generally to the schemes discussed.
  6.  Structure your response to be informative and easy to read. It should not be too short, but also not overwhelmingly long. Find a good balance.

  Query: {{{query}}}
  Information: {{{information}}}

  Response:`,
});

const webSearchPrompt = ai.definePrompt({
  name: 'webSearchPrompt',
  tools: ['googleSearch'],
  input: { schema: z.object({ query: z.string() }) },
  prompt: `You are a helpful AI assistant with access to Google Search. Your goal is to answer the user's query based on real-time information from the internet.

  Instructions:
  1.  Use the Google Search tool to find the most relevant and up-to-date information for the user's query.
  2.  Synthesize the information from the search results into a clear and comprehensive answer.
  3.  Structure your response in a readable format, using headings, lists, and bold text where appropriate.
  4.  Cite your sources by providing the URLs of the web pages you used to find the information. Include them at the end of your response.

  Query: {{{query}}}

  Response:`,
});

const streamedQueryFlow = ai.defineFlow(
  {
    name: 'streamedQueryFlow',
    inputSchema: StreamedQueryInputSchema,
    outputSchema: z.string(),
  },
  async ({ query, docContent, history }) => {
    if (docContent) {
      const {stream} = await docPrompt.stream({
        query,
        docContent,
      });
      return stream;
    }

    const { information } = getKnowledgeForQuery(query);

    if (information) {
      const {stream} = await knowledgePrompt.stream({
        query,
        information,
      });
      return stream;
    }

    const {stream} = await webSearchPrompt.stream({ query });
    return stream;
  }
);
