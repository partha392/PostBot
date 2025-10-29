'use server';

import { streamedQuery } from '@/ai/flows/streamed-query';
import type { Message } from '@/lib/types';
import { nanoid } from 'nanoid';
import { createStreamableUI } from '@genkit-ai/next';

export async function handleQuery(
  history: Message[],
  query: string,
  docContent?: string
) {
  const stream = createStreamableUI();

  (async () => {
    const { stream: output, error } = await streamedQuery({
      query,
      docContent,
      history,
    });

    if (error) {
      stream.done();
      return;
    }

    if (!output) {
      stream.done();
      return;
    }

    for await (const chunk of output) {
      stream.update(chunk);
    }

    stream.done();
  })();

  return {
    id: nanoid(),
    role: 'assistant' as const,
    content: stream.value,
  };
}
