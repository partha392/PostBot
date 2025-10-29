'use client';

import { handleQuery } from '@/app/actions';
import type { Message } from '@/lib/types';
import { Bot } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react';
import { AnimatedElement } from '@/components/animated-element';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { SuggestedQueryForm } from './suggested-query-form';

const initialMessages: Message[] = [];

const suggestedQueries = [
  'What is the interest rate for SCSS?',
  'Compare SCSS, MIS, and NSC',
  'Tell me about Speed Post',
  'Kisan Vikas Patra details',
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (state, newMessage: Message) => [
        ...state,
        newMessage
    ]
  );
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleUserMessage = async (query: string, file?: File) => {
    let docContent: string | undefined;

    if (file) {
      docContent = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }
    
    const userMessage: Message = {
        id: nanoid(),
        role: 'user',
        content: file ? `File: ${file.name}\n\n${query}` : query,
    };
    
    setOptimisticMessages(userMessage);

    try {
      const assistantMessage = await handleQuery(messages, query, docContent);
      setMessages(prev => [...prev, userMessage, assistantMessage]);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An error occurred while processing your request.',
        variant: 'destructive',
      });
      // Revert optimistic update on error
      setMessages(messages);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl space-y-6 h-full">
          {optimisticMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-semibold">
                What's on the agenda today?
              </h2>
              <p className="text-muted-foreground">
                Ask me anything about India Post, or upload a document to discuss.
              </p>
            </div>
          ) : (
            optimisticMessages.map((message) => (
              <AnimatedElement key={message.id}>
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
                  <SuggestedQueryForm query={q} setOptimisticMessages={setOptimisticMessages} addMessage={addMessage} />
                </AnimatedElement>
              ))}
            </div>
          </AnimatedElement>
        )}
        <AnimatedElement delay={messages.length === 0 ? 500 : 0}>
          <ChatInput onMessageSubmit={handleUserMessage} />
        </AnimatedElement>
      </div>
    </div>
  );
}
