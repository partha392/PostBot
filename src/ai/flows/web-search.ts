'use server';

/**
 * @fileOverview This file defines a Genkit flow for performing web searches.
 *
 * The flow takes a user query, uses the googleSearch tool to find relevant information
 * on the internet, and then generates a structured response based on the search results.
 *
 * @fileOverview
 * - webSearch - A function that performs a web search and generates a response.
 * - WebSearchInput - The input type for the webSearch function.
 * - WebSearchOutput - The return type for the webSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WebSearchInputSchema = z.object({
  query: z.string().describe('The user query to search the web for.'),
});

export type WebSearchInput = z.infer<typeof WebSearchInputSchema>;

const WebSearchOutputSchema = z.object({
  response: z.string().describe('The structured and detailed response based on web search results.'),
});

export type WebSearchOutput = z.infer<typeof WebSearchOutputSchema>;

export async function webSearch(
  input: WebSearchInput
): Promise<WebSearchOutput> {
  return webSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'webSearchPrompt',
  input: {schema: WebSearchInputSchema},
  output: {schema: WebSearchOutputSchema},
  tools: ['googleSearch'],
  prompt: `You are a helpful AI assistant with access to Google Search. Your goal is to answer the user's query based on real-time information from the internet.

  Instructions:
  1.  Use the Google Search tool to find the most relevant and up-to-date information for the user's query.
  2.  Synthesize the information from the search results into a clear and comprehensive answer.
  3.  Structure your response in a readable format, using headings, lists, and bold text where appropriate.
  4.  Cite your sources by providing the URLs of the web pages you used to find the information. Include them at the end of your response.

  Query: {{{query}}}

  Response:`,
});

const webSearchFlow = ai.defineFlow(
  {
    name: 'webSearchFlow',
    inputSchema: WebSearchInputSchema,
    outputSchema: WebSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
