'use server';

/**
 * @fileOverview Generates a comparison table for different schemes based on user query.
 *
 * - generateComparisonTable - A function that handles the generation of the comparison table.
 * - GenerateComparisonTableInput - The input type for the generateComparisonTable function.
 * - GenerateComparisonTableOutput - The return type for the generateComparisonTable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateComparisonTableInputSchema = z.object({
  schemes: z.string().describe('The schemes to compare, separated by commas.'),
  query: z.string().describe('The user query for comparing the schemes.'),
});

export type GenerateComparisonTableInput = z.infer<
  typeof GenerateComparisonTableInputSchema
>;

const GenerateComparisonTableOutputSchema = z.object({
  comparisonTable: z.string().describe('The comparison table in markdown format.'),
});

export type GenerateComparisonTableOutput = z.infer<
  typeof GenerateComparisonTableOutputSchema
>;

export async function generateComparisonTable(
  input: GenerateComparisonTableInput
): Promise<GenerateComparisonTableOutput> {
  return generateComparisonTableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComparisonTablePrompt',
  input: {schema: GenerateComparisonTableInputSchema},
  output: {schema: GenerateComparisonTableOutputSchema},
  prompt: `You are an expert financial assistant specializing in creating comparison tables for different investment schemes.

  Based on the user query and the provided schemes, generate a comparison table in markdown format.
  The table should clearly outline the features and benefits of each scheme.

  Schemes: {{{schemes}}}
  Query: {{{query}}}

  Comparison Table:
  `,
});

const generateComparisonTableFlow = ai.defineFlow(
  {
    name: 'generateComparisonTableFlow',
    inputSchema: GenerateComparisonTableInputSchema,
    outputSchema: GenerateComparisonTableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
