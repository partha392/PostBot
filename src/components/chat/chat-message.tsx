import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ChatAvatar } from './chat-avatar';
import { MarkdownRenderer } from './markdown-renderer';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const renderUserMessage = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    // Handle newlines
    if (part.includes('\n')) {
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return part;
  });
};


export function ChatMessage({ role, content, isTable }: Message) {
  const isAssistant = role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-start gap-4',
        !isAssistant && 'flex-row-reverse'
      )}
    >
      <ChatAvatar role={role} />
      <div
        className={cn(
          'flex-1 space-y-2',
          !isAssistant ? 'text-right' : 'text-left'
        )}
      >
        {isAssistant ? (
          <Card className="bg-card">
            <CardContent className="p-4">
                <MarkdownRenderer content={content as string} isTable={isTable} />
            </CardContent>
          </Card>
        ) : (
          <div className="inline-block rounded-lg bg-primary text-primary-foreground px-4 py-2">
            <div className="text-base whitespace-pre-wrap">{renderUserMessage(content as string)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
