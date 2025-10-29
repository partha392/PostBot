'use server';

/**
 * @fileOverview Classifies user queries into predefined categories.
 *
 * - classifyUserQuery - A function that classifies the user query.
 * - ClassifyUserQueryInput - The input type for the classifyUserQuery function.
 * - ClassifyUserQueryOutput - The return type for the classifyUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyUserQueryInputSchema = z.object({
  query: z.string().describe('The user query to classify.'),
});
export type ClassifyUserQueryInput = z.infer<typeof ClassifyUserQueryInputSchema>;

const ClassifyUserQueryOutputSchema = z.object({
  category: z
    .string()    
    .describe("The classified category of the user query. Possible values: 'Savings & Investment Accounts', 'Postal Facilities', 'Other'."),
});
export type ClassifyUserQueryOutput = z.infer<typeof ClassifyUserQueryOutputSchema>;

export async function classifyUserQuery(input: ClassifyUserQueryInput): Promise<ClassifyUserQueryOutput> {
  return classifyUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyUserQueryPrompt',
  input: {schema: ClassifyUserQueryInputSchema},
  output: {schema: ClassifyUserQueryOutputSchema},
  prompt: `You are an AI assistant specializing in classifying user queries related to India Post services.

  Classify the following user query into one of the following categories:
  - Savings & Investment Accounts
  - Postal Facilities
  - Other

  User Query: {{{query}}}

  Return ONLY the category name.
`,
});

const classifyUserQueryFlow = ai.defineFlow(
  {
    name: 'classifyUserQueryFlow',
    inputSchema: ClassifyUserQueryInputSchema,
    outputSchema: ClassifyUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
