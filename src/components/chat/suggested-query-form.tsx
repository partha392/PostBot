'use client';

import { handleQuery } from '@/app/actions';
import type { Message } from '@/lib/types';
import { nanoid } from 'nanoid';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedQueryFormProps {
  query: string;
  setOptimisticMessages: (action: Message) => void;
  addMessage: (message: Message) => void;
}

export function SuggestedQueryForm({
  query,
  setOptimisticMessages,
  addMessage,
}: SuggestedQueryFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const userMessage: Message = {
        id: nanoid(),
        role: 'user',
        content: query,
      };

      setOptimisticMessages(userMessage);

      try {
        const assistantMessage = await handleQuery([], query);
        addMessage(userMessage);
        addMessage(assistantMessage);
      } catch (error) {
        console.error('Error handling suggested query:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="query" value={query} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="w-full"
        disabled={isPending}
      >
        {query}
      </Button>
    </form>
  );
}
