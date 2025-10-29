'use server';

import { streamedQuery } from '@/ai/flows/streamed-query';
import type { Message } from '@/lib/types';
import { nanoid } from 'nanoid';

export async function handleQuery(
  history: Message[],
  query: string,
  docContent?: string
) {
  const { stream, error } = await streamedQuery({
    query,
    docContent,
    history,
  });

  if (error || !stream) {
    return {
      id: nanoid(),
      role: 'assistant',
      content: 'Sorry, I encountered an error.',
    };
  }

  // The stream is a ReadableStream of strings.
  return stream;
}
