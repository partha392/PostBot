'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing a document.
 *
 * The flow takes document content and a user query as input and returns a
 * summary or answer based on the document.
 *
 * @fileOverview
 * - summarizeDocument - A function that handles document summarization.
 * - SummarizeDocumentInput - The input type for the summarizeDocument function.
 * - SummarizeDocumentOutput - The return type for the summarizeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDocumentInputSchema = z.object({
  docContent: z.string().describe('The content of the document to summarize.'),
  query: z.string().describe('The user query related to the document.'),
});

export type SummarizeDocumentInput = z.infer<typeof SummarizeDocumentInputSchema>;

const SummarizeDocumentOutputSchema = z.object({
  summary: z.string().describe('The summary or answer based on the document.'),
});

export type SummarizeDocumentOutput = z.infer<typeof SummarizeDocumentOutputSchema>;

export async function summarizeDocument(
  input: SummarizeDocumentInput
): Promise<SummarizeDocumentOutput> {
  return summarizeDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDocumentPrompt',
  input: {schema: SummarizeDocumentInputSchema},
  output: {schema: SummarizeDocumentOutputSchema},
  prompt: `You are an AI assistant specialized in summarizing documents.
  
  Based on the provided document content and the user's query, generate a concise summary or answer.
  
  User Query: {{{query}}}
  
  Document Content:
  {{{docContent}}}
  
  Summary:`,
});

const summarizeDocumentFlow = ai.defineFlow(
  {
    name: 'summarizeDocumentFlow',
    inputSchema: SummarizeDocumentInputSchema,
    outputSchema: SummarizeDocumentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
