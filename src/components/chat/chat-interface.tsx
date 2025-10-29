'use client';

import { handleQuery } from '@/app/actions';
import type { Message } from '@/lib/types';
import { Bot } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState, useRef } from 'react';
import { AnimatedElement } from '@/components/animated-element';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
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
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (id: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, content: newContent } : msg
      )
    );
  };

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
    addMessage(userMessage);

    const assistantMessage: Message = {
      id: nanoid(),
      role: 'assistant',
      content: '',
    };
    addMessage(assistantMessage);

    try {
      const stream = await handleQuery(messages, query, docContent);

      if (stream instanceof ReadableStream) {
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        let streamedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamedContent += decoder.decode(value, { stream: true });
          updateMessage(assistantMessage.id, streamedContent);
        }
      } else {
         updateMessage(assistantMessage.id, stream.content as string);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = 'An error occurred while processing your request.';
      updateMessage(assistantMessage.id, errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };


  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="container mx-auto max-w-4xl space-y-6 h-full">
          {messages.length === 0 ? (
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
            messages.map((message) => (
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
                  <SuggestedQueryForm query={q} handleUserMessage={handleUserMessage} />
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
