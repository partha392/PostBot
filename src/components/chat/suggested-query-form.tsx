'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';

interface SuggestedQueryFormProps {
  query: string;
  handleUserMessage: (query: string) => Promise<void>;
}

export function SuggestedQueryForm({
  query,
  handleUserMessage,
}: SuggestedQueryFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      handleUserMessage(query);
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
