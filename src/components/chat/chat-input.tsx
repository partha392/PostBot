'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal, LoaderCircle, Plus } from 'lucide-react';
import { FormEvent } from 'react';

interface ChatInputProps {
  onMessageSubmit: (message: string) => void;
  formAction: (formData: FormData) => void;
  input: string;
  setInput: (value: string) => void;
}

export function ChatInput({ onMessageSubmit, formAction, input, setInput }: ChatInputProps) {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    
    if (!query.trim()) return;

    onMessageSubmit(query);
    formAction(formData);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-lg border p-2 bg-card">
        <Button variant="ghost" size="icon" type="button">
            <Plus className="h-5 w-5"/>
            <span className="sr-only">Add file</span>
        </Button>
      <Input
        name="query"
        placeholder="Ask anything..."
        className="flex-1 border-0 shadow-none focus-visible:ring-0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        <SendHorizonal className="h-5 w-5" />
      )}
      <span className="sr-only">Send message</span>
    </Button>
  );
}
