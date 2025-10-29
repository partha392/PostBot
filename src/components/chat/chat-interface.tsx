'use client';

import { useEffect, useRef, useState, useActionState, useTransition } from 'react';
import { handleQuery } from '@/app/actions';
import type { FormState, Message } from '@/lib/types';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { nanoid } from 'nanoid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimatedElement } from '@/components/animated-element';
import { Bot } from 'lucide-react';

const initialMessages: Message[] = [];

const suggestedQueries = [
    'What is the interest rate for SCSS?',
    'Compare SCSS, MIS, and NSC',
    'Tell me about Speed Post',
    'Kisan Vikas Patra details',
]

function SuggestedQueryForm({
    query,
    setMessages,
  }: {
    query: string;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  }) {
    const [formState, formAction] = useActionState<FormState, FormData>(handleQuery, null);
    const [isPending, startTransition] = useTransition();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: 'user',
          content: query,
        },
      ]);
      const formData = new FormData(e.currentTarget);
      startTransition(() => {
        formAction(formData);
      });
    };
  
    useEffect(() => {
        if (formState) {
          if (formState.error) {
            // Error is handled in the main component
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
      }, [formState]);
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="query" value={query} />
        <Button variant="outline" size="sm" type="submit" disabled={isPending}>
          {query}
        </Button>
      </form>
    );
  }

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [formState, formAction] = useActionState<FormState, FormData>(handleQuery, null);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (formState) {
      if (formState.error) {
        toast({
          title: 'Error',
          description: formState.error,
          variant: 'destructive',
        });
      } else if (formState.message) {
        setMessages((prev) => {
            // Avoid adding duplicate assistant messages if already handled by suggested query form
            if (prev[prev.length -1]?.role === 'assistant' && prev[prev.length - 1]?.content === formState.message) {
                return prev;
            }
            return [
                ...prev,
                {
                    id: nanoid(),
                    role: 'assistant',
                    content: formState.message,
                    isTable: formState.isTable,
                },
            ]
        });
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

  const handleUserMessage = (query: string, uploadedFile?: File) => {
    let content = query;
    if (uploadedFile) {
        content = `**File:** ${uploadedFile.name}\n\n${query}`;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: nanoid(),
        role: 'user',
        content: content,
      },
    ]);
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl space-y-6 h-full">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold">What's on the agenda today?</h2>
              <p className="text-muted-foreground">Ask me anything about India Post, or upload a document to discuss.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <AnimatedElement key={message.id} delay={index === 0 ? 0 : 100}>
                  <ChatMessage {...message} />
              </AnimatedElement>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="container mx-auto max-w-4xl p-4 pt-0">
        {messages.length === 0 && (
            <AnimatedElement delay={200}>
                <div className="mb-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    {suggestedQueries.map((q, i) => (
                        <AnimatedElement key={q} delay={300 + i * 100}>
                            <SuggestedQueryForm 
                                query={q}
                                setMessages={setMessages}
                            />
                        </AnimatedElement>
                    ))}
                </div>
            </AnimatedElement>
        )}
        <AnimatedElement delay={messages.length === 0 ? 500 : 0}>
            <ChatInput
                onMessageSubmit={handleUserMessage}
                formAction={formAction}
                input={input}
                setInput={setInput}
                file={file}
                setFile={setFile}
            />
        </AnimatedElement>
      </div>
    </div>
  );
}
