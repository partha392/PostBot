'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { handleQuery } from '@/app/actions';
import type { FormState, Message } from '@/lib/types';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { ScrollArea } from '@/components/ui/scroll-area';

const initialMessages: Message[] = [
  {
    id: nanoid(),
    role: 'assistant',
    content:
      "Hello! I'm PostBot, your AI assistant for India Post services. How can I help you today? You can ask me about interest rates, compare schemes, or find information on postal facilities.",
  },
];

const suggestedQueries = [
    'What is the interest rate for SCSS?',
    'Compare SCSS, MIS, and NSC',
    'Tell me about Speed Post',
    'Kisan Vikas Patra details',
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [formState, formAction] = useFormState<FormState, FormData>(handleQuery, null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (formState) {
      if (formState.error) {
        toast({
          title: 'Error',
          description: formState.error,
          variant: 'destructive',
        });
      } else if (formState.message) {
        setMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: 'assistant',
            content: formState.message,
            isTable: formState.isTable,
          },
        ]);
      }
    }
  }, [formState, toast]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages])

  const handleUserMessage = (query: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: nanoid(),
        role: 'user',
        content: query,
      },
    ]);
  };
  
  const handleSuggestedQuery = (query: string) => {
    handleUserMessage(query);
    const formData = new FormData();
    formData.append('query', query);
    formAction(formData);
    setInput('');
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>
      </ScrollArea>
      <div className="container mx-auto max-w-4xl p-4 pt-0">
        {messages.length <= 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
                {suggestedQueries.map(q => (
                    <Button key={q} variant="outline" size="sm" onClick={() => handleSuggestedQuery(q)}>
                        {q}
                    </Button>
                ))}
            </div>
        )}
        <ChatInput
            onMessageSubmit={handleUserMessage}
            formAction={formAction}
            input={input}
            setInput={setInput}
        />
      </div>
    </div>
  );
}
