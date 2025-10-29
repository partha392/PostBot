'use server';

import { classifyUserQuery } from '@/ai/flows/classify-user-query';
import { generateComparisonTable } from '@/ai/flows/generate-comparison-table';
import { generateStructuredResponse } from '@/ai/flows/generate-structured-response';
import { getKnowledgeForQuery, SCHEME_ACRONYMS } from '@/lib/knowledge-base';
import type { FormState } from '@/lib/types';

export async function handleQuery(prevState: FormState, formData: FormData): Promise<FormState> {
  const query = formData.get('query') as string;

  if (!query) {
    return { error: 'Query is required.', message: '' };
  }

  try {
    const queryUpper = query.toUpperCase();
    const mentionedSchemes = SCHEME_ACRONYMS.filter((s) => queryUpper.includes(s.toUpperCase()));
    
    const isComparison =
      queryUpper.includes('COMPARE') ||
      queryUpper.includes(' VS ') ||
      mentionedSchemes.length > 1;

    if (isComparison) {
      const schemesToCompare = mentionedSchemes.join(', ');
      if (schemesToCompare) {
        const result = await generateComparisonTable({
          schemes: schemesToCompare,
          query,
        });
        return { message: result.comparisonTable, isTable: true };
      }
    }

    const classification = await classifyUserQuery({ query });

    const { information, sourceUrls } = getKnowledgeForQuery(
      query,
      classification.category
    );

    if (!information) {
      // Fallback for general queries
      const genericResponse = await generateStructuredResponse({
        query: query,
        information: "You are a helpful assistant for India Post. The user has a general query. Provide a helpful and friendly response, guiding them to ask more specific questions about services like SCSS, MIS, Speed Post, etc.",
        sourceUrls: [],
      });
      return { message: genericResponse.response, isTable: false };
    }

    const structuredResponse = await generateStructuredResponse({
      query,
      information,
      sourceUrls,
    });

    return { message: structuredResponse.response, isTable: false };
  } catch (error) {
    console.error(error);
    return { error: 'An error occurred while processing your request. Please try again.', message: '' };
  }
}
