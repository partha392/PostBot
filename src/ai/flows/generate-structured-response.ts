'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating structured and concise responses.
 *
 * The flow takes a query and relevant information as input, and returns a structured response
 * with clear headings, bullet points, and source URLs.
 *
 * @fileOverview
 * - generateStructuredResponse - A function that generates structured responses.
 * - GenerateStructuredResponseInput - The input type for the generateStructuredResponse function.
 * - GenerateStructuredResponseOutput - The return type for the generateStructuredResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStructuredResponseInputSchema = z.object({
  query: z.string().describe('The user query.'),
  information: z.string().describe('The relevant information to answer the query.'),
  sourceUrls: z.array(z.string()).describe('The source URLs for the information.'),
});

export type GenerateStructuredResponseInput = z.infer<typeof GenerateStructuredResponseInputSchema>;

const GenerateStructuredResponseOutputSchema = z.object({
  response: z.string().describe('The structured and detailed response.'),
});

export type GenerateStructuredResponseOutput = z.infer<typeof GenerateStructuredResponseOutputSchema>;

export async function generateStructuredResponse(
  input: GenerateStructuredResponseInput
): Promise<GenerateStructuredResponseOutput> {
  return generateStructuredResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStructuredResponsePrompt',
  input: {schema: GenerateStructuredResponseInputSchema},
  output: {schema: GenerateStructuredResponseOutputSchema},
  prompt: `You are an AI assistant specialized in providing structured and detailed responses to user queries about India Post services and schemes.

  Instructions:
  1.  Use clear headings and subheadings to organize the information.
  2.  Use bullet points to present key information in a clear manner.
  3.  When you mention a key term (like a financial instrument, government scheme, or technical term), embed a hyperlink to the relevant Wikipedia page. Use markdown format for links, like [Term](https://en.wikipedia.org/wiki/Term).
  4.  Include the source URLs at the end of the response to allow users to verify the information.
  5.  Avoid unnecessary details, but explain the key features and benefits thoroughly. Provide a good level of detail.
  6.  Structure your response to be informative and easy to read, not too short and not too long.

  Query: {{{query}}}
  Information: {{{information}}}
  Source URLs: {{#each sourceUrls}}{{{this}}} {{/each}}

  Response:`,
});

const generateStructuredResponseFlow = ai.defineFlow(
  {
    name: 'generateStructuredResponseFlow',
    inputSchema: GenerateStructuredResponseInputSchema,
    outputSchema: GenerateStructuredResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
