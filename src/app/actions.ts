'use server';

import { generateComparisonTable } from '@/ai/flows/generate-comparison-table';
import { generateStructuredResponse } from '@/ai/flows/generate-structured-response';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { webSearch } from '@/ai/flows/web-search';
import { getKnowledgeForQuery, SCHEME_ACRONYMS } from '@/lib/knowledge-base';
import type { FormState } from '@/lib/types';

export async function handleQuery(prevState: FormState, formData: FormData): Promise<FormState> {
  const query = formData.get('query') as string;
  const docContent = formData.get('docContent') as string | null;

  if (!query && !docContent) {
    return { error: 'Query or document is required.', message: '' };
  }

  try {
    if (docContent) {
      const result = await summarizeDocument({ docContent, query });
      return { message: result.summary, isTable: false };
    }
    
    if (!query) {
      return { error: 'Query is required.', message: '' };
    }

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

    const { information, sourceUrls } = getKnowledgeForQuery(query);

    if (!information) {
      // Fallback to web search for general queries
      const webResult = await webSearch({ query });
      return { message: webResult.response, isTable: false };
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
