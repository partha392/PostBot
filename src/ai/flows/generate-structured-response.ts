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
  6.  Include the source URLs at the end of the response to allow users to verify the information.
  7.  Structure your response to be informative and easy to read. It should not be too short, but also not overwhelmingly long. Find a good balance.

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
